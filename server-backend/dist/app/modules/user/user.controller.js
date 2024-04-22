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
exports.userController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const deleteFile_1 = __importDefault(require("../../utils/fileManagement/deleteFile"));
const queryCollection_1 = require("../../lib/dbQuery/queryCollection");
const upload_config_1 = require("../../utils/fileManagement/upload.config");
const deleteFastFile_1 = __importDefault(require("../../lib/file/deleteFastFile"));
const password_hash_1 = __importDefault(require("password-hash"));
const photoPath_1 = __importDefault(require("../../lib/file/photoPath"));
// Create user
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Photo upload middleware
        upload_config_1.photoUpload.single('photo')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (err) {
                console.error('Error uploading photo:', err);
                return next(err);
            }
            // Access form data and uploaded file
            const { username, password, email, role_id, dob, dept, conditions, experience, id_no, phone, gender, address } = req.body;
            const photoPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
            const photoURL = `${req.protocol}://${req.get('host')}/` + (photoPath === null || photoPath === void 0 ? void 0 : photoPath.replace(/\\/g, "/"));
            const hashedPassword = password_hash_1.default.generate(password);
            const existingUser = yield queryCollection_1.Query.selectOne('users', 'email', email);
            if (existingUser) {
                (0, deleteFastFile_1.default)(photoPath);
                return res.status(400).send({
                    success: false,
                    message: 'User already exists'
                });
            }
            // Check for missing or empty fields
            if (!username || !password || !email || !photoPath || !role_id ||
                !dob || !dept || !conditions || !experience || !id_no || !phone || !gender || !address) {
                // Delete the file if it exists
                if (photoPath) {
                    (0, deleteFastFile_1.default)(photoPath);
                }
                return res.status(400).send({
                    success: false,
                    message: 'Please provide all required fields'
                });
            }
            const query = `
                INSERT INTO users (
                    username, password, email, photo, role_id, dob, dept, conditions, 
                    experience, id_no, phone, gender, address
                ) 
                VALUES (
                    '${username}', '${hashedPassword}', '${email}', '${photoURL}', 
                    '${role_id}', '${dob}', '${dept}', '${conditions}', '${experience}', 
                    '${id_no}', '${phone}', '${gender}', '${address}'
                )
            `;
            try {
                const result = yield queryCollection_1.Query.executeQuery(query);
                if (result) {
                    res.status(200).send({
                        success: true,
                        message: 'User created successfully',
                        userdata: result
                    });
                }
                else {
                    res.status(400).send({
                        success: false,
                        message: 'User creation failed'
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
// Getting all users
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    try {
        // Construct the SQL query with JOIN
        const query = `
            SELECT users.user_id, users.username, users.email, users.photo, roles.role_id, roles.role_name
            FROM users
            INNER JOIN roles ON users.role_id = roles.role_id
            ORDER BY users.user_id DESC
            LIMIT ${limit} OFFSET ${(currentPage - 1) * limit};`;
        // Execute the query to fetch users
        const usersResult = yield queryCollection_1.Query.executeQuery(query);
        // Count the total number of rows in the users table
        const countQuery = `SELECT COUNT(*) AS total FROM users;`;
        const countResult = yield queryCollection_1.Query.executeQuery(countQuery);
        const total = countResult[0].total;
        res.status(200).json({
            success: true,
            message: 'User info fetched successfully',
            users: usersResult,
            total: total,
            offset: (currentPage - 1) * limit,
            limit: limit
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllPlayers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    try {
        // Construct the SQL query with JOIN
        const query = `
            SELECT users.user_id, users.username, users.email, users.photo, roles.role_id, roles.role_name
            FROM users
            INNER JOIN roles ON users.role_id = roles.role_id
            WHERE users.role_id = '4'
            ORDER BY users.user_id DESC
            LIMIT ${limit} OFFSET ${(currentPage - 1) * limit};`;
        // Execute the query to fetch users
        const usersResult = yield queryCollection_1.Query.executeQuery(query);
        // Count the total number of rows in the users table
        const countQuery = `SELECT COUNT(*) AS total FROM users;`;
        const countResult = yield queryCollection_1.Query.executeQuery(countQuery);
        const total = countResult[0].total;
        res.status(200).json({
            success: true,
            message: 'User info fetched successfully',
            users: usersResult,
            total: total,
            offset: (currentPage - 1) * limit,
            limit: limit
        });
    }
    catch (err) {
        next(err);
    }
});
// Getting a single user
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const query = `
    SELECT *
    FROM users
    INNER JOIN roles ON users.role_id = roles.role_id
    WHERE users.user_id = ${id};
`;
        // Execute the query
        const userResult = yield queryCollection_1.Query.executeQuery(query);
        // If user not found, return error
        if (!userResult || userResult.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        // Extract the first row as the user object
        const user = userResult[0];
        // Respond with the fetched user information
        res.status(200).json({
            success: true,
            message: 'User info fetched successfully',
            user: user
        });
    }
    catch (err) {
        next(err);
    }
});
// Getting a single user by Email
const getSingleUserByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    try {
        // Construct the SQL query with JOIN
        const query = `
    SELECT 
        users.user_id, 
        users.username, 
        users.password, 
        users.email, 
        users.photo, 
        users.role_id, 
        users.status, 
        users.dob, 
        users.gender, 
        users.id_no, 
        users.dept, 
        users.address, 
        users.conditions, 
        users.experience, 
        users.phone,
        roles.role_name
    FROM users
    INNER JOIN roles ON users.role_id = roles.role_id
    WHERE users.email = '${email}';
`;
        // Execute the query
        const userResult = yield queryCollection_1.Query.executeQuery(query);
        // If user not found, return error
        if (!userResult || userResult.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        // Extract the first row as the user object
        const user = userResult[0];
        // Respond with the fetched user information
        res.status(200).json({
            success: true,
            message: 'User info fetched successfully',
            user: user
        });
    }
    catch (err) {
        next(err);
    }
});
// Perfect Update user TODO: Update user
// const updateUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         photoUpload.single('photo')(req, res, async (err) => {
//             if (err) {
//                 console.error('Error uploading photo:', err);
//                 return next(err);
//             }
//             const { username, password, email, role_id } = req.body;
//             let photoURL = ''; // Initialize photoURL variable
//             // Check if photo was uploaded
//             if (req.file) {
//                 // Construct photo URL
//                 photoURL = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, "/")}`;
//             }
//             // Get existing user data
//             const user = await Query.selectOneWithColumn('users', ['username', 'password', 'photo', 'email'], 'email', email);
//             // If user exists and photo is provided, delete old photo
//             if (user && req.file && user.photo) {
//                 deleteFastFile(parsedURL(user.photo));
//             }
//             // Construct update query
//             let query = `UPDATE users SET username = '${username}'`;
//             if (password) {
//                 query += `, password = '${passwordHash.generate(password)}'`;
//             }
//             if (role_id) {
//                 query += `, role_id = '${role_id}'`;
//             }
//             if (photoURL) {
//                 query += `, photo = '${photoURL}'`;
//             }
//             query += ` WHERE email = '${email}'`;
//             // Execute update query
//             const result = await Query.executeQuery(query);
//             if (result) {
//                 // Success response
//                 res.status(200).send({
//                     success: true,
//                     message: 'User updated successfully',
//                     updated: result
//                 });
//             } else {
//                 // Error response
//                 res.status(400).send({
//                     success: false,
//                     message: 'User update failed'
//                 });
//             }
//         });
//     } catch (error) {
//         next(error);
//     }
// }
// Perfect Update user TODO: Update user
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Handle photo upload
        upload_config_1.photoUpload.single('photo')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.error('Error uploading photo:', err);
                return next(err);
            }
            const { username, password, email, role_id, dob, dept, conditions, experience, id_no, phone, gender, address } = req.body;
            let photoURL = '';
            if (req.file) {
                photoURL = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, "/")}`;
            }
            const user = yield queryCollection_1.Query.selectOneWithColumn('users', ['username', 'password', 'photo', 'email'], 'email', email);
            if (user && req.file && user.photo) {
                (0, deleteFastFile_1.default)((0, photoPath_1.default)(user.photo));
            }
            let query = `UPDATE users SET username = '${username}', email = '${email}'`;
            if (password) {
                query += `, password = '${password_hash_1.default.generate(password)}'`;
            }
            if (role_id) {
                query += `, role_id = '${role_id}'`;
            }
            if (dob) {
                query += `, dob = '${dob}'`;
            }
            if (dept) {
                query += `, dept = '${dept}'`;
            }
            if (conditions) {
                query += `, conditions = '${conditions}'`;
            }
            if (experience) {
                query += `, experience = '${experience}'`;
            }
            if (id_no) {
                query += `, id_no = '${id_no}'`;
            }
            if (phone) {
                query += `, phone = '${phone}'`;
            }
            if (gender) {
                query += `, gender = '${gender}'`;
            }
            if (address) {
                query += `, address = '${address}'`;
            }
            if (photoURL) {
                query += `, photo = '${photoURL}'`;
            }
            query += ` WHERE email = '${email}'`;
            const result = yield queryCollection_1.Query.executeQuery(query);
            if (result) {
                res.status(200).send({
                    success: true,
                    message: 'User updated successfully',
                    updated: result
                });
            }
            else {
                res.status(400).send({
                    success: false,
                    message: 'User update failed'
                });
            }
        }));
    }
    catch (error) {
        next(error);
    }
});
// Delete user
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        // Validate ID to prevent SQL injection
        if (!/^\d+$/.test(id)) {
            throw new Error("Invalid ID");
        }
        const user = yield queryCollection_1.Query.executeQuery(`SELECT photo FROM users WHERE user_id ='${id}'`);
        const path = (0, photoPath_1.default)(user[0].photo); //Old photo URL
        const query = `DELETE FROM users WHERE user_id = ${id}`;
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result) {
            res.status(200).send({
                success: true,
                message: 'User deleted successfully',
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
// User sign in
const signInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    try {
        // const query = `SELECT username,email,password FROM users WHERE email='${email}'`
        const user = yield queryCollection_1.Query.selectOne('users', 'email', email);
        if (!user) {
            return res.status(403).send({
                success: false,
                message: 'Invalid email or password'
            });
        }
        const isPasswordValid = password_hash_1.default.verify(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).send({
                success: false,
                message: 'Invalid email or password'
            });
        }
        if (isPasswordValid && user) {
            // Sign in jwt token
            const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
            const token = jsonwebtoken_1.default.sign({ user }, `${accessTokenSecret}`, {
                expiresIn: '1h'
            });
            const SingedUser = {
                email: user.email,
                username: user.username,
            };
            res.status(200).json({
                success: true,
                user: SingedUser,
                token: token
            });
        }
        else {
            res.status(403).send({
                success: false,
                message: 'Invalid username or password'
            });
        }
    }
    catch (error) {
        res.status(403).send({
            success: false,
            message: 'Invalid username or password'
        });
    }
});
// Controller to search for users based on user ID, email, or username
const searchUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract pagination parameters from the request
        const currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : 5;
        const offset = (currentPage - 1) * limit;
        // Extract the search parameter from the request
        const searchTerm = req.query.searchterm;
        // Construct the SQL query to search for users with pagination
        const query = `
            SELECT SQL_CALC_FOUND_ROWS users.user_id, users.username, users.email, users.photo, roles.role_id, roles.role_name
            FROM users
            INNER JOIN roles ON users.role_id = roles.role_id
            WHERE users.user_id = '${searchTerm}' OR users.email LIKE '${searchTerm}' OR users.username LIKE '%${searchTerm}%'
            ORDER BY users.user_id DESC
            LIMIT ${limit}
            OFFSET ${offset}`;
        // Execute the query to fetch users
        const userResult = yield queryCollection_1.Query.executeQuery(query);
        // Execute a separate query to get the total count of rows in the table
        const totalCountQuery = 'SELECT FOUND_ROWS() AS total_count';
        const totalCountResult = yield queryCollection_1.Query.executeQuery(totalCountQuery);
        const totalCount = totalCountResult[0].total_count;
        // Respond with the fetched user information along with pagination details
        res.status(200).json({
            success: true,
            message: 'Users found successfully',
            users: userResult,
            total: totalCount,
            limit: limit,
            offset: offset
        });
    }
    catch (err) {
        next(err);
    }
});
// Controller to search for users based on user ID, email, or username
const searchPlayers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract pagination parameters from the request
        const currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : 5;
        const offset = (currentPage - 1) * limit;
        // Extract the search parameter from the request
        const searchTerm = req.query.searchterm;
        // Construct the SQL query to search for users with pagination
        const query = `
            SELECT SQL_CALC_FOUND_ROWS users.user_id, users.username, users.email, users.photo, roles.role_id, roles.role_name
            FROM users
            INNER JOIN roles ON users.role_id = roles.role_id
            WHERE users.user_id = '${searchTerm}' OR users.email LIKE '${searchTerm}' OR users.username LIKE '%${searchTerm}%'
            WHERE roles.role_id = '4'
            ORDER BY users.user_id DESC
            LIMIT ${limit}
            OFFSET ${offset}`;
        // Execute the query to fetch users
        const userResult = yield queryCollection_1.Query.executeQuery(query);
        // Execute a separate query to get the total count of rows in the table
        const totalCountQuery = 'SELECT FOUND_ROWS() AS total_count';
        const totalCountResult = yield queryCollection_1.Query.executeQuery(totalCountQuery);
        const totalCount = totalCountResult[0].total_count;
        // Respond with the fetched user information along with pagination details
        res.status(200).json({
            success: true,
            message: 'Users found successfully',
            users: userResult,
            total: totalCount,
            limit: limit,
            offset: offset
        });
    }
    catch (err) {
        next(err);
    }
});
// Find the Coach based on the email
const singleCoach = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    try {
        const query = `SELECT teams.team_id, teams.team_name, teams.coach_id, users.user_id, users.username, users.email
        FROM teams
        JOIN users ON teams.coach_id = users.user_id
        WHERE users.email = '${email}'
        `;
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Coach found successfully',
                coach: result[0]
            });
        }
    }
    catch (error) {
        next(error);
    }
});
// Get all referies
const getReferies = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT * FROM users WHERE role_id = '3'`;
    try {
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Referies found successfully',
                referies: result
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
// File Deleting
const deleteFileData = (req, res) => {
    const directoryPath = 'uploads/documents'; // Pass the directory path here
    const fileName = req.params.filename; // Pass the file name here
    (0, deleteFile_1.default)(directoryPath, fileName, (error, message) => {
        if (error) {
            res.status(404).send({ message: error.message });
        }
        else {
            res.status(200).send({ message: message }); // File deletion successful
        }
    });
};
// These are accessible from different files.
exports.userController = {
    createUser,
    getUsers,
    getSingleUser,
    getSingleUserByEmail,
    updateUser,
    deleteUser,
    signInUser,
    deleteFileData,
    searchUsers,
    singleCoach,
    getReferies,
    getAllPlayers,
    searchPlayers,
};
