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
const user_model_1 = __importDefault(require("../models/user-model"));
const utils_1 = require("../utils");
const enums_1 = require("../enums");
const createUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = Object.assign(Object.assign({}, request.body), { role: enums_1.ERoles.USER });
        const user = yield user_model_1.default.create(result);
        const token = (0, utils_1.generateJwtToken)(user._id);
        return (0, utils_1.sendResponse)(response, 201, { token });
    }
    catch (error) {
        return (0, utils_1.errorResponse)(response, 400, error.message);
    }
});
const deleteUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.default.findByIdAndDelete(request.params.id);
        return (0, utils_1.sendResponse)(response, 200, enums_1.EMessages.USER_WAS_DELETED);
    }
    catch (error) {
        return (0, utils_1.errorResponse)(response, 400, error);
    }
});
const getAllUsers = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user_model_1.default.find();
        return (0, utils_1.sendResponse)(response, 200, data);
    }
    catch (error) {
        return (0, utils_1.errorResponse)(response, 400, error);
    }
});
const getMe = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (0, utils_1.sendResponse)(response, 200, request.user);
    }
    catch (error) {
        return (0, utils_1.errorResponse)(response, 400, null);
    }
});
exports.default = { createUser, deleteUser, getAllUsers, getMe };
//# sourceMappingURL=user-controllers.js.map