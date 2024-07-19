"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = __importDefault(require("../controllers/user-controllers"));
const userRouter = express_1.default.Router();
userRouter.route('/').get(user_controllers_1.default.getAllUsers);
userRouter.route('/:id').delete(user_controllers_1.default.deleteUser);
userRouter.route('/create').post(user_controllers_1.default.createUser);
userRouter.route('/login').post(user_controllers_1.default.login);
exports.default = { userRouter };
//# sourceMappingURL=user-routers.js.map