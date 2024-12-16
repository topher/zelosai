"use strict";
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
exports.isUserInOrganization = exports.handleUpgradeSuccess = exports.initiateUpgrade = exports.createPaymentSession = exports.performActionOnResource = exports.updateSubscription = exports.updateOrganizationSubscription = exports.isOrganizationOwner = exports.updateUserSubscription = exports.createOrganizationSubscription = exports.createFreeTierSubscriptionForUser = exports.updateSubscriptionFeaturesUsage = exports.updateSubscriptionCredits = exports.getSubscription = exports.getSubscriptionByOrganizationId = exports.getSubscriptionByUserId = exports.getSubscriptionById = exports.isValidSubscription = exports.logDefaultSubscription = exports.generateNewUserSubscription = exports.generateDefaultResourceCounts = exports.generateDefaultFeaturesUsage = void 0;
// lib/subscription.ts
var clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
var clerkClient = (0, clerk_sdk_node_1.Clerk)({ apiKey: process.env.CLERK_SECRET_KEY });
var featuresConfig_1 = require("@/config/featuresConfig");
var elasticsearchAxios_1 = require("./elasticsearchAxios");
var stripe_1 = require("@/lib/stripe");
var axios_1 = require("axios");
/**
 * Generates a default FeaturesUsage object with all ActionFeatureKeys initialized.
 * @returns FeaturesUsage object with default values.
 */
function generateDefaultFeaturesUsage() {
    var defaultUsage = {};
    var actionKeys = Object.values(featuresConfig_1.ActionFeatureKey);
    actionKeys.forEach(function (actionKey) {
        defaultUsage[actionKey] = {
            count: 0,
            creditsUsed: 0,
        };
    });
    return defaultUsage;
}
exports.generateDefaultFeaturesUsage = generateDefaultFeaturesUsage;
/**
 * Generates a default ResourceCounts object with all FeatureKeys initialized.
 * @returns ResourceCounts object with default values.
 */
function generateDefaultResourceCounts() {
    var defaultCounts = {};
    var featureKeys = Object.values(featuresConfig_1.FeatureKey);
    featureKeys.forEach(function (featureKey) {
        defaultCounts[featureKey] = 0;
    });
    return defaultCounts;
}
exports.generateDefaultResourceCounts = generateDefaultResourceCounts;
/**
 * Generates a new Subscription object with default FeaturesUsage and ResourceCounts.
 * @param userId - The ID of the user.
 * @param subscriptionTier - The subscription tier (default is 'FREE').
 * @returns A Subscription object with initialized values.
 */
function generateNewUserSubscription(userId, subscriptionTier) {
    if (subscriptionTier === void 0) { subscriptionTier = featuresConfig_1.SubscriptionTier.FREE; }
    var subscriptionId = "sub_".concat(subscriptionTier.toLowerCase(), "_").concat(userId);
    var currentTimestamp = new Date().toISOString();
    var newSubscription = {
        subscriptionId: subscriptionId,
        userId: userId,
        subscriptionTier: subscriptionTier,
        credits: subscriptionTier === featuresConfig_1.SubscriptionTier.FREE ? 100 : 500,
        creditsUsed: 0,
        monthlyCreditLimit: subscriptionTier === featuresConfig_1.SubscriptionTier.FREE ? 100 : 500,
        featuresUsage: generateDefaultFeaturesUsage(),
        resourceCounts: generateDefaultResourceCounts(),
        organizationId: '',
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
    };
    return newSubscription;
}
exports.generateNewUserSubscription = generateNewUserSubscription;
/**
 * Generates and logs a default subscription object for a given user.
 * Useful for copying and pasting into static JSON files.
 * @param userId - The ID of the user.
 * @param subscriptionTier - The subscription tier (default is 'FREE').
 */
