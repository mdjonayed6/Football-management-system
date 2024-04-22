import express from "express";
import { userController } from "./user.controller";
import verifyToken from "../../middleware/verifyToken.middleware";
import { isAdmin, isUser } from "../../middleware/auth.middleware";

const router = express.Router()

router.post('/', userController.createUser)
router.post('/login', userController.signInUser)
router.get('/', userController.getUsers)
router.get('/:id', userController.getSingleUser)
router.put('/', userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.get('/single/user', userController.getSingleUserByEmail)
router.get('/get/all-players', userController.getAllPlayers)
router.get('/search/user', userController.searchUsers)
router.get('/search/player', userController.searchPlayers)
router.get('/referee/user', userController.getReferies)
router.get('/search/coach/:email', userController.singleCoach)

// File Management Routes
router.delete('/delete/:filename', userController.deleteFileData)

// Payment Gateway Routes

// Redirect URL will be in app.ts file, Here redirect URL will not work


/**
 * MIDDLEWARE CONFIGURATION
 * --------------------------------
 * */

// router.get('/', verifyToken, isAdmin,  userController.getUsers)

export const userRoutes = router;