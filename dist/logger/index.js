"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const logger = (0, pino_1.default)({
    level: 'debug',
    transport: {
        target: "pino-pretty",
        options: {
            levelFirst: true,
            translateTime: 'dd-mm-yyyy HH:mm:ss',
            colorize: true,
        },
    },
});
exports.default = logger;
