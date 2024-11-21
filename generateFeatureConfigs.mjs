// generateFeatureConfigs.ts

import fs from 'fs';
import path from 'path';
import OpenAI from 'openai'; // Updated import for the latest SDK

// Ensure you have your OpenAI API key set as an environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// The directory where feature config files will be saved
const featuresDir = path.join(process.cwd(), 'config', 'features');

// Ensure the directory exists
if (!fs.existsSync(featuresDir)) {
  fs.mkdirSync(featuresDir, { recursive: true });
}

// Import features and types with updated paths and extensions
import { features } from './config/featuresConfig.js';
import { Resource } from './app/types.ts';

// Function to generate feature configuration code using OpenAI GPT
async function generateFeatureConfig(featureKey, featureDefinition) {
  const prompt = `
Given the following TypeScript interface for the feature "${featureKey}":

${JSON.stringify(featureDefinition, null, 2)}

// Add your example prompt content as before
`;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500,
      temperature: 0,
    });

    const generatedCode = response.data.choices[0]?.message?.content?.trim();
    if (generatedCode) {
      const featureFilePath = path.join(featuresDir, `${featureKey}.ts`);
      fs.writeFileSync(featureFilePath, generatedCode);
      console.log(`Feature configuration for "${featureKey}" has been generated.`);
    } else {
      console.error(`No code generated for feature "${featureKey}".`);
    }
  } catch (error) {
    console.error(`Error generating feature config for "${featureKey}":`, error);
  }
}

// Main function to loop through features and generate configs
async function main() {
  for (const [featureKey, featureDefinition] of Object.entries(features)) {
    await generateFeatureConfig(featureKey, featureDefinition);
  }
}

main();
