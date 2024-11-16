import * as Yup from 'yup';
import { LayoutDashboard } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const searchableModelsFeature: Feature =     {
    schema: Yup.object().shape({
        // Define the schema for searchable feature
    }),
    fields: [
        // Define fields for searchable feature
    ],
    key: FeatureKey.SearchableModels,
    metadata: {
      category: FeatureCategory.Search,
      icon: LayoutDashboard,
      label: 'Models',
      href: '/search/models',
      description: 'Search through AI models.',
      isInProd: true,
      resourceName: 'complete_trained_models',
      resourceType: 'SearchableModel',
      maxResourceCount: [100, 1000, 10000],
    },
    actions: [
      {
        actionKey: ActionFeatureKey.ReadSearchableModel,
        action: 'read',
        baseTier: SubscriptionTier.FREE,
        resourceLimits: [100, 1000, 10000],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateSearchableModel,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [50, 500, 5000],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.UpdateSearchableModel,
        action: 'update',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [50, 500, 5000],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.DeleteSearchableModel,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [20, 200, 2000],
        creditCost: 3,
      },
    ],
  }