"use strict";
// lib/elasticsearchAxios.ts
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countIndex = exports.searchIndex = void 0;
var axios_1 = require("axios");
var ELASTICSEARCH_NODE = process.env.ELASTICSEARCH_NODE || 'http://localhost:9200';
var ELASTICSEARCH_USERNAME = process.env.ELASTICSEARCH_USERNAME || 'elastic';
var ELASTICSEARCH_PASSWORD = process.env.ELASTICSEARCH_PASSWORD || 'changeme';
var elasticsearchAxios = axios_1.default.create({
    baseURL: ELASTICSEARCH_NODE,
    auth: {
        username: ELASTICSEARCH_USERNAME,
        password: ELASTICSEARCH_PASSWORD,
    },
    headers: {
        'Content-Type': 'application/json',
    },
});
/**
 * Searches an Elasticsearch index based on provided parameters.
 * @param index - The Elasticsearch index to search.
 * @param params - Search parameters including ids, query, limit, and from.
 * @returns An array of search results.
 */
function searchIndex(index, params) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var ids, query, _b, limit, _c, from, esQuery, numericIds, body, response, hits, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    ids = params.ids, query = params.query, _b = params.limit, limit = _b === void 0 ? 10 : _b, _c = params.from, from = _c === void 0 ? 0 : _c;
                    esQuery = {
                        bool: {
                            must: [],
                        },
                    };
                    if (ids && ids.length > 0) {
                        numericIds = ids.map(function (id) { return parseInt(id, 10); }).filter(function (id) { return !isNaN(id); });
                        if (numericIds.length > 0) {
                            esQuery.bool.must.push({
                                terms: { id: numericIds },
                            });
                        }
                    }
                    if (query) {
                        esQuery.bool.must.push({
                            match_phrase_prefix: { name: query },
                        });
                    }
                    body = {
                        query: esQuery,
                        size: limit,
                        from: from,
                    };
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, elasticsearchAxios.post("/".concat(index, "/_search"), body)];
                case 2:
                    response = _d.sent();
                    hits = response.data.hits.hits.map(function (hit) { return (__assign(__assign({}, hit._source), { id: String(hit._source.id) })); });
                    console.log("Retrieved ".concat(hits.length, " resources from Elasticsearch index \"").concat(index, "\"."));
                    return [2 /*return*/, hits];
                case 3:
                    error_1 = _d.sent();
                    console.log("Error searching index \"".concat(index, "\": ").concat(((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) || error_1.message));
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.searchIndex = searchIndex;
/**
 * Counts the number of documents in an Elasticsearch index based on a query.
 * @param index - The Elasticsearch index to count documents in.
 * @param query - The Elasticsearch query to filter documents.
 * @returns The count of matching documents.
 */
function countIndex(index, query) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var body, response, count, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    body = {
                        query: query,
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, elasticsearchAxios.post("/".concat(index, "/_count"), body)];
                case 2:
                    response = _b.sent();
                    count = response.data.count;
                    console.log("Counted ".concat(count, " documents in Elasticsearch index \"").concat(index, "\"."));
                    return [2 /*return*/, count];
                case 3:
                    error_2 = _b.sent();
                    console.log("Error counting documents in index \"".concat(index, "\": ").concat(((_a = error_2.response) === null || _a === void 0 ? void 0 : _a.data) || error_2.message));
                    throw error_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.countIndex = countIndex;
exports.default = elasticsearchAxios;
