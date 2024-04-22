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
exports.noticeController = void 0;
const queryCollection_1 = require("../../lib/dbQuery/queryCollection");
const createNotice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const query = `INSERT INTO notices (title, description) VALUES ('${title}', '${description}')`;
    try {
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Notice created successfully'
            });
        }
        else {
            res.status(400).send({
                success: false,
                message: 'Something went wrong'
            });
        }
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: 'Something went wrong'
        });
    }
});
const getNotice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT * FROM notices ORDER BY  created_at DESC`;
    try {
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result) {
            res.status(200).send({
                success: true,
                data: result
            });
        }
        else {
            res.status(400).send({
                success: false,
                message: 'Something went wrong'
            });
        }
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: 'Something went wrong'
        });
    }
});
const deleteNotice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const query = `DELETE FROM notices WHERE id = ${id}`;
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result.affectedRows > 0) {
            res.status(200).send({
                success: true,
                message: 'Notice deleted successfully',
            });
        }
        else {
            res.status(404).send({
                success: false,
                message: 'Notice not found',
            });
        }
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
});
exports.noticeController = {
    createNotice,
    getNotice,
    deleteNotice
};
