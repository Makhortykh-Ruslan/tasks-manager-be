"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.sendResponse = void 0;
const enums_1 = require("../enums");
const sendResponse = (response, status, model) => response.status(status).json({
    status: enums_1.EStatuses.SUCCESS,
    model,
});
exports.sendResponse = sendResponse;
const errorResponse = (response, status, error) => response.status(status).json({
    status: enums_1.EStatuses.FAILURE,
    message: error.message,
});
exports.errorResponse = errorResponse;
//# sourceMappingURL=response-handlers.js.map