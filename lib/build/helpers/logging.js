"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const config = config_1.Config.get();
/**
 *
 * @param err
 */
function errorLogging(err) {
    if (config.logging.error !== undefined) {
        config.logging.error(err);
    }
}
exports.errorLogging = errorLogging;
/**
 *
 * @param info
 */
function infoLogging(info) {
    if (config.logging.info !== undefined) {
        config.logging.info(info);
    }
}
exports.infoLogging = infoLogging;
exports.loggingFormat = {
    default: "\x1b[0m",
    bold: "\x1b[1m",
    italic: "\x1b[3m",
    boldItalic: "\x1b[1;3m",
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    cyan: "\x1b[35m",
    blackBold: "\x1b[30;1m",
    redBold: "\x1b[31;1m",
    greenBold: "\x1b[32;1m",
    yellowBold: "\x1b[33;1m",
    blueBold: "\x1b[34;1m",
    cyanBold: "\x1b[35;1m"
};
//# sourceMappingURL=logging.js.map