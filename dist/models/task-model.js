"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date },
    status: { type: String, default: 'active' },
    userId: { type: String, required: true },
    dragPosition: { type: Object, required: true },
});
const TaskModel = (0, mongoose_1.model)('Task', TaskSchema);
exports.default = TaskModel;
//# sourceMappingURL=task-model.js.map