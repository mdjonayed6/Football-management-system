"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refereeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const referee_controller_1 = require("./referee.controller");
const router = express_1.default.Router();
router.post('/', referee_controller_1.refereeController.createReferee);
router.get('/', referee_controller_1.refereeController.getAllReferee);
router.get('/:id', referee_controller_1.refereeController.getRefereeInformation);
router.get('/match/:id', referee_controller_1.refereeController.refereeMatch);
router.put('/', referee_controller_1.refereeController.updateRefereeInformation);
router.delete('/:id', referee_controller_1.refereeController.deleteRefereeInformation);
exports.refereeRoutes = router;
