"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const roles_controller_1 = require("./roles.controller");
const router = express_1.default.Router();
router.post('/', roles_controller_1.rolesController.createRoles);
router.get('/', roles_controller_1.rolesController.getRoles);
exports.rolesRoutes = router;
