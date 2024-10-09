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
const tasks_routers_1 = __importDefault(require("../routes/tasks-routers"));
const auth_routes_1 = __importDefault(require("../routes/auth-routes"));
const cors_1 = __importDefault(require("cors"));
const cors_options_1 = require("../utils/cors-options");
dotenv_1.default.config({ path: './config.env' });
const app = (0, express_1.default)();
if (process.env.NODDE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use((0, express_2.json)());
app.use((0, cors_1.default)(cors_options_1.corsOptions));
app.options('*', (0, cors_1.default)(cors_options_1.corsOptions));
app.use('/api/v1/user', user_routers_1.default.userRouter);
app.use('/api/v1/auth', auth_routes_1.default.authRouter);
app.use('/api/v1/tasks', tasks_routers_1.default.tasksRouter);
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'Fail',
        message: `Can't find  ${req.originalUrl} on this server!`,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map