"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const error_middleware_1 = require("./middeleware/error.middleware");
const app = (0, express_1.default)();
// Body parser
app.use(express_1.default.json());
// Request logger
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});
// Routes
app.use("/auth", auth_routes_1.default);
// Error handler (must be last!)
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
