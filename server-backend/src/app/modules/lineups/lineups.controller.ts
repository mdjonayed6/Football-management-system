import { NextFunction, Request, Response } from "express";
import { Query } from "../../lib/dbQuery/queryCollection";

// Create Line up
const createLineups = async (req: Request, res: Response, next: NextFunction) => {
    const { match_id, team_id, player_id, is_starting } = req.body;
    const query = `INSERT INTO lineups (match_id, team_id, player_id, is_starting) VALUES ('${match_id}', '${team_id}', '${player_id}', '${is_starting}')`;
    try {
        const result = await Query.executeQuery(query);
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Lineup created successfully',
                result: result
            })
        }
        else {
            res.status(403).send({
                success: false,
                message: 'Lineup creation failed',
            })
        }
    } catch (error) {
        next(error)
    }
}

//Get All Lineups
const getAllLineUps = async (req: Request, res: Response, next: NextFunction) => {
    const currentPage = req.query.currentPage ? parseInt(req.query.currentPage as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

    try {
        // Construct the SQL query to fetch all lineups
        const query = `
            SELECT 
                lineups.lineup_id,
                lineups.match_id,
                teams.team_name,
                teams.logo,
                lineups.is_starting
            FROM 
                lineups
            INNER JOIN 
                teams ON teams.team_id = lineups.team_id
            ORDER BY 
                lineups.lineup_id DESC
            LIMIT ${limit} OFFSET ${(currentPage - 1) * limit};`;

        // Execute the query to fetch lineups
        const lineups = await Query.executeQuery(query);

        // Construct the SQL query to count total lineups
        const countQuery = 'SELECT COUNT(*) AS totalLineups FROM lineups;';

        // Execute the query to count total lineups
        const countResult = await Query.executeQuery(countQuery);
        const totalLineups = countResult[0].totalLineups;

        // Calculate offset
        const offset = (currentPage - 1) * limit;

        res.status(200).send({
            success: true,
            message: 'Lineups were successfully retrieved',
            total: totalLineups,
            offset: offset,
            limit: limit,
            lineups: lineups
        });
    } catch (error) {
        next(error);
    }
}

// Get Single Lineup Information
const getLineupsInformation = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
        // Construct the SQL query to fetch single lineup information with join
        const query = `
            SELECT 
                lineups.lineup_id,
                lineups.match_id,
                lineups.team_id,
                lineups.player_id,
                lineups.is_starting,
                teams.logo,
                teams.team_name,
                users.username AS player_name
            FROM 
                lineups
            INNER JOIN 
                teams ON lineups.team_id = teams.team_id
            INNER JOIN 
                users ON lineups.player_id = users.user_id
            WHERE 
                lineups.lineup_id = ${id};`;

        // Execute the query
        const result = await Query.executeQuery(query);

        if (result.length > 0) {
            res.status(200).send({
                success: true,
                message: 'Lineup information successfully retrieved',
                lineup: result[0]
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'Lineup not found'
            });
        }
    } catch (error) {
        next(error);
    }
}

// Update lineup information
const updateLineupInformation = async (req: Request, res: Response, next: NextFunction) => {
    const { lineup_id, match_id, team_id, player_id, is_starting } = req.body;
    try {
        const query = `UPDATE lineups SET match_id = '${match_id}', team_id = '${team_id}', player_id = '${player_id}', is_starting = '${is_starting}' WHERE lineup_id = '${lineup_id}'`
        const result = await Query.executeQuery(query)
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Lineup updated successfully',
                result: result
            })
        }
        else {
            res.status(403).send({
                success: false,
                message: 'Cannot be updated lineup information',
            })
        }
    } catch (error) {
        next(error)
    }
}

// Delete lineup information
const deleteLineupInformation = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const result = await Query.executeQuery(`DELETE FROM lineups WHERE lineup_id ='${id}'`)
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Lineup information successfully deleted',
                result: result
            })
        }
        else {
            res.status(403).send({
                success: false,
                message: 'Cannot be deleted lineup information',
            })
        }
    } catch (error) {
        next(error)
    }
}

export const lineupsController = {
    createLineups,
    getAllLineUps,
    getLineupsInformation,
    updateLineupInformation,
    deleteLineupInformation,
}