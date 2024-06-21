"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSchema = joi_1.default.object({
    FirstName: joi_1.default.string().min(2).required(),
    LastName: joi_1.default.string().min(2).required(),
    email: joi_1.default.string().email().required(),
    phone_number: joi_1.default.string().regex(/^[0-9]{10}$/).required().messages({
        'string.empty': 'Phone number is required',
        'string.pattern.base': 'Phone number must be atleast 10 digits'
    }),
    password: joi_1.default.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/).required().messages({
        'string.empty': 'Password is required',
        'string.pattern.base': 'Password must be atleast 8 characters long and contain letters and numbers'
    }),
});
