"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
class Logging {
}
exports.default = Logging;
_a = Logging;
Logging.log = (args) => _a.info(args);
Logging.info = (args) => {
    console.log(chalk_1.default.green(`[${new Date().toLocaleString()}][info]`), typeof args === 'string' ? chalk_1.default.bgGreenBright(args) : args);
};
Logging.warm = (args) => {
    console.log(chalk_1.default.yellow(`[${new Date().toLocaleString()}][info]`), typeof args === 'string' ? chalk_1.default.bgYellowBright(args) : args);
};
Logging.error = (args) => {
    console.log(chalk_1.default.red(`[${new Date().toLocaleString()}][info]`), typeof args === 'string' ? chalk_1.default.bgRedBright(args) : args);
};
;
