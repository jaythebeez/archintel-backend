import { expressjwt } from "express-jwt";
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/request.js";

dotenv.config();

// middleware to make sure user is signed in before getting access to some routes
export const requireSignin = expressjwt({
    getToken: (req) => req.cookies.token ?? req.headers.authorization?.split(" ")[1],
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
})

export const getIdFromJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token ?? req.headers.authorization?.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    const decoded  = jwt.verify(token, secret) as JwtPayload;
    const userId = decoded._id;
    req.userId = userId;
    next();
}