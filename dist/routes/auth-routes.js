"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = __importDefault(require("../controllers/auth-controllers"));
const authRouter = express_1.default.Router();
authRouter.post('/login', auth_controllers_1.default.login);
authRouter.post('/forgotPassword', auth_controllers_1.default.forgotPassword);
authRouter.patch('/resetPassword/:token', auth_controllers_1.default.resetPassword);
exports.default = { authRouter };
//# sourceMappingURL=auth-routes.js.map