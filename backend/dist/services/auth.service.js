"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const mssql_1 = __importDefault(require("mssql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const sql_config_1 = require("../config/sql.config");
dotenv_1.default.config();
class authService {
    async login(logins) {
        let pool = await mssql_1.default.connect(sql_config_1.sqlConfig);
        let user = (await pool.request()
            .input("email", logins.email)
            .input("password", logins.password).execute("loginUser")).recordset;
        if (user.length < 1) {
            return {
                error: "User not found"
            };
        }
        else {
            let hashedpassword = user[0].password;
            //compare password
            let passwordMatches = bcrypt_1.default.compareSync(logins.password, hashedpassword);
            if (passwordMatches) {
                let { createdAt, password, phone_number, ...rest } = user[0];
                let token = jsonwebtoken_1.default.sign(rest, process.env.SECRET_KEY, {
                    expiresIn: '2h'
                });
                return {
                    message: "Logged in Successfully",
                    token
                };
            }
            else {
                return {
                    error: "Incorrect password"
                };
            }
        }
    }
}
exports.authService = authService;
