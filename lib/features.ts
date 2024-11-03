// // lib/features.ts

// export enum FeatureCategory {
//   GoalManagement = 'goalManagement',
//   UseCaseManagement = 'useCaseManagement',
//   ModelManagement = 'modelManagement',
//   Analytics = 'analytics',
//   Branding = 'branding',
//   Profile = 'profile',
//   Wallet = 'wallet',
//   AccountManagement = 'accountManagement',
//   // ... Add more categories as needed
// }

// export enum FeatureKey {
//   // Goal Management
//   CreateGoal = 'createGoal',
//   ReadGoal = 'readGoal',
//   EditGoal = 'editGoal',
//   DeleteGoal = 'deleteGoal',

//   // Use Case Management
//   CreateUseCase = 'createUseCase',
//   ReadUseCase = 'readUseCase',
//   EditUseCase = 'editUseCase',
//   DeleteUseCase = 'deleteUseCase',

//   // Model Management
//   ReadModel = 'readModel',
//   CreateModel = 'createModel',
//   EditModel = 'editModel',
//   DeleteModel = 'deleteModel',

//   // Analytics
//   ReadAnalytics = 'readAnalytics',
//   ExportAnalytics = 'exportAnalytics',

//   // Branding
//   ReadBrandingCard = 'readBrandingCard',
//   CreateBrandingCard = 'createBrandingCard',
//   FacetsPerBrandingCardType = 'facetsPerBrandingCardType',

//   // Profile
//   ReadProfileView = 'readProfileView',
//   EditProfile = 'editProfile',

//   // Wallet
//   ConnectWallet = 'connectWallet',

//   // Account Management
//   ManageAccount = 'manageAccount',

//   // ... Add more features as needed
// }

// export interface FeatureMetadata {
//   category: FeatureCategory;
//   creditCost: number;
//   // Add more metadata fields if necessary
// }

// export const features: Record<FeatureKey, FeatureMetadata> = {
//   // Goal Management
//   [FeatureKey.CreateGoal]: {
//     category: FeatureCategory.GoalManagement,
//     creditCost: 5,
//   },
//   [FeatureKey.ReadGoal]: {
//     category: FeatureCategory.GoalManagement,
//     creditCost: 1,
//   },
//   [FeatureKey.EditGoal]: {
//     category: FeatureCategory.GoalManagement,
//     creditCost: 3,
//   },
//   [FeatureKey.DeleteGoal]: {
//     category: FeatureCategory.GoalManagement,
//     creditCost: 4,
//   },

//   // Use Case Management
//   [FeatureKey.CreateUseCase]: {
//     category: FeatureCategory.UseCaseManagement,
//     creditCost: 5,
//   },
//   [FeatureKey.ReadUseCase]: {
//     category: FeatureCategory.UseCaseManagement,
//     creditCost: 1,
//   },
//   [FeatureKey.EditUseCase]: {
//     category: FeatureCategory.UseCaseManagement,
//     creditCost: 3,
//   },
//   [FeatureKey.DeleteUseCase]: {
//     category: FeatureCategory.UseCaseManagement,
//     creditCost: 4,
//   },

//   // Model Management
//   [FeatureKey.ReadModel]: {
//     category: FeatureCategory.ModelManagement,
//     creditCost: 1,
//   },
//   [FeatureKey.CreateModel]: {
//     category: FeatureCategory.ModelManagement,
//     creditCost: 5,
//   },
//   [FeatureKey.EditModel]: {
//     category: FeatureCategory.ModelManagement,
//     creditCost: 3,
//   },
//   [FeatureKey.DeleteModel]: {
//     category: FeatureCategory.ModelManagement,
//     creditCost: 4,
//   },

//   // Analytics
//   [FeatureKey.ReadAnalytics]: {
//     category: FeatureCategory.Analytics,
//     creditCost: 2,
//   },
//   [FeatureKey.ExportAnalytics]: {
//     category: FeatureCategory.Analytics,
//     creditCost: 5,
//   },

//   // Branding
//   [FeatureKey.ReadBrandingCard]: {
//     category: FeatureCategory.Branding,
//     creditCost: 5,
//   },
//   [FeatureKey.CreateBrandingCard]: {
//     category: FeatureCategory.Branding,
//     creditCost: 5,
//   },
//   [FeatureKey.FacetsPerBrandingCardType]: {
//     category: FeatureCategory.Branding,
//     creditCost: 3,
//   },

//   // Profile
//   [FeatureKey.ReadProfileView]: {
//     category: FeatureCategory.Profile,
//     creditCost: 1,
//   },
//   [FeatureKey.EditProfile]: {
//     category: FeatureCategory.Profile,
//     creditCost: 2,
//   },

//   // Wallet
//   [FeatureKey.ConnectWallet]: {
//     category: FeatureCategory.Wallet,
//     creditCost: 1,
//   },

//   // Account Management
//   [FeatureKey.ManageAccount]: {
//     category: FeatureCategory.AccountManagement,
//     creditCost: 5,
//   },

//   // ... Add more features as needed
// };
