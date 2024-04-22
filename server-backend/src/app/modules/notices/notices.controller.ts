import { NextFunction, Request, Response } from "express";
import { Query } from "../../lib/dbQuery/queryCollection";

const createNotice = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description } = req.body;
    const query = `INSERT INTO notices (title, description) VALUES ('${title}', '${description}')`;
    try {
        const result = await Query.executeQuery(query);
        if (result) {
            res.status(200).send({
                success: true,
                message: 'Notice created successfully'
            })
        } else {
            res.status(400).send({
                success: false,
                message: 'Something went wrong'
            })
        }
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Something went wrong'
        })
    }
}

const getNotice = async (req: Request, res: Response, next: NextFunction) => {
    const query = `SELECT * FROM notices ORDER BY  created_at DESC`;
    try {
        const result = await Query.executeQuery(query);
        if (result) {
            res.status(200).send({
                success: true,
                data: result
            })
        } else {
            res.status(400).send({
                success: false,
                message: 'Something went wrong'
            })
        }
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Something went wrong'
        })
    }
}

const deleteNotice = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
        const query = `DELETE FROM notices WHERE id = ${id}`;
        const result = await Query.executeQuery(query);

        if (result.affectedRows > 0) {
            res.status(200).send({
                success: true,
                message: 'Notice deleted successfully',
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'Notice not found',
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
};

export const noticeController = {
    createNotice,
    getNotice,
    deleteNotice
}