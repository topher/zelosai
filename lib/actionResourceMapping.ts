// lib/actionResourceMapping.ts

import { FeatureKey } from '@/config/featuresConfig';

/**
 * Mapping between actions and their corresponding resource types.
 * Example:
 * {
 *   createGoal: 'goals',
 *   readGoal: 'goals',
 *   editGoal: 'goals',
 *   deleteGoal: 'goals',
 *   // Add other mappings as needed
 * }
 */
export const actionResourceMapping: Record<string, string> = {
  createGoal: 'goals',
  readGoal: 'goals',
  editGoal: 'goals',
  deleteGoal: 'goals',
  
  createUseCase: 'useCases',
  readUseCase: 'useCases',
  editUseCase: 'useCases',
  deleteUseCase: 'useCases',
  
  createModel: 'models',
  readModel: 'models',
  editModel: 'models',
  deleteModel: 'models',
  
  createAgent: 'agents',
  readAgent: 'agents',
  editAgent: 'agents',
  deleteAgent: 'agents',
  
  createIssue: 'issues',
  readIssue: 'issues',
  editIssue: 'issues',
  deleteIssue: 'issues',
  
  createBusinessModel: 'businessModel',
  readBusinessModel: 'businessModel',
  editBusinessModel: 'businessModel',
  deleteBusinessModel: 'businessModel',
  
  createBranding: 'branding',
  readBranding: 'branding',
  editBranding: 'branding',
  deleteBranding: 'branding',
  
  createConnector: 'connectors',
  readConnector: 'connectors',
  editConnector: 'connectors',
  deleteConnector: 'connectors',
  
  createTopic: 'topics',
  readTopic: 'topics',
  editTopic: 'topics',
  deleteTopic: 'topics',
  
  createInfoAsset: 'infoAssets',
  readInfoAsset: 'infoAssets',
  editInfoAsset: 'infoAssets',
  deleteInfoAsset: 'infoAssets',
  
  createPolicy: 'policies',
  readPolicy: 'policies',
  editPolicy: 'policies',
  deletePolicy: 'policies',
  
  createTerm: 'terms',
  readTerm: 'terms',
  editTerm: 'terms',
  deleteTerm: 'terms',
  
  createMessage: 'messages',
  readMessage: 'messages',
  editMessage: 'messages',
  deleteMessage: 'messages',
  
  createOffer: 'offers',
  readOffer: 'offers',
  editOffer: 'offers',
  deleteOffer: 'offers',
  
  createRequest: 'requests',
  readRequest: 'requests',
  editRequest: 'requests',
  deleteRequest: 'requests',
  
  createContact: 'contacts',
  readContact: 'contacts',
  editContact: 'contacts',
  deleteContact: 'contacts',
  
  createContract: 'contracts',
  readContract: 'contracts',
  editContract: 'contracts',
  deleteContract: 'contracts',
  
  createWorkflow: 'workflows',
  readWorkflow: 'workflows',
  editWorkflow: 'workflows',
  deleteWorkflow: 'workflows',
  
  createProfileAthlete: 'profileAthletes',
  readProfileAthlete: 'profileAthletes',
  editProfileAthlete: 'profileAthletes',
  deleteProfileAthlete: 'profileAthletes',
  
  createProfileContract: 'profileContracts',
  readProfileContract: 'profileContracts',
  editProfileContract: 'profileContracts',
  deleteProfileContract: 'profileContracts',
  
  createProfileModel: 'profileModels',
  readProfileModel: 'profileModels',
  editProfileModel: 'profileModels',
  deleteProfileModel: 'profileModels',
  
  createProfileBrand: 'profileBrands',
  readProfileBrand: 'profileBrands',
  editProfileBrand: 'profileBrands',
  deleteProfileBrand: 'profileBrands',
  
  createProfileUser: 'profileUsers',
  readProfileUser: 'profileUsers',
  editProfileUser: 'profileUsers',
  deleteProfileUser: 'profileUsers',
  
  createSearchableAthlete: 'searchableAthletes',
  readSearchableAthlete: 'searchableAthletes',
  editSearchableAthlete: 'searchableAthletes',
  deleteSearchableAthlete: 'searchableAthletes',
  
  createSearchableContract: 'searchableContracts',
  readSearchableContract: 'searchableContracts',
  editSearchableContract: 'searchableContracts',
  deleteSearchableContract: 'searchableContracts',
  
  createSearchableModel: 'searchableModels',
  readSearchableModel: 'searchableModels',
  editSearchableModel: 'searchableModels',
  deleteSearchableModel: 'searchableModels',

  createTask: 'tasks',
  readTask: 'tasks',
  editTask: 'tasks',
  deleteTask: 'tasks',

  // New mappings for Recommendations
  createRecommendation: 'recommendations',
  readRecommendation: 'recommendations',
  editRecommendation: 'recommendations',
  deleteRecommendation: 'recommendations',

  // New mappings for Scheduled Events
  createScheduledEvent: 'scheduledEvents',
  readScheduledEvent: 'scheduledEvents',
  editScheduledEvent: 'scheduledEvents',
  deleteScheduledEvent: 'scheduledEvents',

  // New mappings for Transactions
  createTransaction: 'transactions',
  readTransaction: 'transactions',
  editTransaction: 'transactions',
  deleteTransaction: 'transactions',

  createSearchableBrand: 'searchableBrands',
  readSearchableBrand: 'searchableBrands',
  editSearchableBrand: 'searchableBrands',
  deleteSearchableBrand: 'searchableBrands',
  
  createSearchableUser: 'searchableUsers',
  readSearchableUser: 'searchableUsers',
  editSearchableUser: 'searchableUsers',
  deleteSearchableUser: 'searchableUsers',
  
  exportAnalytics: 'analytics',
  
  connectWallet: 'wallets',
  
  manageAccount: 'accounts',
  
  // Add other feature-action mappings as needed
};

/**
 * Maps action and resourceType to a specific ActionFeatureKey.
 * @param action - The action being performed (e.g., 'read', 'create').
 * @param resourceType - The type of resource (e.g., 'goals', 'useCases').
 * @returns The corresponding ActionFeatureKey or null if not found.
 */
export function getActionFeatureKey(action: 'read' | 'create' | 'edit' | 'delete', resourceType: string): FeatureKey | null {
  const actionResource = `${action}${capitalize(resourceType)}`; // e.g., 'createGoal'

  const featureKey = FeatureKey[actionResource as keyof typeof FeatureKey];

  return featureKey || null;
}

/**
 * Capitalizes the first letter of a string.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

