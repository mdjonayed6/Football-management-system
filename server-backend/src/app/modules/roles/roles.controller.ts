import { NextFunction, Request, Response } from "express";
import { Query } from "../../lib/dbQuery/queryCollection";

// Creating roles
const createRoles = async (req: Request, res: Response, next: NextFunction) => {
    const rolesName = req.body.role_name
    const query = `INSERT INTO roles (role_name) VALUES ('${rolesName}')`;
    try {
        const result = await Query.executeQuery(query)
        if (result) {
            res.status(200).send({
                success: true,
                message: 'roles created successfully',
                result: result
            })
        }
    } catch (error) {
        next(error)
    }
}

// Getting the roles
const getRoles = async (req: Request, res: Response, next: NextFunction) => {
    const roles = await Query.selectAll('roles')
    if (roles) {
        res.status(200).send({
            success: true,
            message: 'roles fetched successfully',
            result: roles
        })
    }
}

export const rolesController = {
    createRoles,
    getRoles,
}