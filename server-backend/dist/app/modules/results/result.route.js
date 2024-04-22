"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultRoutes = void 0;
const express_1 = __importDefault(require("express"));
const result_controller_1 = require("./result.controller");
const router = express_1.default.Router();
router.post('/', result_controller_1.matchResultController.createMatchResult);
router.get('/', result_controller_1.matchResultController.getAllResults);
router.get('/:id', result_controller_1.matchResultController.getResultsInformation);
router.get('/rank/results', result_controller_1.matchResultController.matchResultRanking);
router.put('/', result_controller_1.matchResultController.updateResultInformation);
router.delete('/:id', result_controller_1.matchResultController.deleteResultInformation);
exports.resultRoutes = router;
