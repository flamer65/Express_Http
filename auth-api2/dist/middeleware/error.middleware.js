"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const AppError_1 = require("../utils/AppError");
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof AppError_1.AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }
    // Unknown / programming error
    console.error(err);
    res.status(500).json({
        message: "Internal Server Error",
    });
};
exports.errorMiddleware = errorMiddleware;
