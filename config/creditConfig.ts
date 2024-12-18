// config/creditConfig.ts

export const baseCreditCosts: Record<string, number> = {
    'read:Goal': 1,
    'write:Goal': 4,
    'generate:Model': 10,
    'create:BusinessModelCard': 7,
    'read:ProfileView': 1, // Added based on test output
    // Add more action-resourceType combinations as needed
  };
  
export const subscriptionMultipliers: Record<string, number> = {
  FREE: 1,
  PRO: 0.8, // 20% discount
  ENTERPRISE: 0.5, // 50% discount
};

export const countLimits: Record<string, Record<string, number | 'unlimited' >> = {
  facetsPerBrandingCardType: {
    FREE: 3,
    PRO: 10,
    ENTERPRISE: Infinity,
  },
  monthlyProfileViews: {
    FREE: 10,
    PRO: 50,
    ENTERPRISE: Infinity,
  },
  // Add more count-based limits as needed
};
