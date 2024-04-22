import { NextFunction, Request, Response } from "express";
import { Query } from "../../lib/dbQuery/queryCollection";

// create a new player 
const createPlayer = async (req: Request, res: Response, next: NextFunction) => {
    const { team_id, user_id, position, jersey_number, date_of_birth } = req.body;

    // Check if the same user exists for the same team
    const playerExistsQuery = `SELECT * FROM players WHERE user_id = '${user_id}'`;
    const playerExistsResult = await Query.executeQuery(playerExistsQuery);

    if (playerExistsResult.length > 0) {
        return res.status(403).send({
            success: false,
            message: 'User already exists for other team',
        });
    }
    // // Check if the same user exists for the same team
    // const userExistsQuery = `SELECT * FROM players WHERE team_id = '${team_id}' AND user_id = '${user_id}'`;
    // const userExistsResult = await Query.executeQuery(userExistsQuery);

    // if (userExistsResult.length > 0) {
    //     return res.status(403).send({
    //         success: false,
    //         message: 'User already exists for the same team',
    //     });
    // }

    // Check if the same position exists
    const positionExistsQuery = `SELECT * FROM players WHERE team_id = '${team_id}' AND position = '${position}'`;
    const positionExistsResult = await Query.executeQuery(positionExistsQuery);

    if (positionExistsResult.length > 0) {
        return res.status(403).send({
            success: false,
            message: 'Position already taken in the team',
        });
    }

    // whether user exists or not
    const actualExistsQuery = `SELECT * FROM users WHERE user_id = '${user_id}'`
    const actualExistsResult = await Query.executeQuery(actualExistsQuery);

    if (actualExistsResult.length > 0) {
        // Insert the player if checks pass
        const query = `INSERT INTO players (team_id, user_id, position, jersey_number, date_of_birth) VALUES ('${team_id}', '${user_id}', '${position}', '${jersey_number}', '${date_of_birth}')`;

        try {
            const result = await Query.executeQuery(query);
            if (result) {
                res.status(200).send({
                    success: true,
                    message: 'Player created successfully',
                    result: result
                });
            } else {
                res.status(403).send({
                    success: false,
                    message: 'Player creation failed',
                });
            }
        } catch (error) {
            next(error);
        }
    }
    else {
        return res.status(403).send({
            success: false,
            message: 'User does not exist',
        });
    }


};


// Get all Player Information
const getAllPlayers = async (req: Request, res: Response, next: NextFunction) => {
    const currentPage = req.query.currentPage ? parseInt(req.query.currentPage as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

    try {
        // Construct the SQL query with JOIN operations
        const query = `
            SELECT 
            players.user_id,players.player_id, users.username as player_name,
            players.team_id, teams.team_name, players.position, players.jersey_number, players.date_of_birth, players.created_at
            FROM players
            INNER JOIN teams ON teams.team_id = players.team_id
            INNER JOIN users ON users.user_id = players.user_id
            ORDER BY players.player_id DESC
            LIMIT ${limit} OFFSET ${(currentPage - 1) * limit};`;

        // Execute the query to fetch player information
        const playersResult = await Query.executeQuery(query);

        // Construct the SQL query to count total players
        const countQuery = `SELECT COUNT(*) AS total FROM players;`;

        // Execute the count query to fetch total count
        const countResult = await Query.executeQuery(countQuery);

        const totalPlayers = countResult[0]?.total || 0; // Extract total count from the result

        res.status(200).json({
            success: true,
            message: 'Players were successfully retrieved',
            players: playersResult,
            total: totalPlayers,
            offset: (currentPage - 1) * limit,
            limit: limit
        });
    } catch (error) {
        next(error);
    }
}

// Get Single Player Information
const getPlayerInformation = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        // Construct the SQL query with JOIN operations
        const query = `
            SELECT 
            players.player_id, users.username as player_name, users.user_id as user_id,
            players.team_id, teams.team_name, players.position, players.jersey_number, players.date_of_birth
            FROM players
            INNER JOIN teams ON teams.team_id = players.team_id
            INNER JOIN users ON players.player_id = users.user_id
            WHERE players.player_id = ${id};`;

        // Execute the query
        const result = await Query.executeQuery(query);

        // If player information is found, respond with success and player information
        if (result && result.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Player information successfully retrieved',
                player: result[0] // Assuming only one player is expected
            });
        } else {
            // If player information is not found, respond with failure message
            res.status(404).json({
                success: false,
                message: 'Player information not found'
            });
        }
    } catch (error) {
        next(error);
    }
}

