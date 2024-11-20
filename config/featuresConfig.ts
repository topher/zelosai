// config/featuresConfig.ts

import React, { SVGProps } from 'react';
import {
  LayoutDashboard,
  Briefcase,
  ImageIcon,
  Database,
  ShoppingCart,
  Workflow,
  Search,
  Calendar,
  Target,
  Lightbulb,
  UserPlus,
  AlertTriangle,
  Building,
  ThumbsUp,
  ZoomIn,
  User,
  ClipboardList,
  MessageCircle,
  Gift,
  FileText,
  CheckSquare,
  Shield,
  Link,
  Book,
  BookLock,
  Library,
  Info,
  MousePointer2,
  Fingerprint,
  Box,
  FileBox,
  Rocket,
  PackageSearch,
  LineChart,
  LucideIcon,
} from 'lucide-react';

/**
 * Enum for Subscription Tiers
 */
export enum SubscriptionTier {
  FREE = 'FREE',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
}

/**
 * Define the order for tiers
 */
export const TIER_ORDER: SubscriptionTier[] = [
  SubscriptionTier.FREE,
  SubscriptionTier.PRO,
  SubscriptionTier.ENTERPRISE,
];

/**
 * Enum for Feature Categories with associated colors.
 */
export enum FeatureCategory {
  Dashboard = 'dashboard',
  Strategy = 'strategy',
  Models = 'models',
  KnowledgeBank = 'knowledgeBank',
  Marketplace = 'deals',
  Workflows = 'workflows',
  Search = 'search',
  Profiles = 'profiles',
  // ... Add more categories as needed
}

export interface FeatureCategoryMetadata {
  label: string;
  icon: LucideIcon; // Use LucideIcon type;
  colorHex: string; // Use hex code instead of Tailwind classes
  href: string;
}

export const featureCategoryConfig: { [key in FeatureCategory]: FeatureCategoryMetadata } = {
  [FeatureCategory.Dashboard]: {
    label: 'Dashboard',
    icon: LayoutDashboard,
    colorHex: '#6B7280', // Gray
    href: "/dashboard/Dashboard"
  },
  [FeatureCategory.Strategy]: {
    label: 'Strategize',
    icon: Briefcase,
    colorHex: '#3B82F6', // Blue
    href: "/dashboard/Strategy"
  },
  [FeatureCategory.Models]: {
    label: 'Generate',
    icon: ImageIcon,
    colorHex: '#10B981', // Green
    href: "/dashboard/Models"
  },
  [FeatureCategory.KnowledgeBank]: {
    label: 'My Assets',
    icon: Database,
    colorHex: '#F59E0B', // Gold
    href: "/dashboard/Knowledge"
  },
  [FeatureCategory.Marketplace]: {
    label: 'My Deals',
    icon: ShoppingCart,
    colorHex: '#F97316', // Orange
    href: "/dashboard/Marketplace"
  },
  [FeatureCategory.Workflows]: {
    label: 'My Flows',
    icon: Workflow,
    colorHex: '#EF4444', // Red
    href: "/dashboard/Workflows"
  },
  [FeatureCategory.Search]: {
    label: 'Search',
    icon: Search,
    colorHex: '#8B5CF6', // Purple
    href: "/dashboard/Search"
  },
  [FeatureCategory.Profiles]: {
    label: 'Profiles',
    icon: User,
    colorHex: '#EC4899', // Pink
    href: "/dashboard/Profiles"
  },
};

// config/featuresConfig.ts

export type Action = 'read' | 'create' | 'edit' | 'delete' ;

/**
 * Enum for Feature Keys (Action-Agnostic)
 */
export enum FeatureKey {
  // Dashboard Features
  Recommendations = 'Recommendations',
  UserActions = 'UserActions',
  Analytics = 'Analytics',
  Alerts = 'Alerts',

  // Strategy Features
  Goals = 'Goals',
  UseCases = 'UseCases',
  Personas = 'Personas',
  Issues = 'Issues',
  BusinessModel = 'BusinessModel',
  Branding = 'Branding',

  // Models Features
  Models = 'Models',
  TrainModels = 'TrainModels',
  ModelSubjects = 'ModelSubjects',
  ModelTrainings = 'ModelTrainings',

  // Knowledge Bank Features
  Connectors = 'Connectors',
  Topics = 'Topics',
  InfoAssets = 'InfoAssets',
  Policies = 'Policies',
  Terms = 'Terms',

  // Marketplace Features
  Messages = 'Messages',
  Offers = 'Offers',
  Transactions = 'Transactions',
  Contracts = 'Contracts',

  // Workflows Features
  Agents = 'Agents',
  Workflows = 'Workflows',
  Tasks = 'Tasks',
  Calendar = "Calendar",

  // Profiles Features
  ProfileAthletes = 'ProfileAthletes',
  ProfileContracts = 'ProfileContracts',
  ProfileModels = 'ProfileModels',
  ProfileBrands = 'ProfileBrands',
  ProfileUsers = 'ProfileUsers',

  // Searchable Features
  SearchableAthletes = 'SearchableAthletes',
  SearchableContracts = 'SearchableContracts',
  SearchableModels = 'SearchableModels',
  SearchableBrands = 'SearchableBrands',
  SearchableUsers = 'SearchableUsers',
}


