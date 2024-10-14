"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_controllers_1 = __importDefault(require("../controllers/tasks-controllers"));
const middleware_1 = require("../middleware");
const tasksRouter = express_1.default.Router();
tasksRouter
    .route('/')
    .get(middleware_1.userAuthenticator, tasks_controllers_1.default.getTasksById)
    .post(middleware_1.userAuthenticator, tasks_controllers_1.default.createTask);
tasksRouter
    .route('/update')
    .post(middleware_1.userAuthenticator, tasks_controllers_1.default.updateNote);
tasksRouter
    .route('/:id')
    .delete(middleware_1.userAuthenticator, middleware_1.checkTaskPermissions, tasks_controllers_1.default.deleteTask);
exports.default = { tasksRouter };
//# sourceMappingURL=tasks-routers.js.map