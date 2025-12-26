import express from "express";
import authRouter from "./routes/auth.routes";
import { errorMiddleware } from "./middeleware/error.middleware";

const app = express();

// Body parser
app.use(express.json());

// Request logger
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

// Routes
app.use("/auth", authRouter);

// Error handler (must be last!)
app.use(errorMiddleware);

export default app;