// app/types.ts

export enum ActionFeatureKey {
  // Recommendations Actions
  CreateRecommendation = 'CreateRecommendation',
  ReadRecommendation = 'ReadRecommendation',
  EditRecommendation = 'EditRecommendation',
  DeleteRecommendation = 'DeleteRecommendation',

  // UserActions Actions
  CreateUserAction = 'CreateUserAction',
  ReadUserAction = 'ReadUserAction',
  EditUserAction = 'EditUserAction',
  DeleteUserAction = 'DeleteUserAction',

  // Goals Actions
  CreateGoal = 'CreateGoal',
  ReadGoal = 'ReadGoal',
  EditGoal = 'EditGoal',
  DeleteGoal = 'DeleteGoal',

  // UseCases Actions
  CreateUseCase = 'CreateUseCase',
  ReadUseCase = 'ReadUseCase',
  EditUseCase = 'EditUseCase',
  DeleteUseCase = 'DeleteUseCase',

  // Issues Actions
  CreateIssue = 'CreateIssue',
  ReadIssue = 'ReadIssue',
  EditIssue = 'EditIssue',
  DeleteIssue = 'DeleteIssue',

  // BusinessModel Actions
  CreateBusinessModel = 'CreateBusinessModel',
  ReadBusinessModel = 'ReadBusinessModel',
  EditBusinessModel = 'EditBusinessModel',
  DeleteBusinessModel = 'DeleteBusinessModel',

  // Branding Actions
  CreateBranding = 'CreateBranding',
  ReadBranding = 'ReadBranding',
  EditBranding = 'EditBranding',
  DeleteBranding = 'DeleteBranding',

  // Models Actions
  CreateModel = 'CreateModel',
  ReadModel = 'ReadModel',
  EditModel = 'EditModel',
  DeleteModel = 'DeleteModel',

  // CustomModels Actions
  CreateCustomModel = 'CreateCustomModel',
  ReadCustomModel = 'ReadCustomModel',
  EditCustomModel = 'EditCustomModel',
  DeleteCustomModel = 'DeleteCustomModel',

  // TrainModels Actions
  CreateTrainModel = 'CreateTrainModel',
  ReadTrainModel = 'ReadTrainModel',
  EditTrainModel = 'EditTrainModel',
  DeleteTrainModel = 'DeleteTrainModel',

  // Connectors Actions
  CreateConnector = 'CreateConnector',
  ReadConnector = 'ReadConnector',
  EditConnector = 'EditConnector',
  DeleteConnector = 'DeleteConnector',

  // Topics Actions
  CreateTopic = 'CreateTopic',
  ReadTopic = 'ReadTopic',
  EditTopic = 'EditTopic',
  DeleteTopic = 'DeleteTopic',

  // InfoAssets Actions
  CreateInfoAsset = 'CreateInfoAsset',
  ReadInfoAsset = 'ReadInfoAsset',
  EditInfoAsset = 'EditInfoAsset',
  DeleteInfoAsset = 'DeleteInfoAsset',

  // Policies Actions
  CreatePolicy = 'CreatePolicy',
  ReadPolicy = 'ReadPolicy',
  EditPolicy = 'EditPolicy',
  DeletePolicy = 'DeletePolicy',

  // Terms Actions
  CreateTerm = 'CreateTerm',
  ReadTerm = 'ReadTerm',
  EditTerm = 'EditTerm',
  DeleteTerm = 'DeleteTerm',

  // Messages Actions
  CreateMessage = 'CreateMessage',
  ReadMessage = 'ReadMessage',
  EditMessage = 'EditMessage',
  DeleteMessage = 'DeleteMessage',

  // Offers Actions
  CreateOffer = 'CreateOffer',
  ReadOffer = 'ReadOffer',
  EditOffer = 'EditOffer',
  DeleteOffer = 'DeleteOffer',

  // Contracts Actions
  CreateContract = 'CreateContract',
  ReadContract = 'ReadContract',
  EditContract = 'EditContract',
  DeleteContract = 'DeleteContract',

  // Transactions Actions
  CreateTransaction = 'CreateTransaction',
  ReadTransaction = 'ReadTransaction',
  EditTransaction = 'EditTransaction',
  DeleteTransaction = 'DeleteTransaction',

  // Workflows Actions
  CreateWorkflow = 'CreateWorkflow',
  ReadWorkflow = 'ReadWorkflow',
  EditWorkflow = 'EditWorkflow',
  DeleteWorkflow = 'DeleteWorkflow',

  // Tasks Actions
  CreateTask = 'CreateTask',
  ReadTask = 'ReadTask',
  EditTask = 'EditTask',
  DeleteTask = 'DeleteTask',

  // Calendar Actions
  CreateScheduledEvent = 'CreateScheduledEvent',
  ReadScheduledEvent = 'ReadScheduledEvent',
  EditScheduledEvent = 'EditScheduledEvent',
  DeleteScheduledEvent = 'DeleteScheduledEvent',

