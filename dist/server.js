"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../src/app/app"));
const PORT = process.env.PORT || 3000;
const DB = ((_a = process.env.DATABASE) !== null && _a !== void 0 ? _a : '').replace('<PASSWORD>', (_b = process.env.DATABASE_PASSWORD) !== null && _b !== void 0 ? _b : '');
mongoose_1.default.connect(DB).then(() => console.log('MongoDB connected'));
app_1.default.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
//# sourceMappingURL=server.js.map