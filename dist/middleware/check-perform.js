"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermissions = void 0;
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const checkPermissions = (roles) => (request, response, next) => roles.includes(request.user.role)
    ? next()
    : (0, utils_1.errorResponse)(response, 403, enums_1.EMessages.YOU_DO_NOT_HAVE_PERMISSIONS_FOR_THIS_ACTION);
exports.checkPermissions = checkPermissions;
//# sourceMappingURL=check-perform.js.map