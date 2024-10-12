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
exports.checkTaskPermissions = void 0;
const task_model_1 = __importDefault(require("../models/task-model"));
const utils_1 = require("../utils");
const enums_1 = require("../enums");
const checkTaskPermissions = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_model_1.default.findById(request.params.id);
        if (!task) {
            return (0, utils_1.errorResponse)(response, 404, enums_1.EMessages.TASK_NOT_FOUND);
        }
        if (task.userId.toString() !== request.user._id.toString()) {
            return (0, utils_1.errorResponse)(response, 403, enums_1.EMessages.YOU_DO_NOT_HAVE_PERMISSIONS_TO_DELETE_THIS_TASK);
        }
        request.task = task;
        next();
    }
    catch (error) {
        return (0, utils_1.errorResponse)(response, 500, error.message);
    }
});
exports.checkTaskPermissions = checkTaskPermissions;
//# sourceMappingURL=check-tasks-permissions.js.map