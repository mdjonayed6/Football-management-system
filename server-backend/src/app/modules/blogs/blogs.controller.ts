import { NextFunction, Request, Response } from "express";
import { Query } from "../../lib/dbQuery/queryCollection";

const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
    const blogs = await Query.selectAll('blogs');
    if (blogs) {
        res.status(200).send({
            success: true,
            message: 'blogs fetched successfully',
            result: blogs
        })
    }
}

const recentBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogs = await Query.executeQuery(`
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
        } else {
            res.status(404).send({
                success: false,
                message: 'No blogs found',
                result: []
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error fetching blogs',
        });
    }
}

const singleBlog = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const blog = await Query.selectOne('blogs', 'id', id);

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

    } catch (error) {
        next(error);
    }
}


const createBlog = async (req: Request, res: Response, next: NextFunction) => {
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
        const result = await Query.executeQuery(query);

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
        } else {
            throw new Error('Failed to create blog');
        }
    } catch (error) {
        next(error);
    }
};


const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
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
        const result = await Query.executeQuery(query);

        if (result && result.affectedRows > 0) {
            res.status(200).send({
                success: true,
                message: 'Blog deleted successfully'
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'Blog not found'
            });
        }
    } catch (error) {
        next(error);
    }
};

const getSingleBlog = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const query = `SELECT * FROM blogs WHERE id = '${id}'`
        const blog = await Query.executeQuery(query);

        if (blog) {
            res.status(200).send({
                success: true,
                message: 'Blog fetched successfully',
                result: blog
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'Blog not found'
            });
        }
    } catch (error) {
        next(error);
    }
};

// Update controller
const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, description, photo } = req.body;

    const query = `
        UPDATE blogs
        SET title = '${title}', description = '${description}', photo = '${photo}'
        WHERE id = ${id}
    `;

    try {
        const result = await Query.executeQuery(query);

        if (result.affectedRows > 0) {
            res.status(200).send({
                success: true,
                message: 'Blog updated successfully',
                result: result
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'Blog not found'
            });
        }
    } catch (error) {
        next(error);
    }
};



export const blogsController = {
    getBlogs,
    recentBlogs,
    singleBlog,
    createBlog,
    deleteBlog,
    getSingleBlog,
    updateBlog
}