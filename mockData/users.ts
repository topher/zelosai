// mockData/users.ts

import { User } from '@/app/types';

export const mockUsers: User[] = [
  {
    id: 'user_athlete_admin',
    subscription: {
      id: 'subscription-1',
      subscriptionTier: 'FREE',
      credits: 100,
      featuresUsage: {
        facetsPerBrandingCardType: 0,
        monthlyProfileViews: 0,
      },
    },
    orgId: 'org_athlete',
    orgRole: 'org:admin',
    groups: [],
  },
  {
    id: 'user_agent',
    subscription: {
      id: 'subscription-2',
      subscriptionTier: 'PRO',
      credits: 1000,
      featuresUsage: {
        facetsPerBrandingCardType: 0,
        monthlyProfileViews: 0,
      },
    },
    orgId: 'org_agent',
    orgRole: 'org:agent',
    groups: [],
  },
  {
    id: 'user_member',
    subscription: {
      id: 'subscription-3',
      subscriptionTier: 'FREE',
      credits: 50,
      featuresUsage: {
        facetsPerBrandingCardType: 0,
        monthlyProfileViews: 0,
      },
    },
    orgId: 'org_member',
    orgRole: 'org:member',
    groups: [],
  },
  {
    id: 'user_member_private',
    subscription: {
      id: 'subscription-4',
      subscriptionTier: 'FREE',
      credits: 50,
      featuresUsage: {
        facetsPerBrandingCardType: 0,
        monthlyProfileViews: 0,
      },
    },
    orgId: 'org_member_private',
    orgRole: 'org:member',
    groups: [],
  },
  {
    id: 'user_member_delete',
    subscription: {
      id: 'subscription-5',
      subscriptionTier: 'FREE',
      credits: 50,
      featuresUsage: {
        facetsPerBrandingCardType: 0,
        monthlyProfileViews: 0,
      },
    },
    orgId: 'org_member_delete',
    orgRole: 'org:member',
    groups: [],
  },
  {
    id: 'user_manager',
    subscription: {
      id: 'subscription-6',
      subscriptionTier: 'PRO',
      credits: 800,
      featuresUsage: {
        facetsPerBrandingCardType: 0,
        monthlyProfileViews: 0,
      },
    },
    orgId: 'org_manager',
    orgRole: 'org:manager',
    groups: [],
  },
  {
    id: 'user_admin',
    subscription: {
      id: 'subscription-7',
      subscriptionTier: 'FREE',
      credits: 100,
      featuresUsage: {
        facetsPerBrandingCardType: 0,
        monthlyProfileViews: 0,
      },
    },
    orgId: 'org_admin',
    orgRole: 'org:admin',
    groups: [],
  },
  {
    id: 'user_no_policy',
    subscription: {
      id: 'subscription-8',
      subscriptionTier: 'FREE',
      credits: 100,
      featuresUsage: {
        facetsPerBrandingCardType: 0,
        monthlyProfileViews: 0,
      },
    },
    orgId: 'org_no_policy',
    orgRole: 'org:member',
    groups: [],
  },
  {
    id: 'user_multi_group',
    subscription: {
      id: 'subscription-9',
      subscriptionTier: 'PRO',
      credits: 500,
      featuresUsage: {
        facetsPerBrandingCardType: 0,
        monthlyProfileViews: 0,
      },
    },
    orgId: 'org_multi_group',
    orgRole: 'org:member',
    groups: ['group1', 'group2'],
  },
  {
    id: 'user_no_org',
    subscription: {
      id: 'subscription-10',
      subscriptionTier: 'FREE',
      credits: 100,
      featuresUsage: {
        facetsPerBrandingCardType: 0,
        monthlyProfileViews: 0,
      },
    },
    orgId: null,
    orgRole: null,
    groups: [],
  },
  {
    id: 'user_pro',
    subscription: {
      id: 'subscription-11',
      subscriptionTier: 'PRO',
      credits: 1000,
      featuresUsage: {
        facetsPerBrandingCardType: 0,
        monthlyProfileViews: 0,
      },
    },
    orgId: 'org_pro',
    orgRole: 'org:member',
    groups: [],
  },
  {
    id: 'user_free',
    subscription: {
      id: 'subscription-12',
      subscriptionTier: 'FREE',
      credits: 100,
      featuresUsage: {
        facetsPerBrandingCardType: 0,
        monthlyProfileViews: 10, // Assuming the limit is 10
      },
    },
    orgId: 'org_free',
    orgRole: 'org:member',
    groups: [],
  },
  {
    id: 'user_enterprise',
    subscription: {
      id: 'subscription-13',
      subscriptionTier: 'ENTERPRISE',
      credits: Infinity, // Representing unlimited credits
      featuresUsage: {
        facetsPerBrandingCardType: 0,
        monthlyProfileViews: 0,
      },
    },
    orgId: 'org_enterprise',
    orgRole: 'org:admin',
    groups: [],
  },
];
