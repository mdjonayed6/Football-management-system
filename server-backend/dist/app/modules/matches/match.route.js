"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchRoutes = void 0;
const express_1 = __importDefault(require("express"));
const match_controller_1 = require("./match.controller");
const router = express_1.default.Router();
router.post('/', match_controller_1.matchController.createMatch);
router.get('/', match_controller_1.matchController.getAllMatches);
router.get('/:id', match_controller_1.matchController.getMatchInformation);
router.get('/next/matches', match_controller_1.matchController.getNextMatch);
router.delete('/:id', match_controller_1.matchController.deleteMatch);
router.put('/', match_controller_1.matchController.updateMatchInformation);
exports.matchRoutes = router;
