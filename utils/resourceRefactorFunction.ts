// resourceRefactorFunction.ts

import { Project, SyntaxKind, ObjectLiteralExpression, PropertyAssignment } from 'ts-morph';
import * as path from 'path';
import * as fs from 'fs';

// Paths
const configDir = path.join(__dirname, 'config');
const featuresDir = path.join(configDir, 'features');
const predicatesFile = path.join(configDir, 'predicates.ts'); // Adjust path if needed
const resourcesDir = path.join(configDir, 'resources');
const legacyResourcesDir = path.join(configDir, 'resources'); // Directory containing legacy resource files
const agentsFilePath = path.join(configDir, 'agents.json'); // The new agents.json file

// Ensure resources directory exists
if (!fs.existsSync(resourcesDir)) {
  fs.mkdirSync(resourcesDir, { recursive: true });
}

// Function to convert camelCase or PascalCase to snake_case
function toSnakeCase(str: string): string {
  return str
    .replace(/\.?([A-Z]+)/g, (x, y) => "_" + y.toLowerCase())
    .replace(/^_/, "")
    .toLowerCase();
}

// Function to generate agentId
function generateAgentId(featureKey: string): string {
  // Remove 'FeatureKey' or 'Feature' wherever it appears
  const sanitizedFeatureKey = featureKey.replace(/FeatureKey/gi, '').replace(/Feature/gi, '');
  // Remove spaces and non-alphanumeric characters
  const cleanedFeatureKey = sanitizedFeatureKey.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
  return `lead${cleanedFeatureKey}Agent`;
}

// Function to create resource file content with defaultPredicates
function createResourceTemplate(
  resourceType: string,
  defaultPredicates: Record<string, string>,
  agentId: string
): string {
  return `import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const ${resourceType}Resource = {
  resourceTypeId: ResourceType.${resourceType},
  defaultPredicates: ${JSON.stringify(defaultPredicates, null, 2)},
  schema: generateSchemaFromDefaultPredicates(${JSON.stringify(defaultPredicates, null, 2)}),
  agentId: '${agentId}', // Assign an agentId to the resource
};

export default ${resourceType}Resource;
`;
}

// Function to update feature file with agentId and defaultPredicates
function updateFeatureFile(
  featureObject: ObjectLiteralExpression,
  agentId: string,
  defaultPredicates: Record<string, string>
): void {
  // Find or create the 'metadata' property
  let metadataProp = featureObject.getProperty('metadata') as PropertyAssignment | undefined;

  let metadataInitializer: ObjectLiteralExpression;

  if (!metadataProp || !metadataProp.getInitializer()) {
    // If 'metadata' property doesn't exist, create it
    metadataProp = featureObject.addPropertyAssignment({
      name: 'metadata',
      initializer: '{}',
    });
    metadataInitializer = metadataProp.getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
  } else {
    // Ensure it's an ObjectLiteralExpression
    metadataInitializer = metadataProp.getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
  }

  // Add or update 'agentId'
  let agentIdProp = metadataInitializer.getProperty('agentId') as PropertyAssignment | undefined;
  if (!agentIdProp) {
    metadataInitializer.addPropertyAssignment({
      name: 'agentId',
      initializer: `'${agentId}'`,
    });
    console.log(`Added 'agentId' to 'metadata'.`);
  } else {
    agentIdProp.setInitializer(`'${agentId}'`);
    console.log(`Updated 'agentId' in 'metadata'.`);
  }

  // Add or update 'defaultPredicates'
  let defaultPredicatesProp = metadataInitializer.getProperty('defaultPredicates') as PropertyAssignment | undefined;
  if (!defaultPredicatesProp) {
    metadataInitializer.addPropertyAssignment({
      name: 'defaultPredicates',
      initializer: JSON.stringify(defaultPredicates, null, 2),
    });
    console.log(`Added 'defaultPredicates' to 'metadata'.`);
  } else {
    defaultPredicatesProp.setInitializer(JSON.stringify(defaultPredicates, null, 2));
    console.log(`Updated 'defaultPredicates' in 'metadata'.`);
  }

  // Remove 'requiredPredicates' and 'fields' if they exist
  const requiredPredicatesProp = featureObject.getProperty('requiredPredicates');
  if (requiredPredicatesProp) {
    requiredPredicatesProp.remove();
    console.log(`Removed 'requiredPredicates' from feature.`);
  }

  const fieldsProp = featureObject.getProperty('fields');
  if (fieldsProp) {
    fieldsProp.remove();
    console.log(`Removed 'fields' from feature.`);
  }
}
// Define Agent Interface
interface Agent {
  id: string;
  accountId: string;
  ownerId: string;
  resourceType: string;
  visibility: string;
  URI: string;
  agentType: string;
  name: string;
  expertiseAreas: string[];
  availabilityStatus: string;
  aiCapabilities: {
    supportedLanguages: string[];
    responseTime: number;
    integrations: string[];
  };
  tags: string[];
}

