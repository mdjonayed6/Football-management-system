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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamsController = void 0;
const upload_config_1 = require("../../utils/fileManagement/upload.config");
const queryCollection_1 = require("../../lib/dbQuery/queryCollection");
const deleteFastFile_1 = __importDefault(require("../../lib/file/deleteFastFile"));
const photoPath_1 = __importDefault(require("../../lib/file/photoPath"));
// create a new team
const createTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        upload_config_1.photoUpload.single('photo')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (err) {
                console.error('Error uploading photo:', err);
                return next(err);
            }
            // Access form data and uploaded file
            const { team_name, coach_id } = req.body;
            const photoPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
            const photoURL = `${req.protocol}://${req.get('host')}/` + (photoPath === null || photoPath === void 0 ? void 0 : photoPath.replace(/\\/g, "/"));
            const existingTeam = yield queryCollection_1.Query.selectOne('teams', 'team_name', team_name);
            const existingCoach = yield queryCollection_1.Query.selectOne('teams', 'coach_id', coach_id);
            // console.log(existingCoach)
            if (existingTeam) {
                (0, deleteFastFile_1.default)(photoPath);
                return res.status(400).send({
                    success: false,
                    message: 'Team already exists',
                });
            }
            if (existingCoach) {
                (0, deleteFastFile_1.default)(photoPath);
                return res.status(400).send({
                    success: false,
                    message: 'Team already exists',
                });
            }
            // Check for missing or empty fields
            if (!team_name || !coach_id || !photoURL) {
                // Delete the file if it exists
                if (photoPath) {
                    (0, deleteFastFile_1.default)(photoPath);
                }
                return res.status(400).send({
                    success: false,
                    message: 'Please provide all required fields'
                });
            }
            const query = `INSERT INTO teams(team_name, coach_id, logo) VALUES ('${team_name}','${coach_id}','${photoURL}')`;
            try {
                // Assuming you're using a database library like knex.js or mysql2
                // Here, 'executeQuery' is just a placeholder for your database library's method to execute the query
                const result = yield queryCollection_1.Query.executeQuery(query);
                // If all fields are provided, respond with success message
                if (result) {
                    res.status(200).send({
                        success: true,
                        message: 'Team created successfully',
                        userdata: result
                    });
                }
                else {
                    res.status(400).send({
                        success: false,
                        message: 'Team creation failed'
                    });
                }
            }
            catch (error) {
                console.error('Error executing query:', error);
                next(error);
            }
        }));
    }
    catch (error) {
        console.error('Error in createUser controller:', error);
        next(error);
    }
});
// get all teams
const getTeams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    try {
        // Construct the SQL query with JOIN
        const teamsQuery = `
            SELECT teams.team_id, teams.team_name, teams.coach_id, users.username as coach_username, users.email as coach_email, teams.logo, teams.created_at
            FROM teams
            INNER JOIN users ON users.user_id = teams.coach_id
            ORDER BY teams.team_id DESC
            LIMIT ${limit} OFFSET ${(currentPage - 1) * limit};`;
        // Execute the query to fetch teams
        const teamsResult = yield queryCollection_1.Query.executeQuery(teamsQuery);
        // Construct the SQL query to count total teams
        const countQuery = `SELECT COUNT(*) as total FROM teams;`;
        // Execute the count query
        const countResult = yield queryCollection_1.Query.executeQuery(countQuery);
        const totalTeams = ((_b = countResult[0]) === null || _b === void 0 ? void 0 : _b.total) || 0; // Extract total count from the result
        res.status(200).json({
            success: true,
            message: 'Teams fetched successfully',
            teams: teamsResult,
            total: totalTeams,
            offset: (currentPage - 1) * limit,
            limit: limit
        });
    }
    catch (error) {
        next(error);
    }
});
// get team by id
const getTeamById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const team_id = req.params.id;
    try {
        // Construct the SQL query with JOIN
        const query = `
            SELECT teams.team_id, teams.team_name, teams.coach_id, users.username as coach_username, users.email as coach_email, teams.logo, teams.created_at
            FROM teams
            INNER JOIN users ON users.user_id = teams.coach_id
            WHERE teams.team_id = ${team_id};`;
        // Execute the query
        const result = yield queryCollection_1.Query.executeQuery(query);
        // If team is found, respond with success and team information
        if (result && result.length > 0) {
            res.status(200).send({
                success: true,
                message: 'Team fetched successfully',
                team: result[0] // Assuming only one team is expected
            });
        }
        else {
            // If team is not found, respond with failure message
            res.status(404).send({
                success: false,
                message: 'Team not found'
            });
        }
    }
    catch (error) {
        next(error);
    }
});
// Update Team 
const updateTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        upload_config_1.photoUpload.single('photo')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.error('Error uploading photo:', err);
                return next(err);
            }
            const { team_id, team_name, coach_id, photo } = req.body;
            let photoURL = ''; // Initialize photoURL variable
            // Check if photo was uploaded
            if (req.file) {
                // Construct photo URL
                photoURL = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, "/")}`;
            }
            // Get existing user data
            const teams = yield queryCollection_1.Query.selectOneWithColumn('teams', ['team_name', 'coach_id', 'logo'], 'team_id', team_id);
            // Delete existing teams logo
            if (teams) {
                (0, deleteFastFile_1.default)((0, photoPath_1.default)(teams.logo));
            }
            // Construct update query
            let query = `UPDATE teams SET team_name = '${team_name}'`;
            if (coach_id) {
                query += `, coach_id = '${coach_id}'`;
            }
            if (photoURL) {
                query += `, logo = '${photoURL}'`;
            }
            query += ` WHERE team_id = '${team_id}'`;
            // Execute update query
            const result = yield queryCollection_1.Query.executeQuery(query);
            if (result) {
                // Success response
                res.status(200).send({
                    success: true,
                    message: 'Teams updated successfully',
                    updated: result
                });
            }
            else {
                // Error response
                res.status(400).send({
                    success: false,
                    message: 'Teams update failed'
                });
                // Delete newly uploaded photo file if update failed
                // if (photoURL) {
                //     deleteFastFile(req.file?.path);
                // }
            }
        }));
    }
    catch (error) {
        next(error);
    }
});
// Delete user
const deleteTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        // Validate ID to prevent SQL injection
        if (!/^\d+$/.test(id)) {
            throw new Error("Invalid ID");
        }
        const user = yield queryCollection_1.Query.executeQuery(`SELECT logo FROM teams WHERE team_id ='${id}'`);
        const path = (0, photoPath_1.default)(user[0].logo); //Old logo(db column name) URL
        const query = `DELETE FROM teams WHERE team_id = ${id}`;
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Team deleted successfully',
                deleted: result
            });
            (0, deleteFastFile_1.default)(path);
        }
        else {
            res.status(400).send({
                success: false,
                message: 'User deletion failed'
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.teamsController = {
    createTeam,
    getTeams,
    getTeamById,
    updateTeam,
    deleteTeam,
};