  // ProfileAthletes Actions
  CreateProfileAthlete = 'CreateProfileAthlete',
  ReadProfileAthlete = 'ReadProfileAthlete',
  EditProfileAthlete = 'EditProfileAthlete',
  DeleteProfileAthlete = 'DeleteProfileAthlete',

  // ProfileContracts Actions
  CreateProfileContract = 'CreateProfileContract',
  ReadProfileContract = 'ReadProfileContract',
  EditProfileContract = 'EditProfileContract',
  DeleteProfileContract = 'DeleteProfileContract',

  // ProfileModels Actions
  CreateProfileModel = 'CreateProfileModel',
  ReadProfileModel = 'ReadProfileModel',
  EditProfileModel = 'EditProfileModel',
  DeleteProfileModel = 'DeleteProfileModel',

  // ProfileBrands Actions
  CreateProfileBrand = 'CreateProfileBrand',
  ReadProfileBrand = 'ReadProfileBrand',
  EditProfileBrand = 'EditProfileBrand',
  DeleteProfileBrand = 'DeleteProfileBrand',

  // ProfileUsers Actions
  CreateProfileUser = 'CreateProfileUser',
  ReadProfileUser = 'ReadProfileUser',
  EditProfileUser = 'EditProfileUser',
  DeleteProfileUser = 'DeleteProfileUser',

  // SearchableAthletes Actions
  CreateSearchableAthlete = 'CreateSearchableAthlete',
  ReadSearchableAthlete = 'ReadSearchableAthlete',
  EditSearchableAthlete = 'EditSearchableAthlete',
  DeleteSearchableAthlete = 'DeleteSearchableAthlete',

  // SearchableContracts Actions
  CreateSearchableContract = 'CreateSearchableContract',
  ReadSearchableContract = 'ReadSearchableContract',
  EditSearchableContract = 'EditSearchableContract',
  DeleteSearchableContract = 'DeleteSearchableContract',

  // SearchableModels Actions
  CreateSearchableModel = 'CreateSearchableModel',
  ReadSearchableModel = 'ReadSearchableModel',
  EditSearchableModel = 'EditSearchableModel',
  DeleteSearchableModel = 'DeleteSearchableModel',

  // SearchableBrands Actions
  CreateSearchableBrand = 'CreateSearchableBrand',
  ReadSearchableBrand = 'ReadSearchableBrand',
  EditSearchableBrand = 'EditSearchableBrand',
  DeleteSearchableBrand = 'DeleteSearchableBrand',

  // SearchableUsers Actions
  CreateSearchableUser = 'CreateSearchableUser',
  ReadSearchableUser = 'ReadSearchableUser',
  EditSearchableUser = 'EditSearchableUser',
  DeleteSearchableUser = 'DeleteSearchableUser',

  // Analytics Actions
  ReadAnalytics = 'ReadAnalytics',
  ExportAnalytics = 'ExportAnalytics',

  // BrandingCards Actions
  CreateBrandingCard = 'CreateBrandingCard',
  ReadBrandingCard = 'ReadBrandingCard',
  EditBrandingCard = 'EditBrandingCard',
  DeleteBrandingCard = 'DeleteBrandingCard',
  FacetsPerBrandingCardType = 'FacetsPerBrandingCardType',

  // New Analytics Actions
  CreateStatistic = 'CreateStatistic',
  ReadStatistic = 'ReadStatistic',
  EditStatistic = 'EditStatistic',
  DeleteStatistic = 'DeleteStatistic',

  // New Alerts Actions
  CreateAlert = 'CreateAlert',
  ReadAlert = 'ReadAlert',
  EditAlert = 'EditAlert',
  DeleteAlert = 'DeleteAlert',

  // New Personas Actions
  CreatePersona = 'CreatePersona',
  ReadPersona = 'ReadPersona',
  EditPersona = 'EditPersona',
  DeletePersona = 'DeletePersona',

  // New Agents Actions in Workflows
  CreateAgent = 'CreateAgent',
  ReadAgent = 'ReadAgent',
  EditAgent = 'EditAgent',
  DeleteAgent = 'DeleteAgent',

  // New ModelSubjects Actions
  CreateModelSubject = 'CreateModelSubject',
  ReadModelSubject = 'ReadModelSubject',
  EditModelSubject = 'EditModelSubject',
  DeleteModelSubject = 'DeleteModelSubject',

  // New ModelTrainings Actions
  CreateModelTraining = 'CreateModelTraining',
  ReadModelTraining = 'ReadModelTraining',
  EditModelTraining = 'EditModelTraining',
  DeleteModelTraining = 'DeleteModelTraining',


  // Profiles Actions
  ReadProfileView = 'ReadProfileView',
  EditProfile = 'EditProfile',

  // Wallet Actions
  ConnectWallet = 'ConnectWallet',

  // Account Actions
  ManageAccount = 'ManageAccount',

  // Add any additional specific actions as needed
}

/**
 * Interface for Feature Metadata
 */
export interface FeatureMetadata {
  category: FeatureCategory;
  icon: LucideIcon; // Updated typing;
  label: string;
  href: string;
  description: string;
  isInProd: boolean;
  resourceName: string; // Maps to the resource in dataFetching.ts
  maxResourceCount?: number[]; // [FREE, PRO, ENTERPRISE]
  children?: Feature[]; // Added to support nested features
}

