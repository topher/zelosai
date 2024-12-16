// // config/featureRoutes.ts

// import { FeatureKey } from '@/lib/features';
// import {
//   LayoutDashboard,
//   Briefcase,
//   ImageIcon,
//   Database,
//   Workflow,
//   Search,
//   Settings,
//   QrCode,
//   Link,
//   Book,
//   Info,
//   Folder,
//   Cog,
//   BarChart,
//   Shield,
//   Tag,
//   CheckCircle,
//   User,
//   ZoomIn,
//   Target, // Replacing Bullseye
//   Lightbulb,
//   UserPlus, // Replacing UserTie
//   Layers,
//   ThumbsUp,
//   CheckSquare, // Replacing Tasks
//   Unlock,
//   ClipboardList,
//   FileText,
//   AlertTriangle, // Replacing ExclamationTriangle
//   Building,
//   MessageCircle,
//   Gift,
// } from 'lucide-react';

// // Define the types for Feature and Category
// export type FeatureCategory =
//   | 'knowledgeBank'
//   | 'models'
//   | 'profiles'
//   | 'strategy'
//   | 'dashboard'
//   | 'campaigns'
//   | 'deals'
//   | 'search';

// export type Feature = {
//   color?: any;
//   label: string;
//   href: string;
//   description: string;
//   icon: React.ElementType;
//   featureKey?: string; // Added featureKey
// };

// export type Category = {
//   category: FeatureCategory;
//   label: string;
//   icon: React.ElementType;
//   color: string;
//   children: Feature[];
// };

// // config/featureRoutes.ts
// export const getFeatureKeyFromPathname = (pathname: string): FeatureKey | undefined => {
//   for (const category of featureRoutes) {
//     for (const feature of category.children) {
//       if (feature.href === pathname) {
//         return feature.featureKey;
//       }
//     }
//   }
//   return undefined; // Return undefined if no matching featureKey is found
// };