function logDefaultSubscription(userId, subscriptionTier) {
    if (subscriptionTier === void 0) { subscriptionTier = featuresConfig_1.SubscriptionTier.FREE; }
    var subscription = generateNewUserSubscription(userId, subscriptionTier);
    console.log('Copy and paste the following JSON into your static subscription file:\n');
    console.log(JSON.stringify(subscription, null, 2));
}
exports.logDefaultSubscription = logDefaultSubscription;
// Subscription Functions
/**
 * Validates the subscription object against the Subscription interface.
 * Ensures that either userId or organizationId is present.
 * @param obj - The subscription object to validate.
 */
function isValidSubscription(obj) {
    if (!obj ||
        typeof obj.subscriptionId !== 'string' ||
        typeof obj.subscriptionTier !== 'string' ||
        typeof obj.credits !== 'number' ||
        typeof obj.creditsUsed !== 'number' ||
        typeof obj.monthlyCreditLimit !== 'number' ||
        typeof obj.featuresUsage !== 'object' ||
        typeof obj.resourceCounts !== 'object' ||
        typeof obj.createdAt !== 'string' ||
        typeof obj.updatedAt !== 'string') {
        return false;
    }
    var hasValidUserId = obj.userId === undefined ||
        obj.userId === null ||
        (typeof obj.userId === 'string' && obj.userId.trim() !== '');
    var hasValidOrgId = obj.organizationId === undefined ||
        obj.organizationId === null ||
        (typeof obj.organizationId === 'string' && obj.organizationId.trim() !== '');
    // Ensure that either userId or organizationId is present
    if (!hasValidUserId && !hasValidOrgId) {
        return false;
    }
    return true;
}
exports.isValidSubscription = isValidSubscription;
/**
 * Fetches a subscription by its subscriptionId field.
 * @param subscriptionId - The subscriptionId to search for.
 * @returns The Subscription object or null if not found.
 */
