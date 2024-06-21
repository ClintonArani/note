"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['token'];
        if (!token) {
            return res.status(401).json({
                error: "You do not have access"
            });
        }
        else {
            let data = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            req.info = data;
        }
    }
    catch (error) {
        return res.json({
            error
        });
    }
    next();
};
exports.verifyToken = verifyToken;
