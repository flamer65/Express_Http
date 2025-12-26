export const healthController = (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
    });
};
//throw new Error("Test error");
//# sourceMappingURL=health.controllers.js.map