// Main function
async function refactorResources() {
  // Initialize ts-morph project
  const project = new Project({
    tsConfigFilePath: path.join(__dirname, 'tsconfig.json'),
    compilerOptions: {
      allowJs: true,
    },
  });

  // Read all feature files
  const featureFiles = fs.readdirSync(featuresDir).filter(file => file.endsWith('Feature.ts') || file.endsWith('Feature.tsx'));

  if (featureFiles.length === 0) {
    console.warn('No feature files found in the features directory.');
    return;
  }

  // Array to hold generated agents
  const agentsArray: Agent[] = [];

  for (const file of featureFiles) {
    const featureFilePath = path.join(featuresDir, file);
    const sourceFile = project.addSourceFileAtPath(featureFilePath);

    // Find the exported feature variable
    const exportedFeature = sourceFile.getVariableDeclarations().find(varDecl => {
      const variableStatement = varDecl.getFirstAncestorByKind(SyntaxKind.VariableStatement);
      const isExported = variableStatement?.isExported() || false;
      return isExported && varDecl.getName().endsWith('Feature');
    });

    if (!exportedFeature) {
      console.error(`No exported feature variable found in ${file}`);
      continue;
    }

    const featureInitializer = exportedFeature.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
    if (!featureInitializer) {
      console.error(`Feature initializer is not an object literal in ${file}`);
      continue;
    }

    const featureObject = featureInitializer;

    // Extract 'key' property
    const keyProp = featureObject.getProperty('key') as PropertyAssignment | undefined;
    if (!keyProp) {
      console.error(`"key" property not found in ${file}`);
      continue;
    }
    const keyInitializer = keyProp.getInitializer();
    const featureKey = keyInitializer ? keyInitializer.getText().replace(/['"`]/g, '') : null;
    if (!featureKey) {
      console.error(`"key" has no initializer in ${file}`);
      continue;
    }

    // Extract 'metadata' property
    const metadataProp = featureObject.getProperty('metadata') as PropertyAssignment | undefined;
    if (!metadataProp) {
      console.error(`"metadata" property not found in ${file}`);
      continue;
    }
    const metadataInitializer = metadataProp.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
    if (!metadataInitializer) {
      console.error(`"metadata" is not an object literal in ${file}`);
      continue;
    }

    const metadataObject = metadataInitializer;

    // Extract 'resourceType' from 'metadata'
    const resourceTypeProp = metadataObject.getProperty('resourceType') as PropertyAssignment | undefined;
    if (!resourceTypeProp) {
      console.error(`"resourceType" property not found in metadata of ${file}`);
      continue;
    }
    const resourceTypeInitializer = resourceTypeProp.getInitializer();
    const resourceType = resourceTypeInitializer
      ? resourceTypeInitializer.getText().replace(/ResourceType\./, '').replace(/['"`]/g, '')
      : null;
    if (!resourceType) {
      console.error(`"resourceType" has no initializer in metadata of ${file}`);
      continue;
    }

    // Generate agentId
    const agentId = generateAgentId(featureKey);
    console.log(`Generated agentId: ${agentId} for featureKey: ${featureKey}`);

    // Path to the legacy resource file
    const legacyResourceFileName = `${resourceType}.tsx`;
    const legacyResourceFilePath = path.join(legacyResourcesDir, legacyResourceFileName);

    // Check if the legacy resource file exists
    if (!fs.existsSync(legacyResourceFilePath)) {
      console.warn(`Legacy resource file ${legacyResourceFilePath} not found for resourceType ${resourceType}. Skipping.`);
      continue;
    }

    // Parse the legacy resource file to extract fields
    const legacyResourceSourceFile = project.addSourceFileAtPath(legacyResourceFilePath);
    const legacyExportedResource = legacyResourceSourceFile.getVariableDeclarations().find(varDecl => {
      const variableStatement = varDecl.getFirstAncestorByKind(SyntaxKind.VariableStatement);
      const isExported = variableStatement?.isExported() || false;
      return isExported && varDecl.getName().endsWith('Resource');
    });

    if (!legacyExportedResource) {
      console.error(`No exported resource variable found in ${legacyResourceFileName}`);
      continue;
    }

    const legacyResourceInitializer = legacyExportedResource.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
    if (!legacyResourceInitializer) {
      console.error(`Resource initializer is not an object literal in ${legacyResourceFileName}`);
      continue;
    }

    // Extract 'fields' array from the legacy resource
    const fieldsProp = legacyResourceInitializer.getProperty('fields') as PropertyAssignment | undefined;
    if (!fieldsProp) {
      console.error(`"fields" property not found in ${legacyResourceFileName}`);
      continue;
    }

    const fieldsArray = fieldsProp.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
    if (!fieldsArray) {
      console.error(`"fields" is not an array in ${legacyResourceFileName}`);
      continue;
    }

    const defaultPredicates: Record<string, string> = {};

    // Iterate over fields to extract field names and required status
    fieldsArray.getElements().forEach(element => {
      if (!element.isKind(SyntaxKind.ObjectLiteralExpression)) {
        return;
      }
      const fieldObject = element.asKindOrThrow(SyntaxKind.ObjectLiteralExpression);
      const nameProp = fieldObject.getProperty('name') as PropertyAssignment | undefined;
      const requiredProp = fieldObject.getProperty('required') as PropertyAssignment | undefined;

      if (!nameProp) {
        return;
      }

      const nameInitializer = nameProp.getInitializer();
      const fieldName = nameInitializer?.getText().replace(/['"`]/g, '');
      if (!fieldName) {
        return;
      }

      // Convert fieldName to snake_case
      const predicateName = toSnakeCase(fieldName);

      // Determine the status
      const requiredStatus = requiredProp?.getInitializer()?.getText() === 'true' ? 'required' : 'allowed';

      // Add to defaultPredicates
      defaultPredicates[predicateName] = requiredStatus;
    });

    // Create resource template
    const resourceContent = createResourceTemplate(resourceType, defaultPredicates, agentId);

    // Define new resource file path
    const resourceFileName = `${resourceType}Resource.ts`;
    const resourceFilePath = path.join(resourcesDir, resourceFileName);

    // Write the new resource file
    fs.writeFileSync(resourceFilePath, resourceContent, 'utf8');
    console.log(`Resource file ${resourceFileName} created successfully.`);

    // Update feature file with agentId and defaultPredicates
    updateFeatureFile(featureObject, agentId, defaultPredicates);

    // Create agent object and add to agentsArray
    const agentObject: Agent = {
      id: agentId,
      accountId: 'default_account',
      ownerId: 'system',
      resourceType: 'Agent',
      visibility: 'public',
      URI: '',
      agentType: 'AI',
      name: `Lead ${featureKey} Agent`,
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
    await sourceFile.save();
    console.log(`Feature file ${file} updated successfully.`);
  }

  // Handle existing agents.json
  let existingAgents: Agent[] = [];
  if (fs.existsSync(agentsFilePath)) {
    try {
      const existingAgentsContent = fs.readFileSync(agentsFilePath, 'utf8');
      existingAgents = JSON.parse(existingAgentsContent);
      console.log(`Existing agents loaded from ${agentsFilePath}`);
    } catch (error) {
      console.error(`Error reading existing agents.json:`, error);
    }
  }

  // Merge new agents with existing ones, avoiding duplicates
  const mergedAgents = [...existingAgents];
  agentsArray.forEach(newAgent => {
    if (!existingAgents.find(agent => agent.id === newAgent.id)) {
      mergedAgents.push(newAgent);
    } else {
      console.warn(`Agent with id ${newAgent.id} already exists. Skipping.`);
    }
  });

  // Write merged agents to agents.json
  fs.writeFileSync(agentsFilePath, JSON.stringify(mergedAgents, null, 2), 'utf8');
  console.log(`Agents file created/updated at ${agentsFilePath}`);
}

// Execute the refactor function
refactorResources().catch(error => {
  console.error('An error occurred:', error);
});
