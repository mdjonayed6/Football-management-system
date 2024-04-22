import { NextFunction, Request, Response } from "express";
import { Query } from "../../lib/dbQuery/queryCollection";


// create new match result
// const createMatchResult = async (req: Request, res: Response, next: NextFunction) => {
//     const { match_id, home_team_score, away_team_score, winner_team_id } = req.body;
//     // console.log(match_id)
//     const existingMatchId = await Query.executeQuery(`SELECT * FROM matches WHERE match_id ='${match_id}'`)
//     const existingWinnerTeam = await Query.executeQuery(`SELECT * FROM teams WHERE team_id ='${winner_team_id}'`)
//     if (existingMatchId.length == 0) {
//         res.status(404).send({
//             success: false,
//             message: 'Match id does not exist',
//         })
//     }

//     else if (existingWinnerTeam.length == 0) {
//         res.status(404).send({
//             success: false,
//             message: 'Winner team id does not exist',
//         })
//     }

//     else {
//         const query = `INSERT INTO match_results (match_id, home_team_score, away_team_score, winner_team_id) VALUES ('${match_id}', '${home_team_score}', '${away_team_score}', '${winner_team_id}')`;
//         try {
//             const result = await Query.executeQuery(query);
//             if (result) {
//                 // const query = `DELETE FROM matches WHERE match_id ='${match_id}'`;
//                 // const resultDelete = await Query.executeQuery(query);
//                 // if (resultDelete) {
//                 res.status(200).send({
//                     success: true,
//                     message: 'Match result created successfully',
//                     result: result
//                 })
//                 // }
//             }
//             else {
//                 res.status(403).send({
//                     success: false,
//                     message: 'Match result creation failed',
//                 })
//             }
//         } catch (error) {
//             next(error)
//         }
//     }

// }

const createMatchResult = async (req: Request, res: Response, next: NextFunction) => {
    const { match_id, home_team_score, away_team_score, winner_team_id } = req.body;
    
    const existingMatchId = await Query.executeQuery(`SELECT * FROM matches WHERE match_id ='${match_id}'`);
    
    if (existingMatchId.length == 0) {
        res.status(404).send({
            success: false,
            message: 'Match id does not exist',
        });
        return; // Exit the function early
    }

    // Check if winner_team_id is not 0 before querying the database
    if (winner_team_id !== '0') {
        const existingWinnerTeam = await Query.executeQuery(`SELECT * FROM teams WHERE team_id ='${winner_team_id}'`);
        
        if (existingWinnerTeam.length == 0) {
            res.status(404).send({
                success: false,
                message: 'Winner team id does not exist',
            });
            return; // Exit the function early
        }
    }

    const query = `INSERT INTO match_results (match_id, home_team_score, away_team_score, winner_team_id) VALUES ('${match_id}', '${home_team_score}', '${away_team_score}', '${winner_team_id}')`;

    try {
        const result = await Query.executeQuery(query);

        if (result) {
            res.status(200).send({
                success: true,
                message: 'Match result created successfully',
                result: result
            });
        } else {
            res.status(403).send({
                success: false,
                message: 'Match result creation failed',
            });
        }
    } catch (error) {
        next(error);
    }
}


//Get All Results
const getAllResults = async (req: Request, res: Response, next: NextFunction) => {
    const currentPage = req.query.currentPage ? parseInt(req.query.currentPage as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
    const offset = (currentPage - 1) * limit;

    try {
        // Construct the SQL query to count total rows
        const countQuery = `SELECT COUNT(*) AS total FROM matches`;

        // Execute the count query
        const countResult = await Query.executeQuery(countQuery);
        const total = countResult[0].total;

        // Construct the SQL query to fetch paginated match results with join
        const query = `
            SELECT 
                match_results.result_id,
                matches.match_id,
                matches.home_team_id,
                home_teams.team_name AS home_team_name,
                home_teams.logo AS home_team_logo,
                matches.away_team_id,
                away_teams.team_name AS away_team_name,
                away_teams.logo AS away_team_logo,
                matches.referee_id,
                match_results.home_team_score,
                match_results.away_team_score,
                match_results.winner_team_id,
                match_results.created_at,
                winner_teams.team_name AS winner_team_name
            FROM 
                matches
            INNER JOIN 
                match_results ON matches.match_id = match_results.match_id
            INNER JOIN 
                teams AS home_teams ON home_teams.team_id = matches.home_team_id
            INNER JOIN 
                teams AS away_teams ON away_teams.team_id = matches.away_team_id
            LEFT JOIN 
            teams AS winner_teams ON winner_teams.team_id = match_results.winner_team_id
            ORDER BY match_results.result_id DESC
            LIMIT ${limit} OFFSET ${offset};`;

        // Execute the query
        const result = await Query.executeQuery(query);

        res.status(200).send({
            success: true,
            message: 'Match results were successfully retrieved',
            total: total,
            limit: limit,
            offset: offset,
            results: result
        });
    } catch (error) {
        next(error);
    }
}

// Get Single Result Information
const getResultsInformation = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        // Construct the SQL query to fetch result information with join
        const query = `
            SELECT 
                match_results.result_id,
                match_results.match_id,
                matches.home_team_id,
                home_teams.team_name AS home_team_name,
                matches.away_team_id,
                away_teams.team_name AS away_team_name,
                match_results.home_team_score,
                match_results.away_team_score,
                match_results.winner_team_id,
                winner_teams.team_name AS winner_team_name
            FROM 
                match_results
            INNER JOIN 
                matches ON match_results.match_id = matches.match_id
            INNER JOIN 
                teams AS home_teams ON matches.home_team_id = home_teams.team_id
            INNER JOIN 
                teams AS away_teams ON matches.away_team_id = away_teams.team_id
            LEFT JOIN 
                teams AS winner_teams ON match_results.winner_team_id = winner_teams.team_id
            WHERE 
                match_results.result_id = ${id};`;

        // Execute the query
        const result = await Query.executeQuery(query);

        if (result.length > 0) {
            res.status(200).send({
                success: true,
                message: 'Result information successfully retrieved',
                result: result[0] // Assuming there is only one result with the specified id
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'Result not found',
            });
        }
    } catch (error) {
        next(error);
    }
}

