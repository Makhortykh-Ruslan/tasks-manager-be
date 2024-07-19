"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routers_1 = __importDefault(require("../routes/user-routers"));
dotenv_1.default.config({ path: './config.env' });
const app = (0, express_1.default)();
if (process.env.NODDE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use((0, express_2.json)());
app.use('/api/v1/user', user_routers_1.default.userRouter);
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'Fail',
        message: `Can't find  ${req.originalUrl} on this server!`,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map