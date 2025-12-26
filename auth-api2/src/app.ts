import express from "express";
import authRouter from "./routes/auth.routes";
import { errorMiddleware } from "./middeleware/error.middleware";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const app = express();
app.use(helmet());
app.use(cors());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later'
}));

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
