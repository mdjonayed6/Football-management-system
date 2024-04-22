"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesController = void 0;
const queryCollection_1 = require("../../lib/dbQuery/queryCollection");
// Creating roles
const createRoles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rolesName = req.body.role_name;
    const query = `INSERT INTO roles (role_name) VALUES ('${rolesName}')`;
    try {
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result) {
            res.status(200).send({
                success: true,
                message: 'roles created successfully',
                result: result
            });
        }
    }
    catch (error) {
        next(error);
    }
});
// Getting the roles
const getRoles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield queryCollection_1.Query.selectAll('roles');
    if (roles) {
        res.status(200).send({
            success: true,
            message: 'roles fetched successfully',
            result: roles
        });
    }
});
exports.rolesController = {
    createRoles,
    getRoles,
};