function getSubscriptionById(subscriptionId) {
    return __awaiter(this, void 0, void 0, function () {
        var endpoint, response, hits, subscription, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    endpoint = "/subscriptions/_search";
                    console.log("\uD83D\uDD0D Searching for subscription with subscriptionId: ".concat(subscriptionId));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, elasticsearchAxios_1.default.post(endpoint, {
                            query: { term: { subscriptionId: subscriptionId } },
                            size: 1,
                        })];
                case 2:
                    response = _a.sent();
                    hits = response.data.hits.hits;
                    // console.log("Elasticsearch response hits: ".concat(JSON.stringify(hits)));
                    if (hits.length > 0) {
                        subscription = hits[0]._source;
                        if (subscription) {
                            console.log("\u2705 Subscription with subscriptionId: ".concat(subscriptionId, " retrieved successfully."));
                            return [2 /*return*/, subscription];
                        }
                        else {
                            console.error("\u274C Invalid subscription data for subscriptionId: ".concat(subscriptionId));
                            return [2 /*return*/, null];
                        }
                    }
                    else {
                        console.warn("\u274C No subscription found with subscriptionId: ".concat(subscriptionId));
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("\u274C Error fetching subscription \"".concat(subscriptionId, "\":"), error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getSubscriptionById = getSubscriptionById;
/**
 * Fetches a subscription by the associated userId field.
 * @param userId - The userId to search for.
 * @returns The Subscription object or null if not found.
 */
function getSubscriptionByUserId(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var endpoint, response, hits, subscription, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    endpoint = "/subscriptions/_search";
                    console.log("\uD83D\uDD0D Searching for subscription with userId: ".concat(userId));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, elasticsearchAxios_1.default.post(endpoint, {
                            query: { term: { userId: userId } },
                            size: 1,
                        })];
                case 2:
                    response = _a.sent();
                    hits = response.data.hits.hits;
                    // console.log("Elasticsearch response hits: ".concat(JSON.stringify(hits)));
                    if (hits.length > 0) {
                        subscription = hits[0]._source;
                        if (isValidSubscription(subscription)) {
                            console.log("\u2705 Subscription for userId: ".concat(userId, " retrieved successfully."));
                            return [2 /*return*/, subscription];
                        }
                        else {
                            console.error("\u274C Invalid subscription data for userId: ".concat(userId));
                            return [2 /*return*/, null];
                        }
                    }
                    else {
                        console.warn("\u274C No subscription found for userId: ".concat(userId));
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("\u274C Error fetching subscription for userId \"".concat(userId, "\":"), error_2);
                    throw error_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getSubscriptionByUserId = getSubscriptionByUserId;
/**
 * Fetches a subscription by the associated organizationId.
 * @param organizationId - The organizationId to search for.
 * @returns The Subscription object or null if not found.
 */
function getSubscriptionByOrganizationId(organizationId) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var organization, subscriptionId, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("\uD83D\uDD0D Searching for subscription with organizationId: ".concat(organizationId));
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, clerkClient.organizations.getOrganization({ organizationId: organizationId })];
                case 2:
                    organization = _b.sent();
                    subscriptionId = (_a = organization.privateMetadata) === null || _a === void 0 ? void 0 : _a.subscriptionId;
                    if (!subscriptionId) {
                        console.warn("\u274C No subscriptionId found in organization \"".concat(organizationId, "\" privateMetadata."));
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, getSubscriptionById(subscriptionId)];
                case 3: 
                // Fetch the subscription using subscriptionId
                return [2 /*return*/, _b.sent()];
                case 4:
                    error_3 = _b.sent();
                    console.error("\u274C Error fetching subscription for organization \"".concat(organizationId, "\":"), error_3);
                    throw error_3;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getSubscriptionByOrganizationId = getSubscriptionByOrganizationId;
/**
 * Fetches the appropriate subscription based on orgId and userId.
 * - If orgId is provided, fetch the organization's subscription.
 * - Otherwise, fetch the user's personal subscription.
 * @param orgId - The ID of the organization (optional).
 * @param userId - The ID of the user.
 * @returns The Subscription object or null if not found.
 */
function getSubscription(orgId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!orgId) return [3 /*break*/, 2];
                    console.log("Fetching subscription for organization \"".concat(orgId, "\"."));
                    return [4 /*yield*/, getSubscriptionByOrganizationId(orgId)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    console.log("Fetching personal subscription for user \"".concat(userId, "\"."));
                    return [4 /*yield*/, getSubscriptionByUserId(userId)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_4 = _a.sent();
                    console.error("\u274C Error fetching subscription for orgId \"".concat(orgId, "\" and user \"").concat(userId, "\":"), error_4);
                    throw error_4;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getSubscription = getSubscription;
/**
 * Updates the subscription credits.
 * @param subscriptionId - The unique identifier for the subscription.
 * @param newCredits - The new credit balance.
 */
function updateSubscriptionCredits(subscriptionId, newCredits) {
    return __awaiter(this, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, elasticsearchAxios_1.default.post("/subscriptions/_update/".concat(subscriptionId), {
                            doc: { credits: newCredits },
                        })];
                case 1:
                    _a.sent();
                    console.log("\u2705 Subscription \"".concat(subscriptionId, "\" credits updated to ").concat(newCredits, "."));
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.error("\u274C Error updating credits for subscription \"".concat(subscriptionId, "\":"), error_5);
                    throw error_5;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateSubscriptionCredits = updateSubscriptionCredits;
/**
 * Increments the usage count for a specific feature within a subscription.
 * @param subscriptionId - The unique identifier for the subscription.
 * @param featureKey - The combined feature-action key.
 * @param increment - The number to increment the usage by (default is 1).
 */
function updateSubscriptionFeaturesUsage(subscriptionId, featureKey, increment) {
    if (increment === void 0) { increment = 1; }
    return __awaiter(this, void 0, void 0, function () {
        var endpoint, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    endpoint = "/subscriptions/_update/".concat(subscriptionId);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, elasticsearchAxios_1.default.post(endpoint, {
                            script: {
                                source: "\n          if (ctx._source.featuresUsage.containsKey(params.featureKey)) {\n            ctx._source.featuresUsage[params.featureKey] += params.increment;\n          } else {\n            ctx._source.featuresUsage[params.featureKey] = params.increment;\n          }\n        ",
                                params: { featureKey: featureKey, increment: increment },
                            },
                        })];
                case 2:
                    _a.sent();
                    console.log("\u2705 Subscription \"".concat(subscriptionId, "\" feature \"").concat(featureKey, "\" usage incremented by ").concat(increment, "."));
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    if (error_6.response) {
                        console.error("\u274C Server Error updating feature usage for subscription \"".concat(subscriptionId, "\": ").concat(JSON.stringify(error_6.response.data)));
                    }
                    else if (error_6.request) {
                        console.error("\u274C Network Error updating feature usage for subscription \"".concat(subscriptionId, "\": No response received."));
                    }
                    else {
                        console.error("\u274C Error updating feature usage for subscription \"".concat(subscriptionId, "\": ").concat(error_6.message));
                    }
                    throw error_6;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateSubscriptionFeaturesUsage = updateSubscriptionFeaturesUsage;
/**
 * Creates and assigns a free-tier subscription to a new user.
 * Stores only the subscriptionId in Clerk's privateMetadata and creates a subscription record in Elasticsearch.
 * @param userId - The ID of the new user.
 */
function createFreeTierSubscriptionForUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var subscriptionId, maxRetries, delay, user, attempt, error_7, freeSubscription, error_8, esResponse, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("createFreeTierSubscriptionForUser called with userId: ".concat(userId));
                    subscriptionId = "sub_free_".concat(userId);
                    console.log("Generated subscriptionId: ".concat(subscriptionId));
                    maxRetries = 5;
                    delay = 1000;
                    attempt = 1;
                    _a.label = 1;
                case 1:
                    if (!(attempt <= maxRetries)) return [3 /*break*/, 9];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 8]);
                    return [4 /*yield*/, clerkClient.users.getUser(userId)];
                case 3:
                    user = (_a.sent());
                    console.log("User fetched successfully:", user);
                    return [3 /*break*/, 9]; // Exit loop on success
                case 4:
                    error_7 = _a.sent();
                    if (!(error_7.status === 404)) return [3 /*break*/, 6];
                    console.warn("Attempt ".concat(attempt, ": User with id \"").concat(userId, "\" not found. Retrying in ").concat(delay, "ms..."));
                    if (attempt === maxRetries) {
                        console.error("User with id \"".concat(userId, "\" not found after ").concat(maxRetries, " attempts."));
                        throw new Error("User with id \"".concat(userId, "\" not found."));
                    }
                    return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, delay); })];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    console.error("Error fetching user \"".concat(userId, "\":"), error_7);
                    throw error_7; // Re-throw non-404 errors
                case 7: return [3 /*break*/, 8];
                case 8:
                    attempt++;
                    return [3 /*break*/, 1];
                case 9:
                    freeSubscription = {
                        subscriptionId: subscriptionId,
                        subscriptionTier: featuresConfig_1.SubscriptionTier.FREE,
                        credits: 100,
                        creditsUsed: 0,
                        monthlyCreditLimit: 100,
                        featuresUsage: {},
                        resourceCounts: {},
                        organizationId: '',
                        userId: userId,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    };
                    console.log('Free-tier subscription object:', freeSubscription);
                    _a.label = 10;
                case 10:
                    _a.trys.push([10, 12, , 13]);
                    // Store only the subscriptionId in Clerk's privateMetadata
                    return [4 /*yield*/, clerkClient.users.updateUserMetadata(userId, {
                            privateMetadata: { subscriptionId: subscriptionId },
                        })];
                case 11:
                    // Store only the subscriptionId in Clerk's privateMetadata
                    _a.sent();
                    console.log("Stored subscriptionId \"".concat(subscriptionId, "\" in Clerk for user \"").concat(userId, "\"."));
                    return [3 /*break*/, 13];
                case 12:
                    error_8 = _a.sent();
                    console.error("Error updating user metadata in Clerk for user \"".concat(userId, "\":"), error_8);
                    throw error_8;
                case 13:
                    _a.trys.push([13, 15, , 16]);
                    return [4 /*yield*/, elasticsearchAxios_1.default.post('/subscriptions/_doc', freeSubscription)];
                case 14:
                    esResponse = _a.sent();
                    console.log("Created subscription record in Elasticsearch for subscriptionId \"".concat(subscriptionId, "\"."), esResponse.data);
                    return [3 /*break*/, 16];
                case 15:
                    error_9 = _a.sent();
                    console.error("Error creating subscription in Elasticsearch for subscriptionId \"".concat(subscriptionId, "\":"), error_9);
                    throw error_9;
                case 16: return [2 /*return*/];
            }
        });
    });
}
exports.createFreeTierSubscriptionForUser = createFreeTierSubscriptionForUser;
/**
 * Creates and assigns a Pro/Enterprise subscription to a new organization.
 * Stores only the subscriptionId in Clerk's organization privateMetadata and creates a subscription record in Elasticsearch.
 * @param orgId - The ID of the organization.
 * @param subscriptionTier - The subscription tier ('PRO' or 'ENTERPRISE').
 */
