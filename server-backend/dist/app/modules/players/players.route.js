"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const players_controller_1 = require("./players.controller");
const router = express_1.default.Router();
router.post('/', players_controller_1.playersController.createPlayer);
router.get('/', players_controller_1.playersController.getAllPlayers);
router.get('/:id', players_controller_1.playersController.getPlayerInformation);
router.get('/search/player', players_controller_1.playersController.searchPlayers);
router.put('/', players_controller_1.playersController.updatePlayerInformation);
router.delete('/:id', players_controller_1.playersController.deletePlayerInformation);
router.get('/coach/player/:email', players_controller_1.playersController.playerForCoach);
router.get('/team/myteam/:email', players_controller_1.playersController.myTeam);
router.get('/team/myteamplayer/:teamId', players_controller_1.playersController.myTeamPlayers);
router.get('/team/playerschedule/:userId', players_controller_1.playersController.playerMatchSchedule);
exports.playerRoutes = router;
