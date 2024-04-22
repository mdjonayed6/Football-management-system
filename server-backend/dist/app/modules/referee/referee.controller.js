"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refereeController = void 0;
const queryCollection_1 = require("../../lib/dbQuery/queryCollection");
// create new referees
const createReferee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, certification_level } = req.body;
    const existingReferee = yield queryCollection_1.Query.selectOne('referees', 'user_id', user_id);
    try {
        if (existingReferee) {
            res.status(200).send({
                success: true,
                message: 'Referee already exist',
            });
        }
        else {
            const query = `INSERT INTO referees (user_id, certification_level) VALUES ('${user_id}', '${certification_level}')`;
            const result = yield queryCollection_1.Query.executeQuery(query);
            if (result) {
                res.status(200).send({
                    success: true,
                    message: 'Referee created successfully',
                    result: result
                });
            }
            else {
                res.status(403).send({
                    success: false,
                    message: 'Referee creation failed',
                });
            }
        }
    }
    catch (error) {
        next(error);
    }
});
//Get All Referee
const getAllReferee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    try {
        // Perform a JOIN query between users and referees table
        const query = `
            SELECT users.username, users.email, users.photo, referees.referee_id, referees.certification_level, referees.created_at
            FROM users
            INNER JOIN referees ON users.user_id = referees.user_id
            LIMIT ${(currentPage - 1) * limit}, ${limit}`;
        // Execute the query to get paginated referee data
        const result = yield queryCollection_1.Query.executeQuery(query);
        // Execute another query to get the total count of referees
        const totalCountQuery = `SELECT COUNT(*) AS total FROM referees`;
        const totalCountResult = yield queryCollection_1.Query.executeQuery(totalCountQuery);
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
        }
        else {
            res.status(403).send({
                success: false,
                message: 'Cannot fetch referee result information',
            });
        }
    }
    catch (error) {
        next(error);
    }
});
// Get Single Result Information
const getRefereeInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield queryCollection_1.Query.selectOneWithColumn('referees', ['user_id', 'referee_id', 'certification_level', 'created_at'], 'referee_id', id);
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Referee information successfully retrieved',
                result: result
            });
        }
        else {
            res.status(403).send({
                success: false,
                message: 'Cannot be fetched referee information',
            });
        }
    }
    catch (error) {
        next(error);
    }
});
// Update result information
const updateRefereeInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { referee_id, user_id, certification_level } = req.body;
    try {
        const query = `UPDATE referees SET user_id = '${user_id}', certification_level = '${certification_level}' WHERE referee_id = '${referee_id}'`;
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Referee updated successfully',
                result: result
            });
        }
        else {
            res.status(403).send({
                success: false,
                message: 'Cannot be updated referee result information',
            });
        }
    }
    catch (error) {
        next(error);
    }
});
// Delete referee information
const deleteRefereeInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield queryCollection_1.Query.executeQuery(`DELETE FROM referees WHERE referee_id ='${id}'`);
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Referee information successfully deleted',
                result: result
            });
        }
        else {
            res.status(403).send({
                success: false,
                message: 'Cannot be deleted referee information',
            });
        }
    }
    catch (error) {
        next(error);
    }
});
// Get match information- along with referee
const refereeMatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
`;
    const result = yield queryCollection_1.Query.executeQuery(query);
    if (result) {
        res.status(200).send({
            success: true,
            message: 'Referee match information successfully retrieved',
            result: result
        });
    }
    else {
        res.status(403).send({
            success: false,
            message: 'Cannot be fetched referee match information',
        });
    }
});
exports.refereeController = {
    createReferee,
    getAllReferee,
    getRefereeInformation,
    updateRefereeInformation,
    deleteRefereeInformation,
    refereeMatch,
};
