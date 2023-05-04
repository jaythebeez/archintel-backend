import { Request, Response, NextFunction } from "express";

interface customError{
    status: number,
    name: string,
    message: string
}

const errorHandler = (error: customError, req:Request, res: Response, next: NextFunction) => {
    res.status(400).json({message: error.message, name: error.name})
}

export default errorHandler;