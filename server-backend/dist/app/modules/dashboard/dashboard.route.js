"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dashboard_controller_1 = require("./dashboard.controller");
const router = express_1.default.Router();
router.get('/players', dashboard_controller_1.dashboardController.getTotalPlayers);
router.get('/print-player', dashboard_controller_1.dashboardController.printPlayers);
router.get('/print-coach', dashboard_controller_1.dashboardController.printCoach);
router.get('/print-referee', dashboard_controller_1.dashboardController.printReferee);
router.get('/:email', dashboard_controller_1.dashboardController.CoachMyTeam);
exports.dashboardRoutes = router;
