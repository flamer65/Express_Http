import { query } from "../db";
import { hashPassword } from "../utils/hash";
import { AppError } from "../utils/AppError";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt";
export const registerUser = async (email: string, password: string) => {
    const existing = await query("SELECT id FROM users WHERE email = $1", [
        email,
    ]);

    if ((existing.rowCount ?? 0) > 0) {
        throw new AppError("Email already exists", 409);
    }

    const hashed = await hashPassword(password);

    const result = await query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
        [email, hashed]
    );

    return result.rows[0];
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const result = await query(
    "SELECT id, email, password FROM users WHERE email = $1",
    [email]
  );

  if (result.rowCount === 0) {
    throw new AppError("Invalid credentials", 401);
  }

  const user = result.rows[0];

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = signToken({ userId: user.id });

  return token;
};

