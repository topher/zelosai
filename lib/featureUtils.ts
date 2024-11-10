// lib/featureUtils.ts

import { features, Action, ActionFeatureKey, FeatureKey, Feature } from '@/config/featuresConfig';

/**
 * Retrieves the ActionFeatureKey based on action and resourceType.
 * @param action - The action string ('read', 'create', etc.).
 * @param resourceType - The type of the resource.
 * @returns The corresponding ActionFeatureKey or null.
 */
export function getActionFeatureKey(
  action: Action,
  resourceType: string
): ActionFeatureKey | null {
  const feature = features.find(f => f.metadata.resourceType.toLowerCase() === resourceType.toLowerCase());
  if (!feature) return null;
  const actionFeature = feature.actions.find(a => a.action === action);
  return actionFeature ? actionFeature.actionKey : null;
}

/**
 * Retrieves the Feature based on ActionFeatureKey.
 * @param actionFeatureKey - The ActionFeatureKey enum.
 * @returns The corresponding Feature or undefined.
 */
export function getFeatureByActionKey(actionFeatureKey: ActionFeatureKey): Feature | undefined {
  return features.find(feature =>
    feature.actions.some(action => action.actionKey === actionFeatureKey)
  );
}

/**
 * Maps resourceName to FeatureKey by utilizing the features array.
 * @param resourceName - The resource name string.
 * @returns The corresponding FeatureKey or null.
 */
export function getFeatureKeyFromResourceName(resourceName: string): FeatureKey | null {
  const feature = features.find(f => f.metadata.resourceName.toLowerCase() === resourceName.toLowerCase());
  return feature ? feature.key : null;
}

/**
 * Retrieves resourceType based on resourceName.
 * @param resourceName - The resource name string.
 * @returns The corresponding resourceType or null.
 */
export function getResourceTypeByResourceName(resourceName: string): string | null {
  const feature = features.find(f => f.metadata.resourceName.toLowerCase() === resourceName.toLowerCase());
  return feature ? feature.metadata.resourceType : null;
}


/**
 * Retrieves resourceType based on resourceName.
 * @param resourceName - The resource name string.
 * @returns The corresponding resourceType or null.
 */
export function getResourceNameByResourceType(resourceType: string): string | null {
    const feature = features.find(f => f.metadata.resourceType.toLowerCase() === resourceType.toLowerCase());
    return feature ? feature.metadata.resourceName : null;
  }
  
/**
 * Type Guard to check if a key is a valid ActionFeatureKey
 */
export function isActionFeatureKeyFn(key: string): key is ActionFeatureKey {
  return Object.values(ActionFeatureKey).includes(key as ActionFeatureKey);
}
