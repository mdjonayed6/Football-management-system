"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blogs_controller_1 = require("./blogs.controller");
const router = express_1.default.Router();
router.get('/', blogs_controller_1.blogsController.getBlogs);
router.post('/', blogs_controller_1.blogsController.createBlog);
router.put('/:id', blogs_controller_1.blogsController.updateBlog);
router.get('/recent', blogs_controller_1.blogsController.recentBlogs);
router.get('/single/:id', blogs_controller_1.blogsController.getSingleBlog);
router.delete('/:id', blogs_controller_1.blogsController.deleteBlog);
router.get('/single-blog/:id', blogs_controller_1.blogsController.singleBlog);
exports.blogsRoutes = router;
