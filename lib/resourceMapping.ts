// lib/resourceMapping.ts

/**
 * Map resource names to resource types
 */
export function mapResourceNameToType(resourceName: string): string | null {
  const resourceTypeMap: { [key: string]: string } = {
    recommendations: 'Recommendation',
    goals: 'Goal',
    use_cases: 'UseCase',
    agents: 'Agent',
    issues: 'StrategicIssue',
    business_model_cards: 'BusinessModelCard',
    brand_model_cards: 'BrandModelCard',
    complete_trained_models: 'AIModel',
    user_defined_model_categories: 'UserDefinedModelCategory',
    model_subjects: 'ModelSubject',
    model_trainings: 'ModelTraining',
    personas: 'Persona',
    connectors: 'DataConnector',
    topics: 'Topic',
    info_assets: 'InfoAsset',
    policies: 'Policy',
    data_categories: 'DataCategory',
    messages: 'Message',
    offers: 'Offer',
    requests: 'Request',
    contacts: 'Contact',
    contracts: 'Contract',
    workflows: 'Workflow',
    athletes_triples: 'ProfileAthlete',
    profile_contracts: 'ProfileContract',
    profile_models: 'ProfileModel',
    profile_brands: 'ProfileBrand',
    profile_users: 'ProfileUser',
    searchable_athletes: 'SearchableAthlete',
    searchable_contracts: 'SearchableContract',
    searchable_models: 'SearchableModel',
    searchable_brands: 'SearchableBrand',
    searchable_users: 'SearchableUser',
    tasks: 'Task',
    scheduled_events: 'ScheduledEvent',
    transactions: 'Transaction',
    user_actions: 'UserAction',

    // New mappings
    alerts: 'Alert',
    statistics: 'Statistic',
  };

  return resourceTypeMap[resourceName.toLowerCase()] || null;
}
