import { registerUser } from "../services/auth.service";
import { Request, Response } from "express";
import { loginUser } from "../services/auth.service";
export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await registerUser(email, password);

  res.status(201).json(user);
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await loginUser(email, password);

  res.status(200).json({ token });
};

export const meController = async (req: Request, res: Response) => {
    const user = req.user?.id;
    res.status(200).json(user);
};