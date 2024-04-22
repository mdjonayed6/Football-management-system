import express from 'express'
import { dashboardController } from './dashboard.controller'

const router = express.Router()

router.get('/players', dashboardController.getTotalPlayers)
router.get('/print-player', dashboardController.printPlayers)
router.get('/print-coach', dashboardController.printCoach)
router.get('/print-referee', dashboardController.printReferee)
router.get('/:email', dashboardController.CoachMyTeam);


export const dashboardRoutes = router;