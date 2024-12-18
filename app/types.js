"use strict";
// types.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENTITY_TYPE = exports.ACTION = void 0;
;
;
;
;
// END CONTRACT 
var ACTION;
(function (ACTION) {
    ACTION["CREATE"] = "CREATE";
    ACTION["UPDATE"] = "UPDATE";
    ACTION["DELETE"] = "DELETE";
})(ACTION || (exports.ACTION = ACTION = {}));
var ENTITY_TYPE;
(function (ENTITY_TYPE) {
    ENTITY_TYPE["BOARD"] = "BOARD";
    ENTITY_TYPE["LIST"] = "LIST";
    ENTITY_TYPE["CARD"] = "CARD";
})(ENTITY_TYPE || (exports.ENTITY_TYPE = ENTITY_TYPE = {}));
