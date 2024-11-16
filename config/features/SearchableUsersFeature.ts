import * as Yup from 'yup';
import { User } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const searchableUsersFeature: Feature =     {
    schema: Yup.object().shape({
        // Define the schema for searchable brands feature
    }),
    fields: [
        // Define fields for searchable brands feature
    ],
    key: FeatureKey.SearchableUsers,
    metadata: {
      category: FeatureCategory.Search,
      icon: User,
      label: 'Users',
      href: '/search/users',
      description: 'Search through user profiles.',
      isInProd: false,
      resourceName: 'users',
      resourceType: 'SearchableUser',
      maxResourceCount: [0, 1000, 10000],
    },
    actions: [
      {
        actionKey: ActionFeatureKey.ReadSearchableUser,
        action: 'read',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 1000, 10000],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateSearchableUser,
        action: 'create',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [0, 500, 5000],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.UpdateSearchableUser,
        action: 'update',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [0, 500, 5000],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.DeleteSearchableUser,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [0, 200, 2000],
        creditCost: 3,
      },
    ],
  }  