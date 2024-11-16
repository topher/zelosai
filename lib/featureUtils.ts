// lib/featureUtils.ts
import { features } from '@/config/features';
import { Action, ActionFeatureKey, FeatureKey, Feature, ActionFeature } from '@/config/featuresConfig';

/**
 * Retrieves the ActionFeatureKey based on action and featureKey.
 * @param action - The action string ('read', 'create', etc.).
 * @param featureKey - The key of the feature.
 * @returns The corresponding ActionFeatureKey or null.
 */
export function getActionFeatureKey(
  action: string, // Changed from Action to string
  featureKey: FeatureKey
): ActionFeatureKey | null {
  // Convert Record to Array
  const featureArray: Feature[] = Object.values(features);
  
  // Find the feature matching the provided featureKey
  const feature = featureArray.find((f: Feature) => f.key === featureKey);
  if (!feature) return null;

  console.log("🧐", feature)

  
  // Find the action within the feature matching the provided action
  const actionFeature = feature.actions.find((a: ActionFeature) => a.action === action);
  
  // Return the corresponding ActionFeatureKey or null if not found
  return actionFeature ? actionFeature.actionKey : null;
}

/**
 * Retrieves the Feature based on ActionFeatureKey.
 * @param actionFeatureKey - The ActionFeatureKey enum.
 * @returns The corresponding Feature or undefined.
 */
export function getFeatureByActionKey(actionFeatureKey: ActionFeatureKey): Feature | undefined {
  const featureArray: Feature[] = Object.values(features);
  
  // Find the feature that has an action matching the provided ActionFeatureKey
  return featureArray.find((feature: Feature) =>
    feature.actions.some((action: ActionFeature) => action.actionKey === actionFeatureKey)
  );
}

/**
 * Maps resourceName to FeatureKey by utilizing the features array.
 * @param resourceName - The resource name string.
 * @returns The corresponding FeatureKey or null.
 */
export function getFeatureKeyFromResourceName(resourceName: string): FeatureKey | null {
  const featureArray: Feature[] = Object.values(features);
  
  // Find the feature whose resourceName matches the provided resourceName (case-insensitive)
  const feature = featureArray.find((f: Feature) => 
    f.metadata.resourceName.toLowerCase() === resourceName.toLowerCase()
  );
  
  return feature ? feature.key : null;
}

/**
 * Retrieves resourceType based on resourceName.
 * @param resourceName - The resource name string.
 * @returns The corresponding resourceType or null.
 */
export function getResourceTypeByResourceName(resourceName: string): string | null {
  const featureArray: Feature[] = Object.values(features);
  
  // Find the feature whose resourceName matches the provided resourceName (case-insensitive)
  const feature = featureArray.find((f: Feature) => 
    f.metadata.resourceName.toLowerCase() === resourceName.toLowerCase()
  );
  
  return feature ? feature.metadata.resourceType : null;
}

/**
 * Retrieves resourceName based on resourceType.
 * @param resourceType - The resource type string.
 * @returns The corresponding resourceName or null.
 */
export function getResourceNameByResourceType(resourceType: string): string | null {
  const featureArray: Feature[] = Object.values(features);
  
  // Find the feature whose resourceType matches the provided resourceType (case-insensitive)
  const feature = featureArray.find((f: Feature) => 
    f.metadata.resourceType.toLowerCase() === resourceType.toLowerCase()
  );
  
  return feature ? feature.metadata.resourceName : null;
}

/**
 * Type Guard to check if a key is a valid ActionFeatureKey
 * @param key - The key string to check.
 * @returns Boolean indicating if the key is a valid ActionFeatureKey.
 */
export function isActionFeatureKeyFn(key: string): key is ActionFeatureKey {
  return Object.values(ActionFeatureKey).includes(key as ActionFeatureKey);
}
