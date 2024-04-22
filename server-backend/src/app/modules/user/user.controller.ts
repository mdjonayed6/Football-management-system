import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import deleteFile from "../../utils/fileManagement/deleteFile";
import { Query } from "../../lib/dbQuery/queryCollection";
import { photoUpload } from "../../utils/fileManagement/upload.config";
import deleteFastFile from "../../lib/file/deleteFastFile";
import passwordHash from 'password-hash';
import parsedURL from "../../lib/file/photoPath";


// Create user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Photo upload middleware
        photoUpload.single('photo')(req, res, async (err) => {
            if (err) {
                console.error('Error uploading photo:', err);
                return next(err);
            }

            // Access form data and uploaded file
            const {
                username, password, email, role_id, dob, dept, conditions,
                experience, id_no, phone, gender, address
            } = req.body;

            const photoPath = req.file?.path;
            const photoURL = `${req.protocol}://${req.get('host')}/` + photoPath?.replace(/\\/g, "/");

            const hashedPassword = passwordHash.generate(password);

            const existingUser = await Query.selectOne('users', 'email', email);

            if (existingUser) {
                deleteFastFile(photoPath);
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
                    deleteFastFile(photoPath);
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
                const result = await Query.executeQuery(query);

                if (result) {
                    res.status(200).send({
                        success: true,
                        message: 'User created successfully',
                        userdata: result
                    });
                } else {
                    res.status(400).send({
                        success: false,
                        message: 'User creation failed'
                    });
                }
            } catch (error) {
                console.error('Error executing query:', error);
                next(error);
            }
        });
    } catch (error) {
        console.error('Error in createUser controller:', error);
        next(error);
    }
};


// Getting all users
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const currentPage = req.query.currentPage ? parseInt(req.query.currentPage as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

    try {
        // Construct the SQL query with JOIN
        const query = `
            SELECT users.user_id, users.username, users.email, users.photo, roles.role_id, roles.role_name
            FROM users
            INNER JOIN roles ON users.role_id = roles.role_id
            ORDER BY users.user_id DESC
            LIMIT ${limit} OFFSET ${(currentPage - 1) * limit};`;

        // Execute the query to fetch users
        const usersResult = await Query.executeQuery(query);

        // Count the total number of rows in the users table
        const countQuery = `SELECT COUNT(*) AS total FROM users;`;
        const countResult = await Query.executeQuery(countQuery);
        const total = countResult[0].total;

        res.status(200).json({
            success: true,
            message: 'User info fetched successfully',
            users: usersResult,
            total: total,
            offset: (currentPage - 1) * limit,
            limit: limit
        });
    } catch (err) {
        next(err);
    }

};
const getAllPlayers = async (req: Request, res: Response, next: NextFunction) => {
    const currentPage = req.query.currentPage ? parseInt(req.query.currentPage as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

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
        const usersResult = await Query.executeQuery(query);

        // Count the total number of rows in the users table
        const countQuery = `SELECT COUNT(*) AS total FROM users;`;
        const countResult = await Query.executeQuery(countQuery);
        const total = countResult[0].total;

        res.status(200).json({
            success: true,
            message: 'User info fetched successfully',
            users: usersResult,
            total: total,
            offset: (currentPage - 1) * limit,
            limit: limit
        });
    } catch (err) {
        next(err);
    }

};

