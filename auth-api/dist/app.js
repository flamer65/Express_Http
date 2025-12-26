import express from "express";
import healthRouter from "./routes/health.routes.js";
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});
app.use("/health", healthRouter);
export default app;
//# sourceMappingURL=app.js.map