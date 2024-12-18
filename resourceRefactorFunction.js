"use strict";
// resourceRefactorFunction.ts
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_morph_1 = require("ts-morph");
var path = require("path");
var fs = require("fs");
// Paths
var configDir = path.join(__dirname, 'config');
var featuresDir = path.join(configDir, 'features');
var predicatesFile = path.join(configDir, 'predicates.ts'); // Adjust path if needed
var resourcesDir = path.join(configDir, 'resources');
var legacyResourcesDir = path.join(configDir, 'resources'); // Directory containing legacy resource files
var agentsFilePath = path.join(configDir, 'agents.json'); // The new agents.json file
// Ensure resources directory exists
if (!fs.existsSync(resourcesDir)) {
    fs.mkdirSync(resourcesDir, { recursive: true });
}
// Function to convert camelCase or PascalCase to snake_case
function toSnakeCase(str) {
    return str
        .replace(/\.?([A-Z]+)/g, function (x, y) { return "_" + y.toLowerCase(); })
        .replace(/^_/, "")
        .toLowerCase();
}
// Function to generate agentId
function generateAgentId(featureKey) {
    // Remove 'FeatureKey' or 'Feature' wherever it appears
    var sanitizedFeatureKey = featureKey.replace(/FeatureKey/gi, '').replace(/Feature/gi, '');
    // Remove spaces and non-alphanumeric characters
    var cleanedFeatureKey = sanitizedFeatureKey.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
    return "lead".concat(cleanedFeatureKey, "Agent");
}
// Function to create resource file content with defaultPredicates
function createResourceTemplate(resourceType, defaultPredicates, agentId) {
    return "import { ResourceType } from '../resourceTypes';\nimport { generateSchemaFromDefaultPredicates } from '../schemaUtils';\n\nexport const ".concat(resourceType, "Resource = {\n  resourceTypeId: ResourceType.").concat(resourceType, ",\n  defaultPredicates: ").concat(JSON.stringify(defaultPredicates, null, 2), ",\n  schema: generateSchemaFromDefaultPredicates(").concat(JSON.stringify(defaultPredicates, null, 2), "),\n  agentId: '").concat(agentId, "', // Assign an agentId to the resource\n};\n\nexport default ").concat(resourceType, "Resource;\n");
}
// Function to update feature file with agentId and defaultPredicates
function updateFeatureFile(featureObject, agentId, defaultPredicates) {
    // Find or create the 'metadata' property
    var metadataProp = featureObject.getProperty('metadata');
    var metadataInitializer;
    if (!metadataProp || !metadataProp.getInitializer()) {
        // If 'metadata' property doesn't exist, create it
        metadataProp = featureObject.addPropertyAssignment({
            name: 'metadata',
            initializer: '{}',
        });
        metadataInitializer = metadataProp.getInitializerIfKindOrThrow(ts_morph_1.SyntaxKind.ObjectLiteralExpression);
    }
    else {
        // Ensure it's an ObjectLiteralExpression
        metadataInitializer = metadataProp.getInitializerIfKindOrThrow(ts_morph_1.SyntaxKind.ObjectLiteralExpression);
    }
    // Add or update 'agentId'
    var agentIdProp = metadataInitializer.getProperty('agentId');
    if (!agentIdProp) {
        metadataInitializer.addPropertyAssignment({
            name: 'agentId',
            initializer: "'".concat(agentId, "'"),
        });
        console.log("Added 'agentId' to 'metadata'.");
    }
    else {
        agentIdProp.setInitializer("'".concat(agentId, "'"));
        console.log("Updated 'agentId' in 'metadata'.");
    }
    // Add or update 'defaultPredicates'
    var defaultPredicatesProp = metadataInitializer.getProperty('defaultPredicates');
    if (!defaultPredicatesProp) {
        metadataInitializer.addPropertyAssignment({
            name: 'defaultPredicates',
            initializer: JSON.stringify(defaultPredicates, null, 2),
        });
        console.log("Added 'defaultPredicates' to 'metadata'.");
    }
    else {
        defaultPredicatesProp.setInitializer(JSON.stringify(defaultPredicates, null, 2));
        console.log("Updated 'defaultPredicates' in 'metadata'.");
    }
    // Remove 'requiredPredicates' and 'fields' if they exist
    var requiredPredicatesProp = featureObject.getProperty('requiredPredicates');
    if (requiredPredicatesProp) {
        requiredPredicatesProp.remove();
        console.log("Removed 'requiredPredicates' from feature.");
    }
    var fieldsProp = featureObject.getProperty('fields');
    if (fieldsProp) {
        fieldsProp.remove();
        console.log("Removed 'fields' from feature.");
    }
}
// Main function
function refactorResources() {
    return __awaiter(this, void 0, void 0, function () {
        var project, featureFiles, agentsArray, _loop_1, _i, featureFiles_1, file, existingAgents, existingAgentsContent, mergedAgents;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    project = new ts_morph_1.Project({
                        tsConfigFilePath: path.join(__dirname, 'tsconfig.json'),
                        compilerOptions: {
                            allowJs: true,
                        },
                    });
                    featureFiles = fs.readdirSync(featuresDir).filter(function (file) { return file.endsWith('Feature.ts') || file.endsWith('Feature.tsx'); });
                    if (featureFiles.length === 0) {
                        console.warn('No feature files found in the features directory.');
                        return [2 /*return*/];
                    }
                    agentsArray = [];
                    _loop_1 = function (file) {
                        var featureFilePath, sourceFile, exportedFeature, featureInitializer, featureObject, keyProp, keyInitializer, featureKey, metadataProp, metadataInitializer, metadataObject, resourceTypeProp, resourceTypeInitializer, resourceType, agentId, legacyResourceFileName, legacyResourceFilePath, legacyResourceSourceFile, legacyExportedResource, legacyResourceInitializer, fieldsProp, fieldsArray, defaultPredicates, resourceContent, resourceFileName, resourceFilePath, agentObject;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    featureFilePath = path.join(featuresDir, file);
                                    sourceFile = project.addSourceFileAtPath(featureFilePath);
                                    exportedFeature = sourceFile.getVariableDeclarations().find(function (varDecl) {
                                        var variableStatement = varDecl.getFirstAncestorByKind(ts_morph_1.SyntaxKind.VariableStatement);
                                        var isExported = (variableStatement === null || variableStatement === void 0 ? void 0 : variableStatement.isExported()) || false;
                                        return isExported && varDecl.getName().endsWith('Feature');
                                    });
                                    if (!exportedFeature) {
                                        console.error("No exported feature variable found in ".concat(file));
                                        return [2 /*return*/, "continue"];
                                    }
                                    featureInitializer = exportedFeature.getInitializerIfKind(ts_morph_1.SyntaxKind.ObjectLiteralExpression);
                                    if (!featureInitializer) {
                                        console.error("Feature initializer is not an object literal in ".concat(file));
                                        return [2 /*return*/, "continue"];
                                    }
                                    featureObject = featureInitializer;
                                    keyProp = featureObject.getProperty('key');
                                    if (!keyProp) {
                                        console.error("\"key\" property not found in ".concat(file));
                                        return [2 /*return*/, "continue"];
                                    }
                                    keyInitializer = keyProp.getInitializer();
                                    featureKey = keyInitializer ? keyInitializer.getText().replace(/['"`]/g, '') : null;
                                    if (!featureKey) {
                                        console.error("\"key\" has no initializer in ".concat(file));
                                        return [2 /*return*/, "continue"];
                                    }
                                    metadataProp = featureObject.getProperty('metadata');
                                    if (!metadataProp) {
                                        console.error("\"metadata\" property not found in ".concat(file));
                                        return [2 /*return*/, "continue"];
                                    }
                                    metadataInitializer = metadataProp.getInitializerIfKind(ts_morph_1.SyntaxKind.ObjectLiteralExpression);
                                    if (!metadataInitializer) {
                                        console.error("\"metadata\" is not an object literal in ".concat(file));
                                        return [2 /*return*/, "continue"];
                                    }
                                    metadataObject = metadataInitializer;
                                    resourceTypeProp = metadataObject.getProperty('resourceType');
                                    if (!resourceTypeProp) {
                                        console.error("\"resourceType\" property not found in metadata of ".concat(file));
                                        return [2 /*return*/, "continue"];
                                    }
                                    resourceTypeInitializer = resourceTypeProp.getInitializer();
                                    resourceType = resourceTypeInitializer
                                        ? resourceTypeInitializer.getText().replace(/ResourceType\./, '').replace(/['"`]/g, '')
                                        : null;
                                    if (!resourceType) {
                                        console.error("\"resourceType\" has no initializer in metadata of ".concat(file));
                                        return [2 /*return*/, "continue"];
                                    }
                                    agentId = generateAgentId(featureKey);
                                    console.log("Generated agentId: ".concat(agentId, " for featureKey: ").concat(featureKey));
                                    legacyResourceFileName = "".concat(resourceType, ".tsx");
                                    legacyResourceFilePath = path.join(legacyResourcesDir, legacyResourceFileName);
                                    // Check if the legacy resource file exists
                                    if (!fs.existsSync(legacyResourceFilePath)) {
                                        console.warn("Legacy resource file ".concat(legacyResourceFilePath, " not found for resourceType ").concat(resourceType, ". Skipping."));
                                        return [2 /*return*/, "continue"];
                                    }
                                    legacyResourceSourceFile = project.addSourceFileAtPath(legacyResourceFilePath);
                                    legacyExportedResource = legacyResourceSourceFile.getVariableDeclarations().find(function (varDecl) {
                                        var variableStatement = varDecl.getFirstAncestorByKind(ts_morph_1.SyntaxKind.VariableStatement);
                                        var isExported = (variableStatement === null || variableStatement === void 0 ? void 0 : variableStatement.isExported()) || false;
                                        return isExported && varDecl.getName().endsWith('Resource');
                                    });
                                    if (!legacyExportedResource) {
                                        console.error("No exported resource variable found in ".concat(legacyResourceFileName));
                                        return [2 /*return*/, "continue"];
                                    }
                                    legacyResourceInitializer = legacyExportedResource.getInitializerIfKind(ts_morph_1.SyntaxKind.ObjectLiteralExpression);
                                    if (!legacyResourceInitializer) {
                                        console.error("Resource initializer is not an object literal in ".concat(legacyResourceFileName));
                                        return [2 /*return*/, "continue"];
                                    }
                                    fieldsProp = legacyResourceInitializer.getProperty('fields');
                                    if (!fieldsProp) {
                                        console.error("\"fields\" property not found in ".concat(legacyResourceFileName));
                                        return [2 /*return*/, "continue"];
                                    }
                                    fieldsArray = fieldsProp.getInitializerIfKind(ts_morph_1.SyntaxKind.ArrayLiteralExpression);
                                    if (!fieldsArray) {
                                        console.error("\"fields\" is not an array in ".concat(legacyResourceFileName));
                                        return [2 /*return*/, "continue"];
                                    }
                                    defaultPredicates = {};
                                    // Iterate over fields to extract field names and required status
                                    fieldsArray.getElements().forEach(function (element) {
                                        var _a;
                                        if (!element.isKind(ts_morph_1.SyntaxKind.ObjectLiteralExpression)) {
                                            return;
                                        }
                                        var fieldObject = element.asKindOrThrow(ts_morph_1.SyntaxKind.ObjectLiteralExpression);
                                        var nameProp = fieldObject.getProperty('name');
                                        var requiredProp = fieldObject.getProperty('required');
                                        if (!nameProp) {
                                            return;
                                        }
                                        var nameInitializer = nameProp.getInitializer();
                                        var fieldName = nameInitializer === null || nameInitializer === void 0 ? void 0 : nameInitializer.getText().replace(/['"`]/g, '');
                                        if (!fieldName) {
                                            return;
                                        }
                                        // Convert fieldName to snake_case
                                        var predicateName = toSnakeCase(fieldName);
                                        // Determine the status
                                        var requiredStatus = ((_a = requiredProp === null || requiredProp === void 0 ? void 0 : requiredProp.getInitializer()) === null || _a === void 0 ? void 0 : _a.getText()) === 'true' ? 'required' : 'allowed';
                                        // Add to defaultPredicates
                                        defaultPredicates[predicateName] = requiredStatus;
                                    });
                                    resourceContent = createResourceTemplate(resourceType, defaultPredicates, agentId);
                                    resourceFileName = "".concat(resourceType, "Resource.ts");
                                    resourceFilePath = path.join(resourcesDir, resourceFileName);
                                    // Write the new resource file
                                    fs.writeFileSync(resourceFilePath, resourceContent, 'utf8');
                                    console.log("Resource file ".concat(resourceFileName, " created successfully."));
                                    // Update feature file with agentId and defaultPredicates
                                    updateFeatureFile(featureObject, agentId, defaultPredicates);
                                    agentObject = {
                                        id: agentId,
                                        accountId: 'default_account',
                                        ownerId: 'system',
                                        resourceType: 'Agent',
                                        visibility: 'public',
                                        URI: '',
                                        agentType: 'AI',
                                        name: "Lead ".concat(featureKey, " Agent"),
                                        expertiseAreas: [featureKey],
                                        availabilityStatus: 'online',
                                        aiCapabilities: {
                                            supportedLanguages: ['en'],
                                            responseTime: 100,
                                            integrations: [],
                                        },
                                        tags: [],
                                    };
                                    agentsArray.push(agentObject);
                                    // Save the updated feature file
                                    return [4 /*yield*/, sourceFile.save()];
                                case 1:
                                    // Save the updated feature file
                                    _b.sent();
                                    console.log("Feature file ".concat(file, " updated successfully."));
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, featureFiles_1 = featureFiles;
                    _a.label = 1;
                case 1:
                    if (!(_i < featureFiles_1.length)) return [3 /*break*/, 4];
                    file = featureFiles_1[_i];
                    return [5 /*yield**/, _loop_1(file)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    existingAgents = [];
                    if (fs.existsSync(agentsFilePath)) {
                        try {
                            existingAgentsContent = fs.readFileSync(agentsFilePath, 'utf8');
                            existingAgents = JSON.parse(existingAgentsContent);
                            console.log("Existing agents loaded from ".concat(agentsFilePath));
                        }
                        catch (error) {
                            console.error("Error reading existing agents.json:", error);
                        }
                    }
                    mergedAgents = __spreadArray([], existingAgents, true);
                    agentsArray.forEach(function (newAgent) {
                        if (!existingAgents.find(function (agent) { return agent.id === newAgent.id; })) {
                            mergedAgents.push(newAgent);
                        }
                        else {
                            console.warn("Agent with id ".concat(newAgent.id, " already exists. Skipping."));
                        }
                    });
                    // Write merged agents to agents.json
                    fs.writeFileSync(agentsFilePath, JSON.stringify(mergedAgents, null, 2), 'utf8');
                    console.log("Agents file created/updated at ".concat(agentsFilePath));
                    return [2 /*return*/];
            }
        });
    });
}
// Execute the refactor function
refactorResources().catch(function (error) {
    console.error('An error occurred:', error);
});
