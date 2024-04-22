"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        const fileExt = path_1.default.extname(file.originalname);
        const filename = file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") + "-" + Date.now();
        cb(null, filename + fileExt);
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1000000 //1 MB
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'photo') {
            if (file.mimetype === 'image/jpeg' ||
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/jpg') {
                cb(null, true);
            }
            else {
                cb(new Error("Only jpg,jpeg or png is allowed"));
            }
        }
        // For pdf
        // else if (file.fieldname === 'doc') {
        //     if (
        //         file.mimetype === 'application/pdf'
        //     ) {
        //         cb(null, true)
        //     }
        //     else {
        //         cb(new Error("Only .pdf is allowed"))
        //     }
        // }
        else {
            cb(new Error("There was unknown error"));
        }
    },
});
exports.default = upload;
