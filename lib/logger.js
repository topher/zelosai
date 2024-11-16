"use strict";
// lib/logger.ts
Object.defineProperty(exports, "__esModule", { value: true });
var logger = {
    info: function (message) {
        console.log("INFO: ".concat(message));
    },
    error: function (message) {
        console.error("ERROR: ".concat(message));
    },
};
exports.default = logger;
