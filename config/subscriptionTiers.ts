// config/subscriptionTiers.ts

import { SubscriptionTier } from '@/app/types';

interface SubscriptionTierDetails {
  name: string;
  creditMultiplier: number;
  features: {
    knowledgeBank: {
      connectors: number | 'unlimited';
      storageLimit: string;
    };
    models: {
      accessDefault: boolean;
      customModels: boolean;
      modelCount: number | 'unlimited';
    };
    profiles: {
      viewsInSearch: number | 'unlimited';
      visitedProfiles: number | 'unlimited';
    };
    strategy: {
      facets: number;
      strategyTypes: string[];
    };
    dashboard: {
      recommendations: number | 'unlimited';
    };
    campaigns: boolean;
    marketplace: {
      messages: number | 'unlimited';
      offers: number | 'unlimited';
      requests: number | 'unlimited';
      crm: boolean;
    };
  };
  credits: {
    monthly: number | 'unlimited';
    overagePricePerUnit?: number;
  };
}

export const subscriptionTiers: Record<SubscriptionTier, SubscriptionTierDetails> = {
  FREE: {
    name: 'Free',
    creditMultiplier: 1,
    features: {
      knowledgeBank: {
        connectors: 1,
        storageLimit: '1GB',
      },
      models: {
        accessDefault: true,
        customModels: false,
        modelCount: 5,
      },
      profiles: {
        viewsInSearch: 10,
        visitedProfiles: 5,
      },
      strategy: {
        facets: 3,
        strategyTypes: ['basic'],
      },
      dashboard: {
        recommendations: 3,
      },
      campaigns: false,
      marketplace: {
        messages: 10,
        offers: 2,
        requests: 1,
        crm: false,
      },
    },
    credits: {
      monthly: 100,
      overagePricePerUnit: 0.1,
    },
  },
  PRO: {
    name: 'Pro',
    creditMultiplier: 0.8,
    features: {
      knowledgeBank: {
        connectors: 'unlimited',
        storageLimit: '10GB',
      },
      models: {
        accessDefault: true,
        customModels: true,
        modelCount: 50,
      },
      profiles: {
        viewsInSearch: 50,
        visitedProfiles: 25,
      },
      strategy: {
        facets: 10,
        strategyTypes: ['basic', 'advanced'],
      },
      dashboard: {
        recommendations: 10,
      },
      campaigns: false,
      marketplace: {
        messages: 50,
        offers: 10,
        requests: 5,
        crm: true,
      },
    },
    credits: {
      monthly: 1000,
      overagePricePerUnit: 0.08,
    },
  },
  ENTERPRISE: {
    name: 'Enterprise',
    creditMultiplier: 0.5,
    features: {
      knowledgeBank: {
        connectors: 'unlimited',
        storageLimit: 'unlimited',
      },
      models: {
        accessDefault: true,
        customModels: true,
        modelCount: 'unlimited',
      },
      profiles: {
        viewsInSearch: 'unlimited',
        visitedProfiles: 'unlimited',
      },
      strategy: {
        facets: Infinity,
        strategyTypes: ['basic', 'advanced', 'enterprise'],
      },
      dashboard: {
        recommendations: 'unlimited',
      },
      campaigns: true,
      marketplace: {
        messages: 'unlimited',
        offers: 'unlimited',
        requests: 'unlimited',
        crm: true,
      },
    },
    credits: {
      monthly: 'unlimited',
    },
  },
};
