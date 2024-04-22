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
exports.lineupsController = void 0;
const queryCollection_1 = require("../../lib/dbQuery/queryCollection");
// Create Line up
const createLineups = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { match_id, team_id, player_id, is_starting } = req.body;
    const query = `INSERT INTO lineups (match_id, team_id, player_id, is_starting) VALUES ('${match_id}', '${team_id}', '${player_id}', '${is_starting}')`;
    try {
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Lineup created successfully',
                result: result
            });
        }
        else {
            res.status(403).send({
                success: false,
                message: 'Lineup creation failed',
            });
        }
    }
    catch (error) {
        next(error);
    }
});
//Get All Lineups
const getAllLineUps = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
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
        const lineups = yield queryCollection_1.Query.executeQuery(query);
        // Construct the SQL query to count total lineups
        const countQuery = 'SELECT COUNT(*) AS totalLineups FROM lineups;';
        // Execute the query to count total lineups
        const countResult = yield queryCollection_1.Query.executeQuery(countQuery);
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
    }
    catch (error) {
        next(error);
    }
});
// Get Single Lineup Information
const getLineupsInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result.length > 0) {
            res.status(200).send({
                success: true,
                message: 'Lineup information successfully retrieved',
                lineup: result[0]
            });
        }
        else {
            res.status(404).send({
                success: false,
                message: 'Lineup not found'
            });
        }
    }
    catch (error) {
        next(error);
    }
});
// Update lineup information
const updateLineupInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { lineup_id, match_id, team_id, player_id, is_starting } = req.body;
    try {
        const query = `UPDATE lineups SET match_id = '${match_id}', team_id = '${team_id}', player_id = '${player_id}', is_starting = '${is_starting}' WHERE lineup_id = '${lineup_id}'`;
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Lineup updated successfully',
                result: result
            });
        }
        else {
            res.status(403).send({
                success: false,
                message: 'Cannot be updated lineup information',
            });
        }
    }
    catch (error) {
        next(error);
    }
});
// Delete lineup information
const deleteLineupInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield queryCollection_1.Query.executeQuery(`DELETE FROM lineups WHERE lineup_id ='${id}'`);
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Lineup information successfully deleted',
                result: result
            });
        }
        else {
            res.status(403).send({
                success: false,
                message: 'Cannot be deleted lineup information',
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.lineupsController = {
    createLineups,
    getAllLineUps,
    getLineupsInformation,
    updateLineupInformation,
    deleteLineupInformation,
};
