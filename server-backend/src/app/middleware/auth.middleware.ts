import { NextFunction, Request, Response } from "express";
import { Query } from "../lib/dbQuery/queryCollection";

// Middleware for admin role
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.query.email;
    const user = await Query.selectOne('users', 'email', email);

    // Check if user exists and has a role
    if (user && user.role_id == 2) {
        next(); // Grant access for admin
    } else {
        res.status(401).send({
            success: false,
            message: 'You are not allowed to access this portion'
        });
    }
}

// Middleware for user role
export const isUser = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.query.email;
    const user = await Query.selectOne('users', 'email', email);

    // Check if user exists and has a role
    if (user ) {
        next(); // Grant access for user
    } else {
        res.status(401).send({
            success: false,
            message: 'You are not allowed to access this portion'
        });
    }
}
