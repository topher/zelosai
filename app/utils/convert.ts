const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'data.tsx');
const outputDir = path.join(__dirname, 'json-output');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
    console.log(`Created output directory: ${outputDir}`);
}

// Read the TypeScript file
const data = fs.readFileSync(inputFilePath, 'utf8');

// Regular expression to match the export and capture the variable name and array content
const variableObjectRegex = /export\s+const\s+(\w+)\s*=\s*(\[[\s\S]*?\]);/g;
let match;

while ((match = variableObjectRegex.exec(data)) !== null) {
    const variableName = match[1]; // The variable name
    let objectContent = match[2];  // The array of objects

    console.log(`Found object: ${variableName}`);

    try {
        // Clean up the object content
        let cleanedContent = objectContent
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
            .replace(/\/\/.*$/gm, '') // Remove line comments
            .replace(/'/g, '"') // Convert single quotes to double quotes
            .replace(/,\s*([}\]])/g, '$1') // Remove trailing commas
            .replace(/\n/g, ' ') // Replace newlines with spaces
            .replace(/\t/g, ' ') // Replace tabs with spaces
            .replace(/\s+/g, ' ') // Collapse multiple spaces into one
            .trim();

        // Parse it to verify it's valid JSON
        const jsonObject = JSON.parse(cleanedContent);

        // Write the JSON object to a file named after the variable
        const outputFilePath = path.join(outputDir, `${variableName}.json`);
        fs.writeFileSync(outputFilePath, JSON.stringify(jsonObject, null, 2), 'utf8');

        console.log(`Object ${variableName} has been written to ${outputFilePath}`);
    } catch (error) {
        console.error(`Failed to convert object ${variableName}:`, error);
    }
}
