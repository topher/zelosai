import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const featuresDir = path.join(__dirname, 'config', 'features');
const examplePaths = [
  path.join(__dirname, 'config', 'features', 'goals_ex.ts'),
  path.join(__dirname, 'config', 'features', 'statistics_ex.ts'),
  path.join(__dirname, 'config', 'features', 'alerts_ex.ts'),
];
const typesReferencePath = path.join(__dirname, 'config', 'features', 'types_for_reference.txt');

if (!fs.existsSync(featuresDir)) {
  fs.mkdirSync(featuresDir, { recursive: true });
}

const examples = examplePaths.map((filePath) => fs.readFileSync(filePath, 'utf-8')).join('\n\n');
const typesReference = fs.readFileSync(typesReferencePath, 'utf-8');

import { features } from './config/featuresConfig.js';

async function generateFeatureConfig(featureKey: string, featureDefinition: any) {
  const resourceName = featureDefinition.metadata?.resourceName || featureKey;
  const featureFilePath = path.join(featuresDir, `${resourceName}.ts`);

  // Skip if the file already exists
  if (fs.existsSync(featureFilePath)) {
    console.log(`Feature configuration for "${resourceName}" already exists. Skipping...`);
    return;
  }

  const prompt = `
Here is the feature definition for "${featureKey}" (also note it may be named generically, e.g., "feature28: of XYZ"):

${JSON.stringify(featureDefinition, null, 2)}

Please follow the examples below, ensuring these requirements:
- Include an icon specification (\`icon\` must be present in metadata).
- Use the field name \`${resourceName}\` for file naming.
- Aim for extensive, clear, and detailed configuration output, similar to the provided examples.

Examples for reference:

${examples}

Additional type references:

${typesReference}

Please create a TypeScript configuration file for the "${featureKey}" feature using the provided format and details. The configuration should include:
  - A Yup schema for validation.
  - Field configurations.
  - Actions, metadata, and icon specification.

Generate as comprehensive a file as possible based on the above information.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500,
      temperature: 0,
    });

    const generatedCode = response.choices[0]?.message?.content?.trim();

    if (generatedCode) {
      fs.writeFileSync(featureFilePath, generatedCode);
      console.log(`Feature configuration for "${featureKey}" has been generated as ${resourceName}.ts.`);
    } else {
      console.error(`No code generated for feature "${featureKey}".`);
    }
  } catch (error) {
    console.error(`Error generating feature config for "${featureKey}":`, error);
    if (error.code === 'insufficient_quota') {
      console.error("Insufficient quota. Check your OpenAI API quota and try again later.");
    }
  }
}

// Main function with throttling
async function main() {
  for (const [featureKey, featureDefinition] of Object.entries(features)) {
    await generateFeatureConfig(featureKey, featureDefinition);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay to avoid hitting rate limits
  }
}

main();
