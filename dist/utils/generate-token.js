"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJwtToken = (userId, secret, expiresIn) => { var _a, _b; if (secret === void 0) { secret = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : ''; } if (expiresIn === void 0) { expiresIn = (_b = process.env.JWT_EXPIRES_IN) !== null && _b !== void 0 ? _b : '1d'; } return jsonwebtoken_1.default.sign({ id: userId }, secret, { expiresIn }); };
exports.generateJwtToken = generateJwtToken;
//# sourceMappingURL=generate-token.js.map