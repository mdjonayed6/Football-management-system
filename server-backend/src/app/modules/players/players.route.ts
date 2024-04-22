import express from 'express';
import { playersController } from './players.controller';

const router = express.Router();

router.post('/', playersController.createPlayer)
router.get('/', playersController.getAllPlayers)
router.get('/:id', playersController.getPlayerInformation)
router.get('/search/player', playersController.searchPlayers)
router.put('/', playersController.updatePlayerInformation)
router.delete('/:id', playersController.deletePlayerInformation)

router.get('/coach/player/:email', playersController.playerForCoach)
router.get('/team/myteam/:email', playersController.myTeam)
router.get('/team/myteamplayer/:teamId', playersController.myTeamPlayers)
router.get('/team/playerschedule/:userId', playersController.playerMatchSchedule)

export const playerRoutes = router;


