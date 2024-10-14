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
const task_model_1 = __importDefault(require("../models/task-model"));
const enums_1 = require("../enums");
const createTask = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield task_model_1.default.create(Object.assign(Object.assign({}, request.body), { user: request.id }));
        return (0, utils_1.sendResponse)(response, 201, data, enums_1.EMessages.NOTE_ADDED);
    }
    catch (error) {
        return (0, utils_1.errorResponse)(response, 400, error.message);
    }
});
const getTasksById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield task_model_1.default.find({ userId: request.user._id });
        return (0, utils_1.sendResponse)(response, 201, data, '');
    }
    catch (error) {
        return (0, utils_1.errorResponse)(response, 400, error);
    }
});
const deleteTask = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield task_model_1.default.findByIdAndDelete(request.params.id);
    return (0, utils_1.sendResponse)(response, 200, null, enums_1.EMessages.NOTE_SUCCESSFULLY_DELETED);
});
const updateNote = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.default.findByIdAndUpdate(request.body._id, request.body).lean();
    return (0, utils_1.sendResponse)(response, 200, task, enums_1.EMessages.NOTE_SUCCESSFULLY_UPDATED);
});
exports.default = { createTask, getTasksById, deleteTask, updateNote };
//# sourceMappingURL=tasks-controllers.js.map