// Getting a single user
const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
        const query = `
    SELECT *
    FROM users
    INNER JOIN roles ON users.role_id = roles.role_id
    WHERE users.user_id = ${id};
`;

        // Execute the query
        const userResult = await Query.executeQuery(query);

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
    } catch (err) {
        next(err);
    }

};
// Getting a single user by Email
const getSingleUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
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
        const userResult = await Query.executeQuery(query);

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
    } catch (err) {
        next(err);
    }
};

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
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Handle photo upload
        photoUpload.single('photo')(req, res, async (err) => {
            if (err) {
                console.error('Error uploading photo:', err);
                return next(err);
            }

            const {
                username,
                password,
                email,
                role_id,
                dob,
                dept,
                conditions,
                experience,
                id_no,
                phone,
                gender,
                address
            } = req.body;

            let photoURL = '';

            if (req.file) {
                photoURL = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, "/")}`;
            }

            const user = await Query.selectOneWithColumn('users', ['username', 'password', 'photo', 'email'], 'email', email);

            if (user && req.file && user.photo) {
                deleteFastFile(parsedURL(user.photo));
            }

            let query = `UPDATE users SET username = '${username}', email = '${email}'`;

            if (password) {
                query += `, password = '${passwordHash.generate(password)}'`;
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

            const result = await Query.executeQuery(query);

            if (result) {
                res.status(200).send({
                    success: true,
                    message: 'User updated successfully',
                    updated: result
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: 'User update failed'
                });
            }
        });
    } catch (error) {
        next(error);
    }
};


// Delete user
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        // Validate ID to prevent SQL injection
        if (!/^\d+$/.test(id)) {
            throw new Error("Invalid ID");
        }

        const user = await Query.executeQuery(`SELECT photo FROM users WHERE user_id ='${id}'`)
        const path = parsedURL(user[0].photo) //Old photo URL
        const query = `DELETE FROM users WHERE user_id = ${id}`;
        const result = await Query.executeQuery(query);

        if (result) {
            res.status(200).send({
                success: true,
                message: 'User deleted successfully',
                deleted: result
            });
            deleteFastFile(path);
        } else {
            res.status(400).send({
                success: false,
                message: 'User deletion failed'
            });
        }
    } catch (error) {
        next(error);
    }
}

// User sign in
const signInUser = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        // const query = `SELECT username,email,password FROM users WHERE email='${email}'`
        const user = await Query.selectOne('users', 'email', email)
        if (!user) {
            return res.status(403).send({
                success: false,
                message: 'Invalid email or password'
            });
        }
        const isPasswordValid = passwordHash.verify(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).send({
                success: false,
                message: 'Invalid email or password'
            });
        }

        if (isPasswordValid && user) {
            // Sign in jwt token
            const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
            const token = jwt.sign({ user }, `${accessTokenSecret}`, {
                expiresIn: '1h'
            })

            const SingedUser = {
                email: user.email,
                username: user.username,
            }
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
            })
        }
    } catch (error) {
        res.status(403).send({
            success: false,
            message: 'Invalid username or password'
        })
    }
}

// Controller to search for users based on user ID, email, or username
const searchUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract pagination parameters from the request
        const currentPage = req.query.currentPage ? parseInt(req.query.currentPage as string) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
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
        const userResult = await Query.executeQuery(query);

        // Execute a separate query to get the total count of rows in the table
        const totalCountQuery = 'SELECT FOUND_ROWS() AS total_count';
        const totalCountResult = await Query.executeQuery(totalCountQuery);
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
    } catch (err) {
        next(err);
    }
};
// Controller to search for users based on user ID, email, or username
const searchPlayers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract pagination parameters from the request
        const currentPage = req.query.currentPage ? parseInt(req.query.currentPage as string) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
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
        const userResult = await Query.executeQuery(query);

        // Execute a separate query to get the total count of rows in the table
        const totalCountQuery = 'SELECT FOUND_ROWS() AS total_count';
        const totalCountResult = await Query.executeQuery(totalCountQuery);
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
    } catch (err) {
        next(err);
    }
};


// Find the Coach based on the email
const singleCoach = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.params.email;
    try {
        const query = `SELECT teams.team_id, teams.team_name, teams.coach_id, users.user_id, users.username, users.email
        FROM teams
        JOIN users ON teams.coach_id = users.user_id
        WHERE users.email = '${email}'
        `
        const result = await Query.executeQuery(query)
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Coach found successfully',
                coach: result[0]
            })
        }
    } catch (error) {
        next(error)
    }
}

// Get all referies
const getReferies = async (req: Request, res: Response, next: NextFunction) => {
    const query = `SELECT * FROM users WHERE role_id = '3'`;
    try {
        const result = await Query.executeQuery(query)
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Referies found successfully',
                referies: result
            })

        }
    } catch (error) {
        console.log(error)
    }

}



// File Deleting
const deleteFileData = (req: Request, res: Response) => {
    const directoryPath = 'uploads/documents'; // Pass the directory path here
    const fileName = req.params.filename; // Pass the file name here
    deleteFile(directoryPath, fileName, (error, message) => {
        if (error) {
            res.status(404).send({ message: error.message });
        } else {
            res.status(200).send({ message: message }); // File deletion successful
        }
    });
}

// These are accessible from different files.
export const userController = {
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
}