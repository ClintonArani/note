"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
const user_validator_1 = require("../validators/user.validator");
let service = new user_service_1.userService();
class userController {
    async createUser(req, res) {
        try {
            console.log("Request Body:", req.body); //for debugging
            let { FirstName, LastName, phone_number, email, password } = req.body;
            let { error } = user_validator_1.userSchema.validate(req.body);
            if (error) {
                return res.status(401).json({
                    error: error.message
                });
            }
            let result = await service.registerUser(req.body);
            return res.status(201).json(result);
        }
        catch (error) {
            return res.json({
                error
            });
        }
    }
    async fetchAll(req, res) {
        try {
            let result = await service.fetchAllUsers();
            return res.status(201).json(result);
        }
        catch (error) {
            return res.json({
                error
            });
        }
    }
    async fetchSingleUser(req, res) {
        try {
            let { user_id } = req.params;
            let response = await service.fetchSingleUser(user_id);
            return res.json(response);
        }
        catch (error) {
            return res.json({
                error
            });
        }
    }
    async switchRoles(req, res) {
        try {
            let { user_id } = req.body;
            let response = await service.switchRoles(user_id);
            return res.json(response);
        }
        catch (error) {
            return res.json({
                error
            });
        }
    }
    async getUnAssignedUsers(req, res) {
        try {
            let response = await service.fetchUnsignedUsers();
            return res.json(response);
        }
        catch (error) {
            return res.json({
                error
            });
        }
    }
    async assignUser(req, res) {
        try {
            let { project_id, user_id } = req.body;
            let change = {
                project_id,
                user_id
            };
            let response = await service.setUserToAssigned(change);
            return res.json(response);
        }
        catch (error) {
            return res.json({
                error
            });
        }
    }
}
exports.userController = userController;
