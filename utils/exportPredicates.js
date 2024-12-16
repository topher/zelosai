"use strict";
// scripts/exportPredicates.ts
Object.defineProperty(exports, "__esModule", { value: true });
var predicates_1 = require("../config/predicates");
var fs = require("fs");
var exportPredicates = function () {
    var predicateArray = Object.values(predicates_1.predicates).map(function (predicate) {
        return predicate; // No need to modify the predicate
    });
    console.log(predicateArray)
    fs.writeFileSync('predicate_types.json', JSON.stringify(predicateArray, null, 2));
};
exportPredicates();
