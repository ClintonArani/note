"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const controller = new user_controller_1.userController();
const user_router = (0, express_1.Router)();
user_router.post('/create', controller.createUser);
user_router.get('/all-users', controller.fetchAll);
// user_router.get('/unsigned-users', controller.getUnAssignedUsers)
user_router.put('/switch-role', controller.switchRoles);
// user_router.put('/set-assigned', controller.assignUser);
user_router.get('/:user_id', controller.fetchSingleUser);
exports.default = user_router;