// Update player information
const updatePlayerInformation = async (req: Request, res: Response, next: NextFunction) => {
    const { player_id, team_id, user_id, position, jersey_number, date_of_birth } = req.body;
    // console.log(player_id, team_id, user_id, position, jersey_number, date_of_birth)
    try {
        const query = `UPDATE players SET team_id = '${team_id}', user_id = '${user_id}', position = '${position}', jersey_number = '${jersey_number}', date_of_birth = '${date_of_birth}' WHERE player_id = '${player_id}'`
        const result = await Query.executeQuery(query)
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Player updated successfully',
                result: result
            })
        }
        else {
            res.status(403).send({
                success: false,
                message: 'Cannot be updated player information',
            })
        }
    } catch (error) {
        next(error)
    }
}

// Delete player information
const deletePlayerInformation = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const result = await Query.executeQuery(`DELETE FROM players WHERE player_id ='${id}'`)
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Player information successfully deleted',
                result: result
            })
        }
        else {
            res.status(403).send({
                success: false,
                message: 'Cannot be deleted player information',
            })
        }
    } catch (error) {
        next(error)
    }
}

// Get all players for a particular coach
const playerForCoach = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.params.email
    try {
        const query = `
                    SELECT 
                p.player_id,
                p.position,
                p.jersey_number,
                p.date_of_birth,
                t.team_name,
                u.username AS player_name,
                u.email AS player_email,
                uc.username AS coach_name,
                uc.email AS coach_email
            FROM 
                players AS p
            JOIN 
                teams AS t ON p.team_id = t.team_id
            JOIN 
                users AS u ON p.user_id = u.user_id
            JOIN 
                users AS uc ON t.coach_id = uc.user_id
            WHERE 
                uc.email = '${email}'`

        const result = await Query.executeQuery(query)
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Players retrieved successfully',
                result: result
            })
        }
    } catch (error) {
        next(error)
    }
}

