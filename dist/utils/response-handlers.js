"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.sendResponse = void 0;
const enums_1 = require("../enums");
const sendResponse = (response, status, model, message) => response.status(status).json({
    status: enums_1.EStatuses.SUCCESS,
    model,
    message,
});
exports.sendResponse = sendResponse;
const errorResponse = (response, status, message) => response.status(status).json({
    status: enums_1.EStatuses.FAILURE,
    message,
});
exports.errorResponse = errorResponse;
//# sourceMappingURL=response-handlers.js.map