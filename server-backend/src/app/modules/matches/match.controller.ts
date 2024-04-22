import { NextFunction, Request, Response } from "express";
import { Query } from "../../lib/dbQuery/queryCollection";
import moment from "moment";


// Creating a match
const createMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { home_team_id, away_team_id, match_date, match_time, venue, referee_id } = req.body;

        // Check if the referee exists in the users table
        const existingUser = await Query.executeQuery(`SELECT * FROM users WHERE user_id ='${referee_id}'`);
        if (existingUser.length === 0) {
            // Handle the case when the referee is not found
            res.status(403).send({
                success: false,
                message: 'Referee not found',
            });
            return;
        }

        // Check if the referee has any matches in the matches table
        const existingReferee = await Query.selectOneWithColumn('matches', ['home_team_id', 'away_team_id', 'match_date', 'match_time', 'venue', 'referee_id'], 'referee_id', referee_id);
        if (existingReferee) {
            // Handle the case when the referee already has matches
            const timeWithSeconds = existingReferee.match_time;

            // Split the time string by ":" to separate hours, minutes, and seconds
            const timeComponents = timeWithSeconds.split(":");
            // Extract hours and minutes components
            const truncatedTime = `${timeComponents[0]}:${timeComponents[1]}`;

            // Working with the date
            const dateTimeObject = existingReferee.match_date;

            // Format date
            const momentObject = moment(dateTimeObject);

            // Format the date
            const formattedDate = momentObject.format('YYYY-MM-DD');

            if (home_team_id === away_team_id) {
                res.status(403).send({
                    success: false,
                    message: 'Same team cannot be selected as away team',
                });
                return;
            }

            if (match_date === formattedDate && match_time === truncatedTime) {
                res.status(403).send({
                    success: false,
                    message: 'Same date & time cannot be arranged for a match for the referee',
                });
                return;
            }

            // Add your logic for inserting the match
            const query = `INSERT INTO matches (home_team_id, away_team_id, match_date, match_time, venue, referee_id) VALUES ('${home_team_id}', '${away_team_id}', '${match_date}', '${match_time}', '${venue}', '${referee_id}')`;
            const result = await Query.executeQuery(query);
            if (result) {
                res.status(200).send({
                    success: true,
                    message: 'Match created successfully',
                    result: result
                });
            } else {
                res.status(403).send({
                    success: false,
                    message: 'Match creation failed',
                });
            }
            return;
        }

        // Continue with other checks and logic if the referee has no matches
        // Execute the insert query to create a match
        const query = `INSERT INTO matches (home_team_id, away_team_id, match_date, match_time, venue, referee_id) VALUES ('${home_team_id}', '${away_team_id}', '${match_date}', '${match_time}', '${venue}', '${referee_id}')`;
        const result = await Query.executeQuery(query);
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Match created successfully',
                result: result
            });
        } else {
            res.status(403).send({
                success: false,
                message: 'Match creation failed',
            });
        }
    } catch (error) {
        next(error);
    }
}

