import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { ClipboardList } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const searchableContractsFeature: Feature =     {
    key: FeatureKey.SearchableContracts,
    schema: Yup.object().shape({
        // Define the schema for searchable contracts feature
    }),
    fields: [
        // Define fields for searchable contracts feature
    ],
    metadata: {
      category: FeatureCategory.Search,
      icon: ClipboardList,
      label: 'Contracts',
      href: '/search/contracts',
      description: 'Search through contract documents.',
      isInProd: true,
      resourceName: 'contracts',
      resourceType: ResourceType.SearchableContract,
      maxResourceCount: [100, 1000, 10000],
    },
    actions: [
      {
        actionKey: ActionFeatureKey.ReadSearchableContract,
        action: 'read',
        baseTier: SubscriptionTier.FREE,
        resourceLimits: [100, 1000, 10000],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateSearchableContract,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [50, 500, 5000],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.UpdateSearchableContract,
        action: 'update',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [50, 500, 5000],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.DeleteSearchableContract,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [20, 200, 2000],
        creditCost: 3,
      },
    ],
  }