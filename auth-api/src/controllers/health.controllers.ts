import type { Request, Response } from "express";

export const healthController = (req: Request, res: Response) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
    });
};

//throw new Error("Test error");