/**
 * Interface for Feature Actions
 */
export interface FeatureAction {
  actionKey: ActionFeatureKey;
  action: 'read' | 'create' | 'edit' | 'delete'; // Define allowed actions
  baseTier: SubscriptionTier;
  resourceLimits: number[]; // [FREE limit, PRO limit, ENTERPRISE limit]
  creditCost: number; // Credits consumed per action
}


/**
 * Interface for a Feature
 */
export interface Feature {
  key: FeatureKey;
  metadata: FeatureMetadata;
  actions: FeatureAction[];
}

/**
 * Helper function to capitalize the first letter of a string
 * @param str - The string to capitalize
 * @returns The string with the first letter capitalized
 */
function capitalizeFirstLetter(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Helper function to generate combined keys for permissions and credits
 * Ensures the action's first letter is capitalized
 * @param featureKey - The feature key
 * @param action - The action (e.g., 'create', 'read')
 * @returns The combined key (e.g., 'CreateGoal')
 */
export function getActionKey(featureKey: string, action: string): string {
  const capitalizedAction = capitalizeFirstLetter(action);
  return `${capitalizedAction}${featureKey}`;
}

/**
 * Unified Feature Configuration
 */
export const features: Feature[] = [
  // Dashboard Features
  {
    key: FeatureKey.UserActions,
    metadata: {
      category: FeatureCategory.Dashboard,
      icon: MousePointer2,
      label: 'Usage',
      href: '/settings/usage',
      description: 'View Past Activity.',
      isInProd: false,
      resourceName: 'user_actions',
      // No maxResourceCount needed if not limiting total resources
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadUserAction,
        action: 'read',
        baseTier: SubscriptionTier.FREE,
        resourceLimits: [-1, -1, -1],
        creditCost: 0,
      },
      {
        actionKey: ActionFeatureKey.CreateUserAction,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [-1, -1, -1],
        creditCost: 0,
      },
      {
        actionKey: ActionFeatureKey.EditUserAction,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 0, 0],
        creditCost: 0,
      },
      {
       actionKey: ActionFeatureKey.DeleteUserAction,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [0, 0, 0],
        creditCost: 0,
      },
    ],
  },
  {
    key: FeatureKey.Recommendations,
    metadata: {
      category: FeatureCategory.Dashboard,
      icon: ThumbsUp,
      label: 'Recommendations',
      href: '/dashboard/recommendations',
      description: 'View recommendations.',
      isInProd: false,
      resourceName: 'recommendations',
      // No maxResourceCount needed if not limiting total resources
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadRecommendation,
        action: 'read',
        baseTier: SubscriptionTier.FREE,
        resourceLimits: [5, 25, 100],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateRecommendation,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [2, 10, 50],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditRecommendation,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [2, 10, 50],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteRecommendation,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [1, 5, 20],
        creditCost: 3,
      },
    ],
  },  
  {
    key: FeatureKey.Analytics,
    metadata: {
      category: FeatureCategory.Dashboard,
      icon: LineChart,
      label: 'Analytics',
      href: '/dashboard/analytics',
      description: 'View analytics statistics.',
      isInProd: true,
      resourceName: 'agents',
    },
    actions: [
      { actionKey: ActionFeatureKey.ReadStatistic, action: 'read', baseTier: SubscriptionTier.FREE, resourceLimits: [10, 50, 200], creditCost: 1 },
      { actionKey: ActionFeatureKey.CreateStatistic, action: 'create', baseTier: SubscriptionTier.PRO, resourceLimits: [5, 25, 100], creditCost: 2 },
      { actionKey: ActionFeatureKey.EditStatistic, action: 'edit', baseTier: SubscriptionTier.PRO, resourceLimits: [5, 25, 100], creditCost: 2 },
      { actionKey: ActionFeatureKey.DeleteStatistic, action: 'delete', baseTier: SubscriptionTier.ENTERPRISE, resourceLimits: [2, 10, 50], creditCost: 3 },
    ],
  },
  {
    key: FeatureKey.Alerts,
    metadata: {
      category: FeatureCategory.Dashboard,
      icon: AlertTriangle,
      label: 'Alerts',
      href: '/dashboard/alerts',
      description: 'Manage alert notifications.',
      isInProd: true,
      resourceName: 'alerts',
    },
    actions: [
      { actionKey: ActionFeatureKey.ReadAlert, action: 'read', baseTier: SubscriptionTier.FREE, resourceLimits: [5, 20, 100], creditCost: 1 },
      { actionKey: ActionFeatureKey.CreateAlert, action: 'create', baseTier: SubscriptionTier.PRO, resourceLimits: [2, 10, 50], creditCost: 2 },
      { actionKey: ActionFeatureKey.EditAlert, action: 'edit', baseTier: SubscriptionTier.PRO, resourceLimits: [2, 10, 50], creditCost: 2 },
      { actionKey: ActionFeatureKey.DeleteAlert, action: 'delete', baseTier: SubscriptionTier.ENTERPRISE, resourceLimits: [1, 5, 20], creditCost: 3 },
    ],
  },



  // Strategy Features
  {
    key: FeatureKey.Goals,
    metadata: {
      category: FeatureCategory.Strategy,
      icon: Target,
      label: 'Goals',
      href: '/strategy/goals',
      description: 'Define the objectives for your organization.',
      isInProd: true,
      resourceName: 'goals',
      maxResourceCount: [2, 5, 15],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadGoal,
        action: 'read',
        baseTier: SubscriptionTier.FREE,
        resourceLimits: [2, 5, 15],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateGoal,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [1, 3, 10],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditGoal,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [1, 3, 10],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteGoal,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [0, 1, 5],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.Personas,
    metadata: {
      category: FeatureCategory.Strategy,
      icon: UserPlus,
      label: 'Personas',
      href: '/strategy/personas',
      description: 'Define target personas.',
      isInProd: true,
      resourceName: 'persona',
    },
    actions: [
      { actionKey: ActionFeatureKey.ReadPersona, action: 'read', baseTier: SubscriptionTier.FREE, resourceLimits: [10, 50, 200], creditCost: 1 },
      { actionKey: ActionFeatureKey.CreatePersona, action: 'create', baseTier: SubscriptionTier.PRO, resourceLimits: [5, 25, 100], creditCost: 2 },
      { actionKey: ActionFeatureKey.EditPersona, action: 'edit', baseTier: SubscriptionTier.PRO, resourceLimits: [5, 25, 100], creditCost: 2 },
      { actionKey: ActionFeatureKey.DeletePersona, action: 'delete', baseTier: SubscriptionTier.ENTERPRISE, resourceLimits: [2, 10, 50], creditCost: 3 },
    ],
  },
  {
    key: FeatureKey.Issues,
    metadata: {
      category: FeatureCategory.Strategy,
      icon: Lightbulb,
      label: 'Strategic Issues',
      href: '/strategy/issues',
      description: 'Manage strategic issues.',
      isInProd: true,
      resourceName: 'issues',
      maxResourceCount: [0, 5, 15],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadIssue,
        action: 'read',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 5, 15],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateIssue,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 3, 10],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditIssue,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 3, 10],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteIssue,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [0, 1, 5],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.BusinessModel,
    metadata: {
      category: FeatureCategory.Strategy,
      icon: Building,
      label: 'Business Model',
      href: '/strategy/plan',
      description: 'Manage business models.',
      isInProd: true,
      resourceName: 'business_model_cards',
      maxResourceCount: [1, 5, 15],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadBusinessModel,
        action: 'read',
        baseTier: SubscriptionTier.FREE,
        resourceLimits: [1, 5, 15],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateBusinessModel,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [1, 3, 10],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditBusinessModel,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [1, 3, 10],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteBusinessModel,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [0, 1, 5],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.Branding,
    metadata: {
      category: FeatureCategory.Strategy,
      icon: Fingerprint,
      label: 'Brand Identity',
      href: '/strategy/branding',
      description: 'Manage branding models.',
      isInProd: true,
      resourceName: 'brand_model_cards',
      maxResourceCount: [3, 10, 30],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadBranding,
        action: 'read',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 5, 15],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateBranding,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 3, 10],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditBranding,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 3, 10],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteBranding,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [0, 1, 5],
        creditCost: 3,
      },
    ],
  },

  // Models Features
  {
    key: FeatureKey.Models,
    metadata: {
      category: FeatureCategory.Models,
      icon: Box,
      label: 'Models',
      href: '/models/library',
      description: 'Explore your AI models.',
      isInProd: true,
      resourceName: 'models',
      maxResourceCount: [10, 100, 1000],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadModel,
        action: 'read',
        baseTier: SubscriptionTier.FREE,
        resourceLimits: [10, 100, 1000],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateModel,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [5, 50, 500],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditModel,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [5, 50, 500],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteModel,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [2, 20, 200],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.ModelSubjects,
    metadata: {
      category: FeatureCategory.Models,
      icon: FileBox,
      label: 'Model Subjects',
      href: '/models/model-subjects',
      description: 'Define model subjects.',
      isInProd: true,
      resourceName: 'model_subjects',
    },
    actions: [
      { actionKey: ActionFeatureKey.ReadModelSubject, action: 'read', baseTier: SubscriptionTier.FREE, resourceLimits: [10, 50, 200], creditCost: 1 },
      { actionKey: ActionFeatureKey.CreateModelSubject, action: 'create', baseTier: SubscriptionTier.PRO, resourceLimits: [5, 25, 100], creditCost: 2 },
      { actionKey: ActionFeatureKey.EditModelSubject, action: 'edit', baseTier: SubscriptionTier.PRO, resourceLimits: [5, 25, 100], creditCost: 2 },
      { actionKey: ActionFeatureKey.DeleteModelSubject, action: 'delete', baseTier: SubscriptionTier.ENTERPRISE, resourceLimits: [2, 10, 50], creditCost: 3 },
    ],
  },
  {
    key: FeatureKey.ModelTrainings,
    metadata: {
      category: FeatureCategory.Models,
      icon: Rocket,
      label: 'Model Trainings',
      href: '/models/model-trainings',
      description: 'Manage model training sessions.',
      isInProd: true,
      resourceName: 'model_training',
    },
    actions: [
      { actionKey: ActionFeatureKey.ReadModelTraining, action: 'read', baseTier: SubscriptionTier.FREE, resourceLimits: [10, 50, 200], creditCost: 1 },
      { actionKey: ActionFeatureKey.CreateModelTraining, action: 'create', baseTier: SubscriptionTier.PRO, resourceLimits: [5, 25, 100], creditCost: 2 },
      { actionKey: ActionFeatureKey.EditModelTraining, action: 'edit', baseTier: SubscriptionTier.PRO, resourceLimits: [5, 25, 100], creditCost: 2 },
      { actionKey: ActionFeatureKey.DeleteModelTraining, action: 'delete', baseTier: SubscriptionTier.ENTERPRISE, resourceLimits: [2, 10, 50], creditCost: 3 },
    ],
  },
  {
    key: FeatureKey.UseCases,
    metadata: {
      category: FeatureCategory.Strategy,
      icon: AlertTriangle,
      label: 'Safety',
      href: '/strategy/use-cases',
      description: 'Set the practical applications for your AI models and products.',
      isInProd: true,
      resourceName: 'use_cases',
      maxResourceCount: [0, 5, 15],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadUseCase,
        action: 'read',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 5, 15],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateUseCase,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 3, 10],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditUseCase,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 3, 10],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteUseCase,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [0, 1, 5],
        creditCost: 3,
      },
    ],
  },
  // Knowledge Bank Features
  {
    key: FeatureKey.Connectors,
    metadata: {
      category: FeatureCategory.KnowledgeBank,
      icon: Link,
      label: 'Connectors',
      href: '/assets/connectors',
      description: 'Manage data connectors.',
      isInProd: true,
      resourceName: 'connectors',
      maxResourceCount: [1, 5, 15],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadConnector,
        action: 'read',
        baseTier: SubscriptionTier.FREE,
        resourceLimits: [1, 5, 15],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateConnector,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [1, 3, 10],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditConnector,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [1, 3, 10],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteConnector,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [0, 1, 5],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.Topics,
    metadata: {
      category: FeatureCategory.KnowledgeBank,
      icon: Book,
      label: 'Topics',
      href: '/assets/topics',
      description: 'Organize your topics.',
      isInProd: true,
      resourceName: 'topics',
      maxResourceCount: [0, 10, 100],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadTopic,
        action: 'read',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 10, 100],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateTopic,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 5, 50],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditTopic,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 5, 50],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteTopic,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [0, 2, 20],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.InfoAssets,
    metadata: {
      category: FeatureCategory.KnowledgeBank,
      icon: Info,
      label: 'Info Assets',
      href: '/assets/inventory',
      description: 'Manage information assets.',
      isInProd: true,
      resourceName: 'info_assets',
      maxResourceCount: [5, 100, 1000],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadInfoAsset,
        action: 'read',
        baseTier: SubscriptionTier.FREE,
        resourceLimits: [5, 100, 1000],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateInfoAsset,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [5, 50, 500],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditInfoAsset,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [5, 50, 500],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteInfoAsset,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [3, 30, 300],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.Policies,
    metadata: {
      category: FeatureCategory.KnowledgeBank,
      icon: Shield,
      label: 'Policies',
      href: '/assets/policies',
      description: 'Manage organizational policies.',
      isInProd: true,
      resourceName: 'policies',
      maxResourceCount: [0, 10, 100],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadPolicy,
        action: 'read',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 10, 100],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreatePolicy,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 5, 50],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditPolicy,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 5, 50],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeletePolicy,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [0, 2, 20],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.Terms,
    metadata: {
      category: FeatureCategory.KnowledgeBank,
      icon: BookLock,
      label: 'Terms',
      href: '/assets/terms',
      description: 'Manage terms and conditions.',
      isInProd: true,
      resourceName: 'data_category',
      maxResourceCount: [0, 10, 100],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadTerm,
        action: 'read',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 10, 100],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateTerm,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 5, 50],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditTerm,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 5, 50],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteTerm,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [0, 2, 20],
        creditCost: 3,
      },
    ],
  },

  // Marketplace Features
  {
    key: FeatureKey.Messages,
    metadata: {
      category: FeatureCategory.Marketplace,
      icon: MessageCircle,
      label: 'Messages',
      href: '/deals/messages',
      description: 'Manage your messages.',
      isInProd: false,
      resourceName: 'messages',
      maxResourceCount: [3, 100, 100],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadMessage,
        action: 'read',
        baseTier: SubscriptionTier.FREE,
        resourceLimits: [3, 100, 100],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateMessage,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [1, 50, 50],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditMessage,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [1, 50, 50],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteMessage,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [1, 10, 10],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.Offers,
    metadata: {
      category: FeatureCategory.Marketplace,
      icon: Gift,
      label: 'Offers',
      href: '/deals/offers',
      description: 'Manage your offers.',
      isInProd: false,
      resourceName: 'offers',
      maxResourceCount: [3, 100, 100],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadOffer,
        action: 'read',
        baseTier: SubscriptionTier.FREE,
        resourceLimits: [3, 100, 100],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateOffer,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [1, 50, 50],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditOffer,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [1, 50, 50],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteOffer,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [1, 10, 10],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.Calendar,
    metadata: {
      category: FeatureCategory.Workflows,
      icon: Calendar,
      label: 'Calendar',
      href: '/workflows/calendar',
      description: 'Schedule and manage your events.',
      isInProd: true,
      resourceName: 'scheduled_events',
      maxResourceCount: [0, 50, 500],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadScheduledEvent,
        action: 'read',
        baseTier: SubscriptionTier.FREE,
        resourceLimits: [0, 50, 500],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateScheduledEvent,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 20, 200],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditScheduledEvent,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 20, 200],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteScheduledEvent,
        action: 'delete',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 10, 100],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.Transactions,
    metadata: {
      category: FeatureCategory.Marketplace,
      icon: User,
      label: 'Transactions',
      href: '/deals/transactions',
      description: 'Manage your contacts.',
      isInProd: false,
      resourceName: 'transactions',
      maxResourceCount: [3, 100, 100],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadTransaction,
        action: 'read',
        baseTier: SubscriptionTier.PRO, // As per user list: 'readContacts', PRO
        resourceLimits: [3, 100, 100],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateTransaction,
        action: 'create',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [1, 50, 50],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditTransaction,
        action: 'edit',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [1, 50, 50],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteTransaction,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [1, 10, 10],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.Contracts,
    metadata: {
      category: FeatureCategory.Marketplace,
      icon: ClipboardList,
      label: 'Contracts',
      href: '/deals/contracts',
      description: 'Manage your contracts.',
      isInProd: true,
      resourceName: 'contracts',
      maxResourceCount: [1, 5, 100],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadContract,
        action: 'read',
        baseTier: SubscriptionTier.FREE,
        resourceLimits: [1, 5, 100],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateContract,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [1, 3, 50],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditContract,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [1, 3, 50],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteContract,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [1, 5, 20],
        creditCost: 3,
      },
    ],
  },

  // Campaigns Features
  {
    key: FeatureKey.Workflows,
    metadata: {
      category: FeatureCategory.Workflows,
      icon: Library,
      label: 'Library',
      href: '/workflows/library',
      description: 'Manage your workflows.',
      isInProd: false,
      resourceName: 'workflows',
      maxResourceCount: [0, 10, 100],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadWorkflow,
        action: 'read',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 10, 100],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateWorkflow,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 5, 50],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditWorkflow,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 5, 50],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteWorkflow,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [0, 2, 20],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.Tasks,
    metadata: {
      category: FeatureCategory.Workflows,
      icon: CheckSquare,
      label: 'Tasks',
      href: '/workflows/tasks',
      description: 'Manage your tasks.',
      isInProd: false,
      resourceName: 'tasks',
      maxResourceCount: [0, 10, 100],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadTask,
        action: 'read',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 10, 100],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateTask,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 5, 50],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditTask,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 5, 50],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteTask,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [0, 2, 20],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.Agents,
    metadata: {
      category: FeatureCategory.Workflows,
      icon: User,
      label: 'Agents',
      href: '/workflows/agents',
      description: 'Manage agents within workflows.',
      isInProd: true,
      resourceName: 'agents',
    },
    actions: [
      { actionKey: ActionFeatureKey.ReadAgent, action: 'read', baseTier: SubscriptionTier.FREE, resourceLimits: [10, 50, 200], creditCost: 1 },
      { actionKey: ActionFeatureKey.CreateAgent, action: 'create', baseTier: SubscriptionTier.PRO, resourceLimits: [5, 25, 100], creditCost: 2 },
      { actionKey: ActionFeatureKey.EditAgent, action: 'edit', baseTier: SubscriptionTier.PRO, resourceLimits: [5, 25, 100], creditCost: 2 },
      { actionKey: ActionFeatureKey.DeleteAgent, action: 'delete', baseTier: SubscriptionTier.ENTERPRISE, resourceLimits: [2, 10, 50], creditCost: 3 },
    ],
  },
  // Profiles Features
  {
    key: FeatureKey.ProfileAthletes,
    metadata: {
      category: FeatureCategory.Profiles,
      icon: User,
      label: 'Profile Athletes',
      href: '/profiles/athletes',
      description: 'Manage athlete profiles.',
      isInProd: true,
      resourceName: 'profile_athletes',
      maxResourceCount: [10, 100, 1000],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadProfileAthlete,
        action: 'read',
        baseTier: SubscriptionTier.FREE,
        resourceLimits: [10, 100, 1000],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateProfileAthlete,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [5, 50, 500],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditProfileAthlete,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [5, 50, 500],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteProfileAthlete,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [2, 20, 200],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.ProfileContracts,
    metadata: {
      category: FeatureCategory.Profiles,
      icon: ClipboardList,
      label: 'Profile Contracts',
      href: '/profiles/contracts',
      description: 'Manage contract profiles.',
      isInProd: true,
      resourceName: 'profile_contracts',
      maxResourceCount: [10, 100, 1000],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadProfileContract,
        action: 'read',
        baseTier: SubscriptionTier.FREE,
        resourceLimits: [10, 100, 1000],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateProfileContract,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [5, 50, 500],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditProfileContract,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [5, 50, 500],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteProfileContract,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [2, 20, 200],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.ProfileModels,
    metadata: {
      category: FeatureCategory.Profiles,
      icon: LayoutDashboard,
      label: 'Profile Models',
      href: '/profiles/models',
      description: 'Manage model profiles.',
      isInProd: true,
      resourceName: 'profile_models',
      maxResourceCount: [10, 100, 1000],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadProfileModel,
        action: 'read',
        baseTier: SubscriptionTier.FREE,
        resourceLimits: [10, 100, 1000],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateProfileModel,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [5, 50, 500],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditProfileModel,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [5, 50, 500],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteProfileModel,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [2, 20, 200],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.ProfileBrands,
    metadata: {
      category: FeatureCategory.Profiles,
      icon: Briefcase,
      label: 'Profile Brands',
      href: '/profiles/brands',
      description: 'Manage brand profiles.',
      isInProd: true,
      resourceName: 'profile_brands',
      maxResourceCount: [10, 100, 1000],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadProfileBrand,
        action: 'read',
        baseTier: SubscriptionTier.FREE,
        resourceLimits: [10, 100, 1000],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateProfileBrand,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [5, 50, 500],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditProfileBrand,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [5, 50, 500],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteProfileBrand,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [2, 20, 200],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.ProfileUsers,
    metadata: {
      category: FeatureCategory.Profiles,
      icon: User,
      label: 'Profile Users',
      href: '/profiles/users',
      description: 'Manage user profiles.',
      isInProd: false,
      resourceName: 'profile_users',
      maxResourceCount: [0, 100, 1000],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadProfileUser,
        action: 'read',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [0, 100, 1000],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateProfileUser,
        action: 'create',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [0, 50, 500],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditProfileUser,
        action: 'edit',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [0, 50, 500],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteProfileUser,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [0, 20, 200],
        creditCost: 3,
      },
    ],
  },

  // Searchable Features
  {
    key: FeatureKey.SearchableAthletes,
    metadata: {
      category: FeatureCategory.Search,
      icon: ZoomIn,
      label: 'Athletes',
      href: '/search/athletes',
      description: 'Search through athlete profiles.',
      isInProd: true,
      resourceName: 'searchable_athletes',
      maxResourceCount: [100, 1000, 10000],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadSearchableAthlete,
        action: 'read',
        baseTier: SubscriptionTier.FREE,
        resourceLimits: [100, 1000, 10000],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateSearchableAthlete,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [50, 500, 5000],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditSearchableAthlete,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [50, 500, 5000],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteSearchableAthlete,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [20, 200, 2000],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.SearchableContracts,
    metadata: {
      category: FeatureCategory.Search,
      icon: ClipboardList,
      label: 'Contracts',
      href: '/search/contracts',
      description: 'Search through contract documents.',
      isInProd: true,
      resourceName: 'contracts',
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
        actionKey: ActionFeatureKey.EditSearchableContract,
        action: 'edit',
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
  },
  {
    key: FeatureKey.SearchableModels,
    metadata: {
      category: FeatureCategory.Search,
      icon: PackageSearch,
      label: 'Models',
      href: '/search/models',
      description: 'Search through AI models.',
      isInProd: true,
      resourceName: 'complete_trained_models',
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
        actionKey: ActionFeatureKey.EditSearchableModel,
        action: 'edit',
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
  },
  {
    key: FeatureKey.SearchableBrands,
    metadata: {
      category: FeatureCategory.Search,
      icon: Briefcase,
      label: 'Brands',
      href: '/search/brands',
      description: 'Search through brand profiles.',
      isInProd: true,
      resourceName: 'brands',
      maxResourceCount: [100, 1000, 10000],
    },
    actions: [
      {
       actionKey: ActionFeatureKey.ReadSearchableBrand,
        action: 'read',
        baseTier: SubscriptionTier.FREE,
        resourceLimits: [100, 1000, 10000],
        creditCost: 1,
      },
      {
        actionKey: ActionFeatureKey.CreateSearchableBrand,
        action: 'create',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [50, 500, 5000],
        creditCost: 2,
      },
      {
        actionKey: ActionFeatureKey.EditSearchableBrand,
        action: 'edit',
        baseTier: SubscriptionTier.PRO,
        resourceLimits: [50, 500, 5000],
        creditCost: 2,
      },
      {
       actionKey: ActionFeatureKey.DeleteSearchableBrand,
        action: 'delete',
        baseTier: SubscriptionTier.ENTERPRISE,
        resourceLimits: [20, 200, 2000],
        creditCost: 3,
      },
    ],
  },
  {
    key: FeatureKey.SearchableUsers,
    metadata: {
      category: FeatureCategory.Search,
      icon: User,
      label: 'Users',
      href: '/search/users',
      description: 'Search through user profiles.',
      isInProd: false,
      resourceName: 'users',
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
        actionKey: ActionFeatureKey.EditSearchableUser,
        action: 'edit',
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
  },
];