// Search Registered Players
const searchPlayers = async (req: Request, res: Response, next: NextFunction) => {
    const searchQuery = req.query.search; // Get the search query from request query parameters
    const currentPage = req.query.currentPage ? parseInt(req.query.currentPage as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

    try {
        // Construct the SQL query to search for players
        const query = `
            SELECT 
                players.user_id,
                players.player_id,
                users.username AS player_name,
                players.team_id,
                teams.team_name,
                players.position,
                players.jersey_number,
                players.date_of_birth,
                players.created_at
            FROM 
                players
            INNER JOIN 
                teams ON teams.team_id = players.team_id
            INNER JOIN 
                users ON users.user_id = players.user_id
            WHERE 
                users.username LIKE '%${searchQuery}%' OR
                users.email LIKE '%${searchQuery}%' OR
                teams.team_name LIKE '%${searchQuery}%' OR
                players.player_id = '${searchQuery}'
            ORDER BY 
                players.player_id DESC
            LIMIT ${limit} OFFSET ${(currentPage - 1) * limit};`;

        // Execute the query to search for players
        const playersResult = await Query.executeQuery(query);

        // Construct the SQL query to count total searched players
        const countQuery = `
            SELECT 
                COUNT(*) AS total 
            FROM 
                players
            INNER JOIN 
                teams ON teams.team_id = players.team_id
            INNER JOIN 
                users ON users.user_id = players.user_id
            WHERE 
                users.username LIKE '%${searchQuery}%' OR
                users.email LIKE '%${searchQuery}%' OR
                teams.team_name LIKE '%${searchQuery}%' OR
                players.player_id = '${searchQuery}';`;

        // Execute the count query to fetch total count of searched players
        const countResult = await Query.executeQuery(countQuery);
        const totalPlayers = countResult[0]?.total || 0; // Extract total count from the result

        res.status(200).json({
            success: true,
            message: 'Players were successfully retrieved based on the search query',
            players: playersResult,
            total: totalPlayers,
            offset: (currentPage - 1) * limit,
            limit: limit
        });
    } catch (error) {
        next(error);
    }
};

// Individual Player Team
const myTeam = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.params.email
    try {
        const query = `
        SELECT 
    teams.team_id,
    teams.team_name,
    teams.logo as team_logo,
    teams.coach_id,
    coach.username AS coach_name,
    coach.photo AS coach_photo,
    users.user_id,
    users.username AS player_username,
    users.email
FROM teams
JOIN players ON teams.team_id = players.team_id
JOIN users ON players.user_id = users.user_id
JOIN users AS coach ON teams.coach_id = coach.user_id
WHERE users.email = '${email}'
        `
        const result = await Query.executeQuery(query)
        if (result) {
            res.send({
                success: true,
                message: 'Fetched players team successfully',
                result: result
            })
        }
    } catch (error) {
        next(error)
    }
}

// MyTeamsPlayers
const myTeamPlayers = async (req: Request, res: Response, next: NextFunction) => {
    const teamId = req.params.teamId;
    const query = `SELECT 
    teams.team_id,
    teams.team_name,
    teams.logo,
    teams.coach_id,
    coach.username AS coach_username,
    users.user_id,
    users.username AS player_username,
    users.email,
    COUNT(players.player_id) AS num_players
FROM teams
JOIN players ON teams.team_id = players.team_id
JOIN users ON players.user_id = users.user_id
JOIN users AS coach ON teams.coach_id = coach.user_id
WHERE teams.team_id = '${teamId}'
GROUP BY teams.team_id, teams.team_name, teams.logo, teams.coach_id, coach.username, users.user_id, users.username, users.email
ORDER BY player_username;`;

    const result = await Query.executeQuery(query)
    if (result) {
        res.send({
            success: true,
            message: 'Fetched players team successfully',
            result: result
        })
    }
    else {
        res.status(403).send({
            success: false,
            message: 'Cannot fetch players team',
        })
    }


}

// My match schedule
const playerMatchSchedule = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId
    const query = `SELECT
    matches.match_id,
    matches.match_date,
    matches.match_time,
    matches.venue,
    home_team.team_name AS home_team_name,
    away_team.team_name AS away_team_name,
    players.player_id,
    players.team_id,
    players.user_id
FROM
    matches
JOIN
    players ON (matches.home_team_id = players.team_id OR matches.away_team_id = players.team_id)
JOIN
    teams AS home_team ON matches.home_team_id = home_team.team_id
JOIN
    teams AS away_team ON matches.away_team_id = away_team.team_id
WHERE
    players.user_id = '${userId}';
`
    const result = await Query.executeQuery(query)
    if (result) {
        res.send({
            success: true,
            message: 'Fetched match schedule successfully',
            result: result
        })
    }
    else {
        res.status(403).send({
            success: false,
            message: 'Cannot fetch match schedule',
        })
    }
}

// Teams other Players Info;



export const playersController = {
    createPlayer,
    getAllPlayers,
    getPlayerInformation,
    updatePlayerInformation,
    deletePlayerInformation,
    playerForCoach,
    searchPlayers,
    myTeam,
    myTeamPlayers,
    playerMatchSchedule
}