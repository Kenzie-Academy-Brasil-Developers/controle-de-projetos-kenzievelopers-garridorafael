import { NextFunction, Request, Response } from "express";
import { AppError } from "../Errors";

export const handleErrors = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response => {
    if (error instanceof AppError) {
      return res.status(error.status).json({ error: error.message });
    }
  
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  };