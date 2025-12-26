import { verifyToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new AppError("Unauthorized", 401);
  }

  const token = authHeader.split("Bearer")[1].trim();

  const decoded = verifyToken(token) as any;

  req.user = { id: decoded.userId };

  next();
};