// // Define the featureRoutes array
// export const featureRoutes: Category[] = [
//   {
//     category: 'dashboard',
//     label: 'Dashboard',
//     icon: LayoutDashboard,
//     color: 'text-gray-500',
//     children: [
//       {
//         label: 'Recommendations',
//         href: '/dashboard/recommendations',
//         description: 'View recommendations.',
//         icon: ThumbsUp,
//         featureKey: 'recommendations', // Corresponds to `dashboard.recommendations`
//       },
//     ],
//   },
//   {
//     category: 'strategy',
//     label: 'Strategy',
//     icon: Briefcase,
//     color: 'text-blue-500',
//     children: [
//       {
//         label: 'Goals',
//         href: '/strategy/goals',
//         description: 'Define the objectives for your organization.',
//         icon: Target, // Replacing Bullseye
//         featureKey: 'readGoal', // Corresponds to `strategy.goals`
//       },
//       {
//         label: 'Use Cases',
//         href: '/strategy/use-cases',
//         description: 'Set the practical applications for your AI models and products.',
//         icon: Lightbulb,
//         featureKey: 'readUseCase', // Corresponds to `strategy.useCases`
//       },
//       {
//         label: 'Agents',
//         href: '/strategy/agents',
//         description: 'Identify potential challenges to your AI strategy.',
//         icon: UserPlus, // Replacing UserTie
//         featureKey: 'readAgents', // Corresponds to `strategy.agents`
//       },
//       {
//         label: 'Issues',
//         href: '/strategy/issues',
//         description: 'Manage strategic issues.',
//         icon: AlertTriangle, // Replacing ExclamationTriangle
//         featureKey: 'readstrategicIssues', // Corresponds to `strategy.strategicIssues`
//       },
//       {
//         label: 'Business Model',
//         href: '/strategy/business-model-cards',
//         description: 'Manage business model cards.',
//         icon: Building,
//         featureKey: 'readbusinessModelCards', // Corresponds to `strategy.businessModelCards`
//       },
//       {
//         label: 'Branding',
//         href: '/strategy/brand-model-cards',
//         description: 'Manage brand model cards.',
//         icon: Building,
//         featureKey: 'readBrandingCard', // Corresponds to `strategy.brandModelCards`
//       },
//       // {
//       //   label: 'Facets',
//       //   href: '/strategy/facets',
//       //   description: 'Manage facets.',
//       //   icon: Layers,
//       //   featureKey: 'facetsPerBrandingCardType', // Corresponds to `strategy.facetsPerBrandingCardType`
//       // },
//     ],
//   },
//   {
//     category: 'models',
//     label: 'Models',
//     icon: ImageIcon,
//     color: 'text-green-500',
//     children: [
//       {
//         label: 'Library',
//         href: '/models/library',
//         description: 'Explore your AI models.',
//         icon: LayoutDashboard,
//         featureKey: 'accessDefault', // Corresponds to `models.accessDefault`
//       },
//       {
//         label: 'Custom Models',
//         href: '/models/custom',
//         description: 'Create custom AI models.',
//         icon: Briefcase,
//         featureKey: 'customModels', // Corresponds to `models.customModels`
//       },
//       // {
//       //   label: 'Usage',
//       //   href: '/models/usage',
//       //   description: 'Monitor AI model usage.',
//       //   icon: BarChart,
//       //   featureKey: 'usage', // Corresponds to `models.usage`
//       // },
//       // {
//       //   label: 'Safety',
//       //   href: '/models/safety',
//       //   description: 'Ensure model safety and compliance.',
//       //   icon: Shield,
//       //   featureKey: 'safety', // Corresponds to `models.safety`
//       // },
//       // {
//       //   label: 'Categories',
//       //   href: '/models/categories',
//       //   description: 'Manage model categories.',
//       //   icon: Tag,
//       //   featureKey: 'userDefinedModelCategories', // Corresponds to `models.userDefinedModelCategories`
//       // },
//       // {
//       //   label: 'Completed Models',
//       //   href: '/models/complete',
//       //   description: 'View completed AI models.',
//       //   icon: CheckCircle,
//       //   featureKey: 'completeTrainedModels', // Corresponds to `models.completeTrainedModels`
//       // },
//     ],
//   },
//   {
//     category: 'knowledgeBank',
//     label: 'Knowledge Bank',
//     icon: Database,
//     color: 'text-yellow-500',
//     children: [
//       {
//         label: 'Connectors',
//         href: '/assets/connectors',
//         description: 'Manage data connectors.',
//         icon: Link,
//         featureKey: 'connectors', // Corresponds to `knowledgeBank.connectors`
//       },
//       {
//         label: 'Topics',
//         href: '/assets/topics',
//         description: 'Organize your topics.',
//         icon: Book,
//         featureKey: 'topics', // Corresponds to `knowledgeBank.topics`
//       },
//       {
//         label: 'Info Assets',
//         href: '/assets/info-assets',
//         description: 'Manage informational assets.',
//         icon: Info,
//         featureKey: 'infoAssets', // Corresponds to `knowledgeBank.infoAssets`
//       },
//     ],
//   },
//   // {
//   //   category: 'profiles',
//   //   label: 'Profiles',
//   //   icon: User,
//   //   color: 'text-purple-500',
//   //   children: [
//   //     {
//   //       label: 'Search',
//   //       href: '/profiles/search',
//   //       description: 'Search for profiles.',
//   //       icon: Search,
//   //       featureKey: 'viewsInSearch', // Corresponds to `profiles.viewsInSearch`
//   //     },
//   //     {
//   //       label: 'Visited',
//   //       href: '/profiles/visited',
//   //       description: 'View visited profiles.',
//   //       icon: User,
//   //       featureKey: 'visitedProfiles', // Corresponds to `profiles.visitedProfiles`
//   //     },
//   //     {
//   //       label: 'View Profiles',
//   //       href: '/profiles/view',
//   //       description: 'Full profile view.',
//   //       icon: User,
//   //       featureKey: 'viewsInSearch', // Assuming 'View Profiles' relates to `profiles.viewsInSearch`
//   //     },
//   //     {
//   //       label: 'Save Profiles',
//   //       href: '/profiles/save',
//   //       description: 'Save profiles for later.',
//   //       icon: User,
//   //       featureKey: 'savingProfiles', // Corresponds to `profiles.savingProfiles`
//   //     },
//   //   ],
//   // },
//   {
//     category: 'deals',
//     label: 'Marketplace',
//     icon: Database,
//     color: 'text-orange-500',
//     children: [
//       {
//         label: 'Messages',
//         href: '/deals/messages',
//         description: 'View and manage your messages.',
//         icon: MessageCircle, // Corrected from 'LucideMessageCircle' to 'MessageCircle'
//         featureKey: 'messages', // Corresponds to `deals.messages`
//       },
//       {
//         label: 'Offers',
//         href: '/deals/offers',
//         description: 'View and manage your offers.',
//         icon: Gift, // Corrected from 'LucideGift' to 'Gift'
//         featureKey: 'offers', // Corresponds to `deals.offers`
//       },
//       {
//         label: 'Requests',
//         href: '/deals/requests',
//         description: 'View and manage your requests.',
//         icon: ClipboardList, // Corrected from 'LucideClipboardList' to 'ClipboardList'
//         featureKey: 'requests', // Corresponds to `deals.requests`
//       },
//       {
//         label: 'CRM',
//         href: '/deals/crm',
//         description: 'Manage your CRM.',
//         icon: Briefcase,
//         featureKey: 'crm', // Corresponds to `deals.crm`
//       },
//       {
//         label: 'Contracts',
//         href: '/deals/contracts',
//         description: 'Manage your contracts.',
//         icon: FileText, // Corrected from 'LucideFileText' to 'FileText'
//         featureKey: 'contracts', // Corresponds to `deals.contracts`
//       },
//     ],
//   },
//   {
//     category: 'campaigns',
//     label: 'Campaigns',
//     icon: Workflow,
//     color: 'text-red-500',
//     children: [
//       {
//         label: 'Access',
//         href: '/campaigns',
//         description: 'Access campaigns.',
//         icon: Unlock,
//         featureKey: 'access', // Corresponds to `campaigns.access`
//       },
//       {
//         label: 'Workflows',
//         href: '/campaigns/workflows',
//         description: 'Manage workflows.',
//         icon: CheckSquare, // Replacing Tasks
//         featureKey: 'workflows', // Corresponds to `campaigns.workflows`
//       },
//     ],
//   },
//   {
//     category: 'search',
//     label: 'Search',
//     icon: Search,
//     color: 'text-purple-500',
//     children: [
//       {
//         label: 'Athletes',
//         href: '/search/athletes',
//         description: 'Discover athletes and their profiles.',
//         icon: ZoomIn, // Replacing 'Zoom'
//         featureKey: 'athletes', // Corresponds to `search.athletes`
//       },
//       {
//         label: 'Contracts',
//         href: '/search/contracts',
//         description: 'Find contracts that suit your business needs.',
//         icon: ZoomIn,
//         featureKey: 'contracts', // Corresponds to `search.contracts`
//       },
//       {
//         label: 'Models',
//         href: '/search/models',
//         description: 'Search for existing AI models to determine which one is right for you.',
//         icon: ZoomIn,
//         featureKey: 'models', // Corresponds to `search.models`
//       },
//       {
//         label: 'Brands',
//         href: '/search/brands',
//         description: 'Search for existing AI models to determine which one is right for you.',
//         icon: ZoomIn,
//         featureKey: 'brands', // Corresponds to `search.brands`
//       },
//     ],
//   },
// ];
