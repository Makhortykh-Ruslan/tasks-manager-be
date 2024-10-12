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
exports.userAuthenticator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user-model"));
const utils_1 = require("../utils");
const enums_1 = require("../enums");
const userAuthenticator = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (request.headers.authorization &&
        request.headers.authorization.startsWith('Bearer')) {
        try {
            token = request.headers.authorization.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = yield user_model_1.default.findById(decoded.id).select('-password');
            if (!user) {
                return (0, utils_1.errorResponse)(response, 401, enums_1.EMessages.USER_NOT_FOUND);
            }
            request.user = user;
            next();
        }
        catch (error) {
            return (0, utils_1.errorResponse)(response, 401, enums_1.EMessages.NOT_AUTHORIZED_NO_TOKEN);
        }
    }
    else {
        (0, utils_1.errorResponse)(response, 401, enums_1.EMessages.NOT_AUTHORIZED_NO_TOKEN);
    }
});
exports.userAuthenticator = userAuthenticator;
//# sourceMappingURL=auth-middleware.js.map