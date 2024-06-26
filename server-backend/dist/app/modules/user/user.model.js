"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String },
    password: { type: String }
});
const userModel = (0, mongoose_1.model)('user', userSchema);
exports.default = userModel;
