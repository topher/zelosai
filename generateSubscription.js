"use strict";
// generateSubscription.ts
Object.defineProperty(exports, "__esModule", { value: true });
var subscription_1 = require("./lib/subscription");
var newUserId = 'user_12345'; // Replace with the actual user ID
var subscriptionTier = 'FREE'; // Replace with desired tier if different
(0, subscription_1.logDefaultSubscription)(newUserId);
