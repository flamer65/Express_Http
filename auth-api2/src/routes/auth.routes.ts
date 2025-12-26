import { Router } from "express";
import { registerController } from "../controllers/auth.controller";
import { validate } from "../middeleware/validate.middleware";
import { registerSchema } from "../schemas/auth.schema";
import { asyncHandler } from "../middeleware/asyncHandler";
import { loginController } from "../controllers/auth.controller";
import { loginSchema } from "../schemas/auth.schema";
import { authMiddleware } from "../middeleware/auth.middleware";
import { meController } from "../controllers/auth.controller";
const router = Router();

router.post(
    "/register",
    validate(registerSchema),
    asyncHandler(registerController)
);
router.post(
    "/login",
    validate(loginSchema),
    asyncHandler(loginController)
);
router.get("/me", authMiddleware, asyncHandler(meController));
export default router;
