"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const AppError_1 = require("../utils/AppError");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError_1.AppError("Unauthorized", 401);
    }
    const token = authHeader.split(" ")[1];
    const decoded = (0, jwt_1.verifyToken)(token);
    req.user = { id: decoded.userId };
    next();
};
exports.authMiddleware = authMiddleware;
