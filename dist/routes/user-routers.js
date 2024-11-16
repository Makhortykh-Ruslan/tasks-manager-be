"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = __importDefault(require("../controllers/user-controllers"));
const check_perform_1 = require("../middleware/check-perform");
const enums_1 = require("../enums");
const middleware_1 = require("../middleware");
const userRouter = express_1.default.Router();
userRouter.route('/all').get(user_controllers_1.default.getAllUsers);
userRouter
    .route('/:id')
    .delete(user_controllers_1.default.deleteUser, (0, check_perform_1.checkPermissions)([enums_1.ERoles.ADMIN]));
userRouter.route('/create').post(user_controllers_1.default.createUser);
userRouter.route('/me').get(middleware_1.userAuthenticator, user_controllers_1.default.getMe);
exports.default = { userRouter };
//# sourceMappingURL=user-routers.js.map