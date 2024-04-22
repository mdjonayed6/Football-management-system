"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineupsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const lineups_controller_1 = require("./lineups.controller");
const router = express_1.default.Router();
router.post('/', lineups_controller_1.lineupsController.createLineups);
router.get('/', lineups_controller_1.lineupsController.getAllLineUps);
router.get('/:id', lineups_controller_1.lineupsController.getLineupsInformation);
router.put('/', lineups_controller_1.lineupsController.updateLineupInformation);
router.delete('/:id', lineups_controller_1.lineupsController.deleteLineupInformation);
exports.lineupsRoutes = router;
