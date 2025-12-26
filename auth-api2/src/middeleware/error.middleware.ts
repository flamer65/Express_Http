import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { ZodError } from "zod";
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.issues.map((e: any) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  const statusCode = err.statusCode || 500;
  if (err instanceof AppError) {
    return res.status(statusCode).json({
      message: err.message,
    });
  }

  // Unknown / programming error
  console.error(err);

  res.status(statusCode).json({
    message: "Internal Server Error",
  });
};
