import { NextFunction, Request, Response } from "express";
import { Query } from "../../lib/dbQuery/queryCollection";
// Getting total players, coaches, and teams
const getTotalPlayers = async (req: Request, res: Response, next: NextFunction) => {
    const totalPlayersQuery = `SELECT COUNT(*) as total_players FROM users WHERE role_id = '4'`;
    const totalCoachesQuery = `SELECT COUNT(*) as total_coaches FROM users WHERE role_id = '5'`;
    const totalRefereeQuery = `SELECT COUNT(*) as total_referee FROM users WHERE role_id = '3'`;
    const totalTeamsQuery = `SELECT COUNT(*) as total_teams FROM teams`;
    const recentPlayersQuery = `
        SELECT * FROM users
        WHERE role_id = '4'
        ORDER BY created_at DESC
        LIMIT 5
    `;

    try {
        const totalPlayersResult = await Query.executeQuery(totalPlayersQuery);
        const totalCoachesResult = await Query.executeQuery(totalCoachesQuery);
        const totalTeamsResult = await Query.executeQuery(totalTeamsQuery);
        const totalRefereeResult = await Query.executeQuery(totalRefereeQuery);
        const recentPlayersResult = await Query.executeQuery(recentPlayersQuery);

        const totalPlayers = totalPlayersResult[0].total_players; // Total players
        const totalCoaches = totalCoachesResult[0].total_coaches; // Total coaches
        const totalTeams = totalTeamsResult[0].total_teams; // Total teams
        const totalReferee = totalRefereeResult[0].total_referee; // Total referee
        const recentPlayers = recentPlayersResult; // Recent players

        res.status(200).send({
            success: true,
            totalPlayers: totalPlayers,
            totalCoaches: totalCoaches,
            totalTeams: totalTeams,
            totalReferee: totalReferee,
            recentPlayers: recentPlayers
        });
    } catch (error) {
        next(error);
    }
}

// Print players

const printPlayers = async (req: Request, res: Response, next: NextFunction) => {
    const playersQuery = `
        SELECT * FROM users
        WHERE role_id = '4'
        ORDER BY created_at DESC
    `;

    try {
        const playersResult = await Query.executeQuery(playersQuery);

        res.status(200).send({
            success: true,
            players: playersResult
        });
    } catch (error) {
        next(error);
    }
}

// Print players

const printCoach = async (req: Request, res: Response, next: NextFunction) => {
    const playersQuery = `
        SELECT * FROM users
        WHERE role_id = '5'
        ORDER BY created_at DESC
    `;

    try {
        const playersResult = await Query.executeQuery(playersQuery);

        res.status(200).send({
            success: true,
            players: playersResult
        });
    } catch (error) {
        next(error);
    }
}
// Print referee

const printReferee = async (req: Request, res: Response, next: NextFunction) => {
    const playersQuery = `
        SELECT * FROM users
        WHERE role_id = '3'
        ORDER BY created_at DESC
    `;

    try {
        const playersResult = await Query.executeQuery(playersQuery);

        res.status(200).send({
            success: true,
            players: playersResult
        });
    } catch (error) {
        next(error);
    }
}


// Coach Dashboard
const CoachMyTeam = async (req: Request, res: Response, next: NextFunction) => {
    const coachEmail = req.params.email;

    const query = `
    SELECT teams.team_id, teams.team_name, teams.coach_id, teams.logo, users.user_id, users.username, users.email
    FROM teams
    JOIN users ON teams.coach_id = users.user_id
    WHERE users.email = '${coachEmail}'
    `;

    const query2 = `
    SELECT 
        teams.team_id, 
        COUNT(players.player_id) AS num_players
    FROM teams
    LEFT JOIN players ON teams.team_id = players.team_id
    WHERE teams.coach_id IN (
        SELECT user_id FROM users WHERE email = '${coachEmail}'
    )
    GROUP BY teams.team_id
    `;

    try {
        const myTeam = await Query.executeQuery(query);
        const totalPlayer = await Query.executeQuery(query2);

        res.status(200).send({
            success: true,
            myTeam: myTeam,
            totalPlayer: totalPlayer
        });
    } catch (error) {
        console.error('Error fetching team data:', error);
        res.status(500).send({
            success: false,
            message: 'Error fetching team data'
        });
    }
}





export const dashboardController = {
    getTotalPlayers,
    printPlayers,
    printCoach,
    printReferee,
    CoachMyTeam,
}