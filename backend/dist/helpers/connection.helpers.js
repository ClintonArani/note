"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = __importDefault(require("mssql"));
const sql_config_1 = require("../config/sql.config");
class Connection {
    static query(arg0) {
        throw new Error('Method not implemented.');
    }
    static execute(arg0, arg1) {
        throw new Error('Method not implemented');
    }
    executeQuery(query) {
        let pool = mssql_1.default.connect(sql_config_1.sqlConfig);
    }
}
exports.default = Connection;
