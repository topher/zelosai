"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var inputFilePath = path.join(__dirname, 'data.tsx');
var outputDir = path.join(__dirname, 'json-output');
// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}
// Read the TypeScript file
var data = fs.readFileSync(inputFilePath, 'utf8');
// Regular expression to match variable names and objects
var variableObjectRegex = /const\s+(\w+)\s*=\s*({[\s\S]*?});/g;
var match;
while ((match = variableObjectRegex.exec(data)) !== null) {
    var variableName = match[1]; // The variable name
    var objectContent = match[2]; // The object content
    try {
        // Replace single quotes with double quotes, taking care of escaping
        var jsonString = objectContent
            .replace(/'/g, '"') // Convert single quotes to double quotes
            .replace(/"(\w+)"\s*:/g, '"$1":') // Ensure keys are wrapped in double quotes
            .replace(/"([^"]*)"/g, function (match) {
            // Re-escape double quotes within strings
            return match.replace(/\\?"/g, '\\"').replace(/\\"/g, '"');
        });
        // Parse it to verify it's valid JSON
        var jsonObject = JSON.parse(jsonString);
        // Write the JSON object to a file named after the variable
        var outputFilePath = path.join(outputDir, "".concat(variableName, ".json"));
        fs.writeFileSync(outputFilePath, JSON.stringify(jsonObject, null, 2), 'utf8');
        console.log("Object ".concat(variableName, " has been written to ").concat(outputFilePath));
    }
    catch (error) {
        console.error("Failed to convert object ".concat(variableName, ":"), error);
    }
}
