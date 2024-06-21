"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sql_config_1 = require("../config/sql.config");
class userService {
    async fetchSingleUser(user_id) {
        let pool = await mssql_1.default.connect(sql_config_1.sqlConfig);
        let result = (await pool.request()
            .input("user_id", mssql_1.default.VarChar, user_id)
            .execute("fetchSingleUser")).recordset;
        if (result.length === 0) {
            return {
                error: "User not found"
            };
        }
        else {
            return {
                user: result[0]
            };
        }
    }
    async switchRoles(user_id) {
        let pool = await mssql_1.default.connect(sql_config_1.sqlConfig);
        let result = (await pool.request()
            .input("user_id", mssql_1.default.VarChar, user_id)
            .execute("switchRoles")).rowsAffected;
        if (result[0] === 1) {
            return {
                message: "Roles switched successfully"
            };
        }
        else {
            return {
                error: "Unable to switch role"
            };
        }
    }
    async registerUser(user) {
        let pool = await mssql_1.default.connect(sql_config_1.sqlConfig);
        let user_id = (0, uuid_1.v4)();
        let hashedPassword = bcrypt_1.default.hashSync(user.password, 6);
        let createdAt = new Date(); //set the current timestamp
        if (pool.connected) {
            //check if email exists
            let emailExists = (await pool.request().query(`SELECT * FROM users WHERE email = '${user.email}'`)).recordset;
            if (!lodash_1.default.isEmpty(emailExists)) {
                return {
                    error: "Email already in use"
                };
            }
            let phoneNoExists = (await pool.request().query(`SELECT * FROM users WHERE phone_number = '${user.phone_number}`)).recordset;
            if (!lodash_1.default.isEmpty(phoneNoExists)) {
                return {
                    error: "phone already in use"
                };
            }
            let result = (await pool.request()
                .input("id", mssql_1.default.VarChar, user_id)
                .input("FirstName", user.FirstName)
                .input("LastName", user.LastName)
                .input("phone_number", user.phone_number)
                .input("email", user.email)
                .input("password", hashedPassword)
                .input("profileImage", user.profileImage)
                .input("bio", user.bio)
                .input("location", user.location)
                .input("d_b_o", user.d_b_o)
                .input("role", user.role)
                .input("createdAt", mssql_1.default.DateTime, createdAt)
                .execute("registerUser")).rowsAffected;
            if (result[0] == 1) {
                return {
                    message: "Account created successfully"
                };
            }
        }
        else {
            return {
                error: "Unable to establish connection"
            };
        }
    }
    async fetchAllUsers() {
        let pool = await mssql_1.default.connect(sql_config_1.sqlConfig);
        let result = (await pool.request().execute("getAllUsers")).recordset;
        if (result.length == 0) {
            return {
                message: "No users at the moment"
            };
        }
        else {
            return {
                users: result
            };
        }
    }
    async fetchUnsignedUsers() {
        let pool = await mssql_1.default.connect(sql_config_1.sqlConfig);
        let result = (await pool.request().query(`select * from users where isAssignedProject = 0 `)).recordset;
        if (result.length < 1) {
            return {
                message: "All users present have been assigned projects"
            };
        }
        else {
            return {
                users: result
            };
        }
    }
}
exports.userService = userService;
