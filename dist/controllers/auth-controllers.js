"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const enums_1 = require("../enums");
const user_model_1 = __importDefault(require("../models/user-model"));
const email_1 = __importDefault(require("../utils/email"));
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return (0, utils_1.errorResponse)(response, 400, !email ? enums_1.EMessages.EMAIL_IS_REQUIRED : enums_1.EMessages.PASSWORD_IS_REQUIRED);
        }
        const user = yield user_model_1.default.findOne({ email }).select('+password');
        if (!user) {
            return (0, utils_1.errorResponse)(response, 401, enums_1.EMessages.INVALID_CREDENTIALS);
        }
        const isPasswordMatch = yield user.correctPassword(password, user.password);
        if (!isPasswordMatch) {
            return (0, utils_1.errorResponse)(response, 401, enums_1.EMessages.PASSWORD_IS_NOT_MATCH);
        }
        const token = (0, utils_1.generateJwtToken)(user._id);
        const model = {
            userName: user.userName,
            email: user.email,
            token,
        };
        return (0, utils_1.sendResponse)(response, 200, model);
    }
    catch (error) {
        return (0, utils_1.errorResponse)(response, 400, error);
    }
});
const forgotPassword = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: request.body.email });
    if (!user) {
        return (0, utils_1.errorResponse)(response, 404, enums_1.EMessages.USER_NOT_FOUND);
    }
    try {
        const resetToken = user.createPasswordResetToken();
        yield user.save({ validateBeforeSave: false });
        const resetUrl = `${request.protocol}://${request.get('host')}/api/v1/auth/resetPassword/${resetToken}`;
        const message = `Hi, if you forgot your password/ you can reset, just click this link ${resetUrl}`;
        yield (0, email_1.default)({
            email: user.email,
            subject: 'Your password reset token',
            message,
        });
        return (0, utils_1.sendResponse)(response, 200, {
            message: 'Token was send in your email !!!',
        });
    }
    catch (error) {
        return (0, utils_1.errorResponse)(response, 400, error);
    }
});
const resetPassword = (request, response) => { };
exports.default = { login, forgotPassword, resetPassword };
//# sourceMappingURL=auth-controllers.js.map