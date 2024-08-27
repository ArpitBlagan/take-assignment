"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const route_1 = require("./route");
dotenv_1.default.config();
const app = (0, express_1.default)();
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://take-assignment.vercel.app"],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/api", route_1.router);
app.listen(process.env.PORT || 9000, () => {
    console.log(`listening on port ${process.env.PORT}`);
});
