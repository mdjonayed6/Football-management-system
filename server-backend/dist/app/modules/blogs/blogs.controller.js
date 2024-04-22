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
exports.blogsController = void 0;
const queryCollection_1 = require("../../lib/dbQuery/queryCollection");
const getBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield queryCollection_1.Query.selectAll('blogs');
    if (blogs) {
        res.status(200).send({
            success: true,
            message: 'blogs fetched successfully',
            result: blogs
        });
    }
});
const recentBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield queryCollection_1.Query.executeQuery(`
            SELECT * FROM blogs
            ORDER BY created_at DESC
            LIMIT 2
        `);
        if (blogs.length > 0) {
            res.status(200).send({
                success: true,
                message: 'Recent blogs fetched successfully',
                result: blogs
            });
        }
        else {
            res.status(404).send({
                success: false,
                message: 'No blogs found',
                result: []
            });
        }
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error fetching blogs',
        });
    }
});
const singleBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const blog = yield queryCollection_1.Query.selectOne('blogs', 'id', id);
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found',
            });
        }
        res.status(200).send({
            success: true,
            message: 'Blog fetched successfully',
            result: blog,
        });
    }
    catch (error) {
        next(error);
    }
});
const createBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, photo } = req.body;
    if (!title || !description || !photo) {
        return res.status(400).send({
            success: false,
            message: 'All fields are required'
        });
    }
    const query = `
        INSERT INTO blogs (title, description, photo)
        VALUES ('${title}', '${description}', '${photo}')
    `;
    try {
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result) {
            res.status(201).send({
                success: true,
                message: 'Blog created successfully',
                result: {
                    id: result.insertId,
                    title,
                    description,
                    photo,
                    created_at: new Date().toISOString()
                }
            });
        }
        else {
            throw new Error('Failed to create blog');
        }
    }
    catch (error) {
        next(error);
    }
});
const deleteBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({
            success: false,
            message: 'Blog ID is required'
        });
    }
    const query = `
        DELETE FROM blogs
        WHERE id = ${id}
    `;
    try {
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result && result.affectedRows > 0) {
            res.status(200).send({
                success: true,
                message: 'Blog deleted successfully'
            });
        }
        else {
            res.status(404).send({
                success: false,
                message: 'Blog not found'
            });
        }
    }
    catch (error) {
        next(error);
    }
});
const getSingleBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `SELECT * FROM blogs WHERE id = '${id}'`;
        const blog = yield queryCollection_1.Query.executeQuery(query);
        if (blog) {
            res.status(200).send({
                success: true,
                message: 'Blog fetched successfully',
                result: blog
            });
        }
        else {
            res.status(404).send({
                success: false,
                message: 'Blog not found'
            });
        }
    }
    catch (error) {
        next(error);
    }
});
// Update controller
const updateBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, photo } = req.body;
    const query = `
        UPDATE blogs
        SET title = '${title}', description = '${description}', photo = '${photo}'
        WHERE id = ${id}
    `;
    try {
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result.affectedRows > 0) {
            res.status(200).send({
                success: true,
                message: 'Blog updated successfully',
                result: result
            });
        }
        else {
            res.status(404).send({
                success: false,
                message: 'Blog not found'
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.blogsController = {
    getBlogs,
    recentBlogs,
    singleBlog,
    createBlog,
    deleteBlog,
    getSingleBlog,
    updateBlog
};
