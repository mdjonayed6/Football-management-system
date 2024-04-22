"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamsRouter = void 0;
const express_1 = __importDefault(require("express"));
const teams_controller_1 = require("./teams.controller");
const router = express_1.default.Router();
router.post('/', teams_controller_1.teamsController.createTeam);
router.get('/', teams_controller_1.teamsController.getTeams);
router.get('/:id', teams_controller_1.teamsController.getTeamById);
router.put('/', teams_controller_1.teamsController.updateTeam);
router.delete('/:id', teams_controller_1.teamsController.deleteTeam);
exports.teamsRouter = router;
