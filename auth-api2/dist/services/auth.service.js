"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const db_1 = require("../db");
const hash_1 = require("../utils/hash");
const AppError_1 = require("../utils/AppError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const registerUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const existing = yield (0, db_1.query)("SELECT id FROM users WHERE email = $1", [
        email,
    ]);
    if (((_a = existing.rowCount) !== null && _a !== void 0 ? _a : 0) > 0) {
        throw new AppError_1.AppError("Email already exists", 409);
    }
    const hashed = yield (0, hash_1.hashPassword)(password);
    const result = yield (0, db_1.query)("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email", [email, hashed]);
    return result.rows[0];
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, db_1.query)("SELECT id, email, password FROM users WHERE email = $1", [email]);
    if (result.rowCount === 0) {
        throw new AppError_1.AppError("Invalid credentials", 401);
    }
    const user = result.rows[0];
    const isValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isValid) {
        throw new AppError_1.AppError("Invalid credentials", 401);
    }
    const token = (0, jwt_1.signToken)({ userId: user.id });
    return token;
});
exports.loginUser = loginUser;
