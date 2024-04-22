"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noticeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const notices_controller_1 = require("./notices.controller");
const router = express_1.default.Router();
router.get('/', notices_controller_1.noticeController.getNotice);
router.post('/', notices_controller_1.noticeController.createNotice);
router.delete('/:id', notices_controller_1.noticeController.deleteNotice);
exports.noticeRoutes = router;