function createOrganizationSubscription(orgId, subscriptionTier) {
    return __awaiter(this, void 0, void 0, function () {
        var credits, subscription, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    credits = subscriptionTier === featuresConfig_1.SubscriptionTier.PRO ? 500 : 1000;
                    subscription = {
                        subscriptionId: "sub_".concat(subscriptionTier.toLowerCase(), "_").concat(orgId),
                        subscriptionTier: subscriptionTier,
                        credits: credits,
                        creditsUsed: 0,
                        monthlyCreditLimit: credits,
                        featuresUsage: {},
                        resourceCounts: {},
                        organizationId: orgId,
                        userId: '',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    // Store only the subscriptionId in Clerk's organization privateMetadata
                    return [4 /*yield*/, clerkClient.organizations.updateOrganizationMetadata(orgId, {
                            privateMetadata: { subscriptionId: subscription.subscriptionId },
                        })];
                case 2:
                    // Store only the subscriptionId in Clerk's organization privateMetadata
                    _a.sent();
                    console.log("Stored subscriptionId \"".concat(subscription.subscriptionId, "\" in Clerk for organization \"").concat(orgId, "\"."));
                    // Create a new record in the Elasticsearch subscriptions index
                    return [4 /*yield*/, elasticsearchAxios_1.default.post('/subscriptions/_doc', subscription)];
                case 3:
                    // Create a new record in the Elasticsearch subscriptions index
                    _a.sent();
                    console.log("Created subscription record in Elasticsearch for subscriptionId \"".concat(subscription.subscriptionId, "\"."));
                    return [3 /*break*/, 5];
                case 4:
                    error_10 = _a.sent();
                    if (error_10.response) {
                        console.error("\u274C Server Error creating ".concat(subscriptionTier, " subscription for organization \"").concat(orgId, "\":"), error_10.response.data);
                    }
                    else if (error_10.request) {
                        console.error("\u274C Network Error creating ".concat(subscriptionTier, " subscription for organization \"").concat(orgId, "\": No response received."));
                    }
                    else {
                        console.error("\u274C Error creating ".concat(subscriptionTier, " subscription for organization \"").concat(orgId, "\":"), error_10.message);
                    }
                    throw error_10;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createOrganizationSubscription = createOrganizationSubscription;
/**
 * Updates the user's personal subscription tier.
 * @param userId - The ID of the user.
 * @param tier - The new subscription tier.
 */
function updateUserSubscription(userId, tier) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var user, subscriptionId, updatedSubscription, error_11;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, clerkClient.users.getUser(userId)];
                case 1:
                    user = _b.sent();
                    subscriptionId = (_a = user.privateMetadata) === null || _a === void 0 ? void 0 : _a.subscriptionId;
                    if (!subscriptionId) {
                        throw new Error('Subscription ID not found in user metadata.');
                    }
                    return [4 /*yield*/, updateSubscriptionTierInElasticsearch(subscriptionId, tier)];
                case 2:
                    updatedSubscription = _b.sent();
                    if (!updatedSubscription) {
                        throw new Error('Failed to update subscription in Elasticsearch.');
                    }
                    console.log("\u2705 Subscription \"".concat(subscriptionId, "\" upgraded to ").concat(tier, " for user \"").concat(userId, "\"."));
                    return [3 /*break*/, 4];
                case 3:
                    error_11 = _b.sent();
                    console.error("\u274C Error upgrading subscription for user \"".concat(userId, "\":"), error_11);
                    throw error_11;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateUserSubscription = updateUserSubscription;
/**
 * Updates the subscription tier in Elasticsearch.
 * @param subscriptionId - The ID of the subscription.
 * @param tier - The new subscription tier.
 * @returns The updated Subscription object or null if failed.
 */
function updateSubscriptionTierInElasticsearch(subscriptionId, tier) {
    return __awaiter(this, void 0, void 0, function () {
        var response, updatedSubscription, error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, elasticsearchAxios_1.default.post("/subscriptions/_update/".concat(subscriptionId), {
                            doc: {
                                subscriptionTier: tier,
                                credits: tier === featuresConfig_1.SubscriptionTier.PRO ? 500 : 1000,
                                monthlyCreditLimit: tier === featuresConfig_1.SubscriptionTier.PRO ? 500 : 1000,
                                updatedAt: new Date().toISOString(),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    if (!(response.status === 200)) return [3 /*break*/, 3];
                    return [4 /*yield*/, getSubscriptionById(subscriptionId)];
                case 2:
                    updatedSubscription = _a.sent();
                    return [2 /*return*/, updatedSubscription];
                case 3:
                    console.error("\u274C Failed to update subscription \"".concat(subscriptionId, "\":"), response.data);
                    return [2 /*return*/, null];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_12 = _a.sent();
                    console.error("\u274C Error updating subscription \"".concat(subscriptionId, "\":"), error_12);
                    return [2 /*return*/, null];
                case 6: return [2 /*return*/];
            }
        });
    });
}
/**
 * Checks if a user is an organization owner.
 * @param userId - The ID of the user.
 * @param organizationId - The ID of the organization.
 * @returns Boolean indicating if the user is an owner.
 */
function isOrganizationOwner(userId, organizationId) {
    return __awaiter(this, void 0, void 0, function () {
        var organization, error_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, clerkClient.organizations.getOrganization({ organizationId: organizationId })];
                case 1:
                    organization = _a.sent();
                    return [2 /*return*/, organization.ownerUserId === userId];
                case 2:
                    error_13 = _a.sent();
                    console.error("\u274C Error checking organization ownership for organization \"".concat(organizationId, "\":"), error_13);
                    return [2 /*return*/, false]; // Assume not owner if there's an error
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.isOrganizationOwner = isOrganizationOwner;
/**
 * Updates an existing organization's subscription tier.
 * @param subscriptionId - The ID of the subscription to update.
 * @param newTier - The new subscription tier.
 * @returns The updated Subscription object or null if the update failed.
 */
function updateOrganizationSubscription(subscriptionId, newTier) {
    return __awaiter(this, void 0, void 0, function () {
        var currentSubscription, updatedSubscription, response, error_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getSubscriptionById(subscriptionId)];
                case 1:
                    currentSubscription = _a.sent();
                    if (!currentSubscription) {
                        console.error("Subscription with ID \"".concat(subscriptionId, "\" not found."));
                        return [2 /*return*/, null];
                    }
                    updatedSubscription = __assign(__assign({}, currentSubscription), { subscriptionTier: newTier, credits: newTier === featuresConfig_1.SubscriptionTier.PRO ? 500 : 1000, monthlyCreditLimit: newTier === featuresConfig_1.SubscriptionTier.PRO ? 500 : 1000, updatedAt: new Date().toISOString() });
                    return [4 /*yield*/, elasticsearchAxios_1.default.post("/subscriptions/_update/".concat(subscriptionId), {
                            doc: {
                                subscriptionTier: updatedSubscription.subscriptionTier,
                                credits: updatedSubscription.credits,
                                monthlyCreditLimit: updatedSubscription.monthlyCreditLimit,
                                updatedAt: updatedSubscription.updatedAt,
                            },
                        })];
                case 2:
                    response = _a.sent();
                    if (response.status === 200) {
                        console.log("Subscription \"".concat(subscriptionId, "\" updated to tier \"").concat(newTier, "\"."));
                        return [2 /*return*/, updatedSubscription];
                    }
                    else {
                        console.error("Failed to update subscription \"".concat(subscriptionId, "\":"), response.data);
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_14 = _a.sent();
                    console.error("Error updating subscription \"".concat(subscriptionId, "\":"), error_14);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateOrganizationSubscription = updateOrganizationSubscription;
/**
 * Updates the subscription's credits and feature usage after performing an action.
 * @param subscriptionId - The ID of the subscription to update.
 * @param featureKey - The feature key related to the action.
 * @param action - The action performed.
 * @returns The updated subscription object or null if failed.
 */
function updateSubscription(subscriptionId, updates) {
    return __awaiter(this, void 0, void 0, function () {
        var error_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, elasticsearchAxios_1.default.post("/subscriptions/_update/".concat(subscriptionId), {
                            doc: updates,
                        })];
                case 1:
                    _a.sent();
                    console.log("\u2705 Subscription \"".concat(subscriptionId, "\" updated successfully."));
                    return [2 /*return*/, true];
                case 2:
                    error_15 = _a.sent();
                    console.error("\u274C Error updating subscription \"".concat(subscriptionId, "\":"), error_15);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateSubscription = updateSubscription;
/**
 * Performs the specified action on a resource.
 * @param featureKey - The feature key (e.g., 'Goals').
 * @param action - The action to perform (e.g., 'create').
 * @param subscription - The user's subscription object.
 * @returns An object indicating success and a message.
 */
function performActionOnResource(featureKey, action, subscription) {
    return __awaiter(this, void 0, void 0, function () {
        var newDocument, response, error_16;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (!(action === 'create')) return [3 /*break*/, 2];
                    newDocument = {
                        subscriptionId: subscription.subscriptionId,
                        // Add other necessary fields based on feature
                        name: 'New Resource',
                        createdAt: new Date().toISOString(),
                        // ... other fields
                    };
                    return [4 /*yield*/, axios_1.default.post("".concat(process.env.ELASTICSEARCH_NODE, "/").concat(featureKey, "/_doc"), newDocument, {
                            auth: {
                                username: process.env.ELASTICSEARCH_USERNAME,
                                password: process.env.ELASTICSEARCH_PASSWORD,
                            },
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })];
                case 1:
                    response = _a.sent();
                    if (response.status === 201) {
                        console.log("Successfully created a new document in \"".concat(featureKey, "\" index."));
                        return [2 /*return*/, { success: true, message: 'Resource created successfully.' }];
                    }
                    else {
                        console.log("Failed to create a new document in \"".concat(featureKey, "\" index."));
                        return [2 /*return*/, { success: false, message: 'Failed to create resource.' }];
                    }
                    _a.label = 2;
                case 2: 
                // Implement other actions ('read', 'edit', 'delete') similarly.
                // Placeholder for other actions
                return [2 /*return*/, { success: true, message: 'Action performed successfully.' }];
                case 3:
                    error_16 = _a.sent();
                    console.log("Error performing action \"".concat(action, "\" on feature \"").concat(featureKey, "\":"), error_16);
                    return [2 /*return*/, { success: false, message: 'Failed to perform action due to an error.' }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.performActionOnResource = performActionOnResource;
/**
 * Creates a Stripe Checkout session for subscription upgrades.
 * @param userId - The ID of the user.
 * @param tier - The desired subscription tier.
 * @returns A PaymentSession object containing the checkout URL.
 */
function createPaymentSession(userId, tier) {
    return __awaiter(this, void 0, void 0, function () {
        var priceIdMap, session, error_17;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    priceIdMap = {
                        FREE: '',
                        PRO: process.env.STRIPE_PRO_PRICE_ID || '',
                        ENTERPRISE: process.env.STRIPE_ENTERPRISE_PRICE_ID || '',
                    };
                    if (!priceIdMap[tier]) {
                        throw new Error("Price ID for tier \"".concat(tier, "\" is not defined."));
                    }
                    return [4 /*yield*/, stripe_1.default.checkout.sessions.create({
                            payment_method_types: ['card'],
                            mode: 'subscription',
                            line_items: [
                                {
                                    price: priceIdMap[tier],
                                    quantity: 1,
                                },
                            ],
                            metadata: {
                                userId: userId,
                                tier: tier,
                            },
                            success_url: "".concat(process.env.NEXT_PUBLIC_BASE_URL, "/payment-success?session_id={CHECKOUT_SESSION_ID}"),
                            cancel_url: "".concat(process.env.NEXT_PUBLIC_BASE_URL, "/payment-cancel"),
                        })];
                case 1:
                    session = _a.sent();
                    console.log("\u2705 Created Stripe Checkout session for userId: ".concat(userId, ", tier: ").concat(tier));
                    return [2 /*return*/, { url: session.url }];
                case 2:
                    error_17 = _a.sent();
                    console.error('❌ Error creating payment session:', error_17);
                    throw new Error('Failed to create payment session.');
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createPaymentSession = createPaymentSession;
/**
 * Initiates the subscription upgrade process for a user.
 * @param userId - The ID of the user.
 * @param tier - The desired subscription tier.
 * @returns A URL to redirect the user to the payment page.
 */
function initiateUpgrade(user, tier) {
    return __awaiter(this, void 0, void 0, function () {
        var orgId, subscription, paymentSession;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orgId = user.organizationMemberships && user.organizationMemberships.length > 0
                        ? user.organizationMemberships[0].organization.id
                        : null;
                    return [4 /*yield*/, getSubscription(orgId, user.id)];
                case 1:
                    subscription = _a.sent();
                    if (!subscription) {
                        throw new Error('Subscription not found.');
                    }
                    return [4 /*yield*/, createPaymentSession(user.id, tier)];
                case 2:
                    paymentSession = _a.sent();
                    // Optionally, update subscription status to 'pending' or similar
                    return [2 /*return*/, paymentSession.url]; // Redirect the user to this URL for payment
            }
        });
    });
}
exports.initiateUpgrade = initiateUpgrade;
/**
 * Handles the webhook from the payment processor upon successful payment.
 * Updates the user's subscription tier in Elasticsearch.
 * @param userId - The ID of the user.
 * @param tier - The new subscription tier.
 */
function handleUpgradeSuccess(userId, tier) {
    return __awaiter(this, void 0, void 0, function () {
        var user, orgId, subscription, error_18;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, clerkClient.users.getUser(userId)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        throw new Error("User with ID ".concat(userId, " not found."));
                    }
                    orgId = user.organizationMemberships && user.organizationMemberships.length > 0
                        ? user.organizationMemberships[0].organization.id
                        : null;
                    return [4 /*yield*/, getSubscription(orgId, user.id)];
                case 2:
                    subscription = _a.sent();
                    if (!subscription) {
                        throw new Error('Subscription not found.');
                    }
                    if (!subscription.organizationId) return [3 /*break*/, 4];
                    // Update organization subscription
                    return [4 /*yield*/, updateOrganizationSubscription(subscription.subscriptionId, tier)];
                case 3:
                    // Update organization subscription
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: 
                // Update user subscription
                return [4 /*yield*/, updateUserSubscription(user.id, tier)];
                case 5:
                    // Update user subscription
                    _a.sent();
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_18 = _a.sent();
                    console.error("\u274C Error updating subscription for user \"".concat(userId, "\":"), error_18);
                    throw error_18;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.handleUpgradeSuccess = handleUpgradeSuccess;
/**
 * Checks if a user is an organization member.
 * @param userId - The ID of the user.
 * @returns Boolean indicating if the user is part of any organization.
 */
function isUserInOrganization(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var user, organizationMemberships, error_19;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, clerkClient.users.getUser(userId)];
                case 1:
                    user = _a.sent();
                    organizationMemberships = user.organizationMemberships;
                    return [2 /*return*/, organizationMemberships && organizationMemberships.length > 0];
                case 2:
                    error_19 = _a.sent();
                    console.error("\u274C Error checking organization membership for user \"".concat(userId, "\":"), error_19);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.isUserInOrganization = isUserInOrganization;