// Update result information
const updateResultInformation = async (req: Request, res: Response, next: NextFunction) => {
    const { result_id, match_id, home_team_score, away_team_score, winner_team_id } = req.body;

    const existingMatchId = await Query.executeQuery(`SELECT * FROM matches WHERE match_id ='${match_id}'`)
    const existingWinnerTeam = await Query.executeQuery(`SELECT * FROM teams WHERE team_id ='${winner_team_id}'`)
    if (existingMatchId.length == 0) {
        res.status(404).send({
            success: false,
            message: 'Match id does not exist',
        })
    }

    else if (existingWinnerTeam.length == 0) {
        res.status(404).send({
            success: false,
            message: 'Winner team id does not exist',
        })
    }
    else {
        try {
            const query = `UPDATE match_results SET match_id = '${match_id}', home_team_score = '${home_team_score}', away_team_score = '${away_team_score}', winner_team_id = '${winner_team_id}' WHERE result_id = '${result_id}'`
            const result = await Query.executeQuery(query)
            if (result) {
                res.status(200).send({
                    success: true,
                    message: 'Result updated successfully',
                    result: result
                })
            }
            else {
                res.status(403).send({
                    success: false,
                    message: 'Cannot be updated result information',
                })
            }
        } catch (error) {
            next(error)
        }
    }

}

// Delete result information
const deleteResultInformation = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const result = await Query.executeQuery(`DELETE FROM match_results WHERE result_id ='${id}'`)
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Result information successfully deleted',
                result: result
            })
        }
        else {
            res.status(403).send({
                success: false,
                message: 'Cannot be deleted result information',
            })
        }
    } catch (error) {
        next(error)
    }
}

// Match Result and Ranking
const matchResultRanking = async (req: Request, res: Response, next: NextFunction) => {
    const query = `
    SELECT
    t.team_id,
    t.team_name,
    COUNT(DISTINCT m.match_id) AS matches_played,
    SUM(CASE WHEN m.home_team_id = t.team_id THEN mr.home_team_score ELSE mr.away_team_score END) AS total_goals_scored,
    COUNT(CASE WHEN mr.home_team_score = mr.away_team_score THEN 1 END) AS draws,
    SUM(CASE WHEN (m.home_team_id = t.team_id AND mr.home_team_score > mr.away_team_score) THEN 1
             WHEN (m.away_team_id = t.team_id AND mr.away_team_score > mr.home_team_score) THEN 1 ELSE 0 END) AS total_wins,
    SUM(CASE WHEN (m.home_team_id = t.team_id AND mr.home_team_score < mr.away_team_score) THEN 1
             WHEN (m.away_team_id = t.team_id AND mr.away_team_score < mr.home_team_score) THEN 1 ELSE 0 END) AS total_losses
FROM
    teams t
LEFT JOIN
    matches m ON t.team_id = m.home_team_id OR t.team_id = m.away_team_id
LEFT JOIN
    match_results mr ON m.match_id = mr.match_id
GROUP BY
    t.team_id, t.team_name
ORDER BY
    total_wins DESC, total_losses ASC, matches_played DESC, total_goals_scored DESC, draws DESC;

    `
    const result = await Query.executeQuery(query)
    res.status(200).send({
        success: true,
        message: 'Match result ranking successfully retrieved',
        result: result
    })
}

export const matchResultController = {
    createMatchResult,
    getAllResults,
    getResultsInformation,
    updateResultInformation,
    deleteResultInformation,
    matchResultRanking
}