// get all matches
const getAllMatches = async (req: Request, res: Response, next: NextFunction) => {
    const currentPage = req.query.currentPage ? parseInt(req.query.currentPage as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

    try {
        // Construct the SQL query to fetch matches with details
        const matchesQuery = `
            SELECT 
                matches.match_id, 
                home_teams.team_name AS home_team_name,
                home_teams.logo as home_team_logo,
                away_teams.team_name AS away_team_name,
                away_teams.logo as away_team_logo,
                matches.match_date,
                matches.match_time,
                matches.venue,
                matches.referee_id,
                users.username as referee_name
            FROM 
                matches
            INNER JOIN 
                teams AS home_teams ON home_teams.team_id = matches.home_team_id
            INNER JOIN 
                teams AS away_teams ON away_teams.team_id = matches.away_team_id
            INNER JOIN
                users ON users.user_id = matches.referee_id
            ORDER BY 
                matches.match_id DESC
            LIMIT ${limit} OFFSET ${(currentPage - 1) * limit};`;

        // Execute the query to fetch matches with details
        const matchesResult = await Query.executeQuery(matchesQuery);

        // Construct the SQL query to count the total number of matches
        const countQuery = 'SELECT COUNT(*) AS totalMatches FROM matches;';

        // Execute the query to count the total number of matches
        const countResult = await Query.executeQuery(countQuery);

        const totalMatches = countResult[0].totalMatches;

        res.status(200).json({
            success: true,
            message: 'Matches were successfully retrieved',
            matches: matchesResult,
            total: totalMatches,
            offset: (currentPage - 1) * limit,
            limit: limit
        });
    } catch (error) {
        next(error);
    }
}

// Get One match information
const getMatchInformation = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
        // Construct the SQL query to fetch match information
        const query = `
            SELECT 
            matches.match_id,
                home_teams.team_name AS home_team_name,
                home_teams.logo as home_team_logo,
                away_teams.team_name AS away_team_name,
                away_teams.logo as away_team_logo,
                matches.match_date,
                matches.match_time,
                matches.venue,
                matches.referee_id,
                matches.home_team_id,
                matches.away_team_id,
                users.username as referee_name
            FROM 
                matches
            INNER JOIN 
                teams AS home_teams ON home_teams.team_id = matches.home_team_id
            INNER JOIN 
                teams AS away_teams ON away_teams.team_id = matches.away_team_id
            INNER JOIN
                users ON users.user_id = matches.referee_id
            WHERE 
                matches.match_id = ${id};`;

        // Execute the query
        const result = await Query.executeQuery(query);

        if (result.length > 0) {
            res.status(200).send({
                success: true,
                message: 'Match information successfully retrieved',
                match: result[0]
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'Match not found'
            });
        }
    } catch (error) {
        next(error);
    }
}

// Update Match Information
const updateMatchInformation = async (req: Request, res: Response, next: NextFunction) => {
    const { match_id, home_team_id, away_team_id, match_date, match_time, venue, referee_id } = req.body;
    try {

        const existingReferee = await Query.selectOneWithColumn('matches', ['home_team_id', 'away_team_id', 'match_date', 'match_time', 'venue', 'referee_id'], 'referee_id', referee_id)

        if (away_team_id == home_team_id) {
            res.status(403).send({
                success: false,
                message: 'Home and away team can not be same',
            })
        }
        else if (existingReferee.match_time == match_time && existingReferee.match_date == match_date) {
            res.status(403).send({
                success: false,
                message: 'Date & Time conflict',
            })
        }
        else {

            const query = `UPDATE matches SET home_team_id = '${home_team_id}', away_team_id = '${away_team_id}', match_date = '${match_date}', match_time = '${match_time}', venue = '${venue}', referee_id = '${referee_id}' WHERE match_id = '${match_id}'`
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
        }

    } catch (error) {
        next(error)
    }
}

// Delete a Match
const deleteMatch = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const result = await Query.executeQuery(`DELETE FROM matches WHERE match_id ='${id}'`)
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Match information successfully deleted',
                result: result
            })
        }
        else {
            res.status(403).send({
                success: false,
                message: 'Cannot be deleted Match information',
            })
        }
    } catch (error) {
        next(error)
    }
}

// Get the next match
const getNextMatch = async (req: Request, res: Response, next: NextFunction) => {
    const currentDate = new Date();

    const query = `
        SELECT
            matches.match_id,
            matches.home_team_id,
            home_teams.team_name AS home_team_name,
            home_teams.logo AS home_team_logo,
            matches.away_team_id,
            away_teams.team_name AS away_team_name,
            away_teams.logo AS away_team_logo,
            matches.match_date,
            matches.match_time,
            matches.venue,
            matches.referee_id,
            matches.created_at AS match_created_at,
            matches.updated_at AS match_updated_at
        FROM
            matches
        INNER JOIN
            teams AS home_teams ON matches.home_team_id = home_teams.team_id
        INNER JOIN
            teams AS away_teams ON matches.away_team_id = away_teams.team_id
        WHERE
            matches.match_date > '${currentDate.toISOString()}'
        ORDER BY
            matches.match_date
        LIMIT 1;
    `;

    try {
        const result = await Query.executeQuery(query);
        res.send({
            success: true,
            message: 'Next match information successfully retrieved',
            result: result
        });
    } catch (error) {
        next(error);
    }
}


export const matchController = {
    createMatch,
    getAllMatches,
    getMatchInformation,
    deleteMatch,
    updateMatchInformation,
    getNextMatch,
}