// config/features/index.ts

import { Feature, FeatureKey } from '@/config/featuresConfig';

// Import all feature configurations with lowercase first letters
import { agentsFeature } from './AgentsFeature';
import { alertsFeature } from './AlertsFeature';
import { analyticsFeature } from './AnalyticsFeature';
import { brandingFeature } from './BrandingFeature';
import { businessModelFeature } from './BusinessModelCardsFeature';
import { connectorsFeature } from './ConnectorsFeature';
import { contractsFeature } from './ContractsFeature';
import { calendarFeature } from './CalendarFeature';
import { modelGenerationFeature } from './ModelGenerationFeature';
import { termsFeature } from './DataCategoryFeature';
import { goalsFeature } from './GoalsFeature';
import { infoAssetsFeature } from './InfoAssetsFeature';
import { issuesFeature } from './IssuesFeature';
import { messagesFeature } from './MessagesFeature';
import { modelSubjectsFeature } from './ModelSubjectsFeature';
import { modelTrainingsFeature } from './ModelTrainingsFeature';
import { modelsFeature } from './ModelsFeature';
import { offersFeature } from './OffersFeature';
import { personasFeature } from './PersonasFeature';
import { policiesFeature } from './PoliciesFeature';
import { profileAthletesFeature } from './ProfileAthletesFeature';
import { profileBrandsFeature } from './ProfileBrandsFeature';
import { profileContractsFeature } from './ProfileContractsFeature';
import { profileModelsFeature } from './ProfileModelsFeature';
import { profileUsersFeature } from './ProfileUsersFeature';
import { recommendationsFeature } from './RecommendationsFeature';
import { searchableAthletesFeature } from "./SearchableAthletesFeature";
import { searchableBrandsFeature } from "./SearchableBrandsFeature";
import { searchableContractsFeature } from "./SearchableContractsFeature";
import { searchableModelsFeature } from "./SearchableModelsFeature";
import { searchableUsersFeature } from "./SearchableUsersFeature";
import { tasksFeature } from './TasksFeature';
import { topicsFeature } from './TopicsFeature';
import { transactionsFeature } from './TransactionsFeature';
import { workflowsFeature } from './WorkflowsFeature';

import { userActionsFeature } from './UserActionsFeature';
import { useCasesFeature } from './UseCasesFeature';
import { triplesFeature } from './Triples';

// Assemble the features object
export const features: Record<FeatureKey, Feature> = {
  [FeatureKey.Agents]: agentsFeature,
  [FeatureKey.Alerts]: alertsFeature,
  [FeatureKey.Analytics]: analyticsFeature,
  [FeatureKey.Branding]: brandingFeature,
  [FeatureKey.BusinessModel]: businessModelFeature,
  [FeatureKey.Connectors]: connectorsFeature,
  [FeatureKey.Contracts]: contractsFeature,
  [FeatureKey.Terms]: termsFeature,
  [FeatureKey.Goals]: goalsFeature,
  [FeatureKey.InfoAssets]: infoAssetsFeature,
  [FeatureKey.Issues]: issuesFeature,
  [FeatureKey.Messages]: messagesFeature,
  [FeatureKey.ModelSubjects]: modelSubjectsFeature,
  [FeatureKey.Models]: modelsFeature,
  [FeatureKey.Offers]: offersFeature,
  [FeatureKey.Personas]: personasFeature,
  [FeatureKey.Policies]: policiesFeature,
  [FeatureKey.ProfileAthletes]: profileAthletesFeature,
  [FeatureKey.ProfileBrands]: profileBrandsFeature,
  [FeatureKey.ProfileContracts]: profileContractsFeature,
  [FeatureKey.ProfileModels]: profileModelsFeature,
  [FeatureKey.ProfileUsers]: profileUsersFeature,
  [FeatureKey.Recommendations]: recommendationsFeature,
  [FeatureKey.Calendar]: calendarFeature,
  [FeatureKey.Tasks]: tasksFeature,
  [FeatureKey.Topics]: topicsFeature,
  [FeatureKey.Transactions]: transactionsFeature,
  [FeatureKey.SearchableAthletes]: searchableAthletesFeature,
  [FeatureKey.SearchableBrands]: searchableBrandsFeature,
  [FeatureKey.SearchableContracts]: searchableContractsFeature,
  [FeatureKey.SearchableModels]: searchableModelsFeature,
  [FeatureKey.SearchableUsers]: searchableUsersFeature,
  [FeatureKey.Workflows]: workflowsFeature,
  [FeatureKey.UserActions]: userActionsFeature,
  [FeatureKey.UseCases]: useCasesFeature,
  [FeatureKey.ModelTrainings]: modelTrainingsFeature,
  [FeatureKey.ModelGeneration]: modelGenerationFeature,
  [FeatureKey.Triples]: triplesFeature
};
