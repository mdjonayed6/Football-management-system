import { NextFunction, Request, Response } from "express";
import { Query } from "../../lib/dbQuery/queryCollection";

// create new referees
const createReferee = async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, certification_level } = req.body;
    const existingReferee = await Query.selectOne('referees', 'user_id', user_id)
    try {
        if (existingReferee) {
            res.status(200).send({
                success: true,
                message: 'Referee already exist',
            })
        }
        else {
            const query = `INSERT INTO referees (user_id, certification_level) VALUES ('${user_id}', '${certification_level}')`;
            const result = await Query.executeQuery(query);
            if (result) {
                res.status(200).send({
                    success: true,
                    message: 'Referee created successfully',
                    result: result
                })
            }
            else {
                res.status(403).send({
                    success: false,
                    message: 'Referee creation failed',
                })
            }
        }
    } catch (error) {
        next(error)
    }
}

//Get All Referee
const getAllReferee = async (req: Request, res: Response, next: NextFunction) => {
    const currentPage = req.query.currentPage ? parseInt(req.query.currentPage as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
    try {
        // Perform a JOIN query between users and referees table
        const query = `
            SELECT users.username, users.email, users.photo, referees.referee_id, referees.certification_level, referees.created_at
            FROM users
            INNER JOIN referees ON users.user_id = referees.user_id
            LIMIT ${(currentPage - 1) * limit}, ${limit}`;

        // Execute the query to get paginated referee data
        const result = await Query.executeQuery(query);

        // Execute another query to get the total count of referees
        const totalCountQuery = `SELECT COUNT(*) AS total FROM referees`;
        const totalCountResult = await Query.executeQuery(totalCountQuery);
        const total = totalCountResult[0].total;

        if (result) {
            res.status(200).send({
                success: true,
                message: 'Referee results were successfully retrieved',
                result: result,
                total: total,
                offset: (currentPage - 1) * limit,
                limit: limit
            });
        } else {
            res.status(403).send({
                success: false,
                message: 'Cannot fetch referee result information',
            });
        }
    } catch (error) {
        next(error);
    }
}


// Get Single Result Information
const getRefereeInformation = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const result = await Query.selectOneWithColumn('referees', ['user_id', 'referee_id', 'certification_level', 'created_at'], 'referee_id', id)
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Referee information successfully retrieved',
                result: result
            })
        }
        else {
            res.status(403).send({
                success: false,
                message: 'Cannot be fetched referee information',
            })
        }
    } catch (error) {
        next(error)
    }
}

// Update result information
const updateRefereeInformation = async (req: Request, res: Response, next: NextFunction) => {
    const { referee_id, user_id, certification_level } = req.body;
    try {
        const query = `UPDATE referees SET user_id = '${user_id}', certification_level = '${certification_level}' WHERE referee_id = '${referee_id}'`
        const result = await Query.executeQuery(query)
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Referee updated successfully',
                result: result
            })
        }
        else {
            res.status(403).send({
                success: false,
                message: 'Cannot be updated referee result information',
            })
        }
    } catch (error) {
        next(error)
    }
}

// Delete referee information
const deleteRefereeInformation = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const result = await Query.executeQuery(`DELETE FROM referees WHERE referee_id ='${id}'`)
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Referee information successfully deleted',
                result: result
            })
        }
        else {
            res.status(403).send({
                success: false,
                message: 'Cannot be deleted referee information',
            })
        }
    } catch (error) {
        next(error)
    }
}

// Get match information- along with referee
const refereeMatch = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const query = `SELECT 
    matches.match_id,
    matches.match_date,
    matches.match_time,
    matches.venue,
    matches.referee_id,
    home_team.team_id AS home_team_id,
    home_team.team_name AS home_team_name,
    home_team.coach_id AS home_coach_id,
    away_team.team_id AS away_team_id,
    away_team.team_name AS away_team_name,
    away_team.coach_id AS away_coach_id
FROM matches
JOIN teams AS home_team ON matches.home_team_id = home_team.team_id
JOIN teams AS away_team ON matches.away_team_id = away_team.team_id
WHERE matches.referee_id = '${id}';
`
    const result = await Query.executeQuery(query)
    if (result) {
        res.status(200).send({
            success: true,
            message: 'Referee match information successfully retrieved',
            result: result
        })
    }
    else {
        res.status(403).send({
            success: false,
            message: 'Cannot be fetched referee match information',
        })
    }

}

export const refereeController = {
    createReferee,
    getAllReferee,
    getRefereeInformation,
    updateRefereeInformation,
    deleteRefereeInformation,
    refereeMatch,
}