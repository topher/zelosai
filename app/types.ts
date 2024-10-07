// Profile interface
  export interface Profile {
    id: string;
    name: string;
    sport: string;
    location: string;
    imageSrc: string;
    similarity_score?: number; // Added property
    accolades?: string[];      // Added property
}

export type ResourceType = 'athlete' | 'brand';

export interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
}

export interface Resource {
  subject: string;
  triples: Triple[];
}

  export type DataCategory = {  
  accountId: string;
  fides_key: string; 
  is_default: string;
  name: string;
  organization_fides_key: string;
  parent_key: string;
  replaced_by: string;
  tags: string;
  version_added: string;
  version_deprecated: string;
  description: string; 
}

export type Account = { 
    label: string;
    email: string;
    icon: any;
}

export type UserAction = {
  accountId: string;
  avatarSrc: string;
  name: string;
  email: string;
  action: string;
  content: string;
  timestamp: string;
  target: string;
}

export type Task = {
  id: string;
  accountId: string;
  title: string;
  status: string;
  label: string;
  priority: string;
}

export type Clause = {
  id: string;
  title: string;
  content: string;
  type: 'obligation' | 'power' | 'definition' | string;
};

export type Section = {
  id: string;
  title: string;
  order: number;
  parentId?: string;
  clauses: Clause[];
};

export type Event = {
  id: string;
  type: string;
  date: string;
  description: string;
  relatedPartyIds: string[];
};

export type ContractModel = {
  id: string;
  accountId: string;
  title: string;
  effectiveDate: string;
  expirationDate: string;
  status: 'draft' | 'active' | 'expired' | string;
  parties: Array<{
    id: string;
    name: string;
    role: string;
    contactInfo: string;
  }>;
  sections: Section[];
  assets: InfoAsset[];
  obligations: Array<{
    debtorPartyId: string;
    creditorPartyId: string;
    status: 'active' | 'fulfilled' | 'breached' | string;
    dueDate: string;
  }>;
  events: Event[];
  creationDate: string;
  lastUpdated: string;
  contract_creator: string;
  emoji: string;
  cover: string;
  creator: string;
  description: string;
  rights: string;
  schemaDateCreated: string;
  schemaContentUrl: string;
  schemaContentType: string;
  tags: string[];
  uri: string;
  creatorAvatar?: string; // Added property
};

export type UserDefinedModelCategory = {
    // account: Account;
    accountId: string;
    name: string;
    includes?: string[];
    excludes?: string[];
}

export type AIModel = {
  // General Model Information
  accountId: string;                      // ID of the account associated with the model
  label: string;                          // Model name or label
  tags?: string[];                        // Optional tags for categorization or filtering
  emoji?: string;                         // Optional emoji to represent the model
  description: string;                    // Model description or summary
  iconName: string;                       // Icon associated with the model
  href: string;                           // URL to access or reference the model
  color: string;                          // Color theme or branding
  bgColor: string;                        // Background color for branding purposes
  foundational_model: boolean;            // Flag to indicate if it's a foundational model
  model_file_path: string;                // Path to the model file or download location
  modelId: string;                        // Unique identifier for the model
  thumbnail: string;                      // Thumbnail image URL for the model
  prompt_template: string;                // Default prompt template for the model
  use_case_ids: string[];                 // Array of use case IDs that this model is associated with
  elabs_voice_id?: string;                // Optional ID for associated voice (if any)
  elabs_model_id?: string;                // Optional ID for associated e-lab model (if any)
  subject_prompt_alias?: string[];        // Optional aliases for subject prompts
  subject_prompt_key?: string;            // Optional subject prompt key
  default_language?: string;              // Default language for the model's operation
  createdBy: string;                      // User or entity that created the model
  createdAt: any;                         // Date and time the model was created
  creatorAvatar?: string;                 // Optional avatar of the model's creator

  // Versioning Information
  version: number;                        // Version number of the model metadata
  updatedAt: any;                         // Timestamp for the last update of this version
  change_log?: string;                    // Log or notes detailing the changes made in this version

  // Safety & Bias Information
  safety_details: {
    bias_risks: string;                   // Description of any identified bias risks in the model
    limitations: string;                  // Known limitations or potential failures of the model
    out_of_scope_use: string;             // Description of inappropriate or out-of-scope uses for the model
    recommendations: string;              // Recommendations to mitigate risks or limitations
  };

  // Training Details
  training_details: {
    training_data: string;                // Description or source of the training data used
    preprocessing_steps?: string;         // Optional preprocessing steps applied to the training data
    hyperparameters: {
      training_regime: string;            // Description of the training regime used
      speeds_sizes_times?: string;        // Optional information about training speed, size, or time
    };
  };

  // Evaluation Information
  evaluation: {
    testing_data: string;                 // Information about the testing data used
    factors?: string;                     // Factors or conditions considered during evaluation
    metrics: string;                      // Performance metrics and how the model was evaluated
    results: string;                      // Results of the evaluation process
  };

  // Environmental Impact
  environmental_impact?: {
    hardware_type: string;                // Type of hardware used for training (e.g., GPU, TPU)
    hours_used: number;                   // Total hours spent training the model
    cloud_provider?: string;              // Optional cloud provider where training was performed
    compute_region?: string;              // Optional region for the cloud compute used
    carbon_emitted?: string;              // Optional estimate of carbon emissions
  };

  // Technical Specifications
  technical_specifications?: {
    model_architecture: string;           // Architecture of the model (e.g., Transformer, LSTM)
    compute_infrastructure: string;       // Compute infrastructure used for training (e.g., AWS, Google Cloud)
    hardware: string;                     // Description of the hardware setup
    software: string;                     // Software frameworks and versions used (e.g., TensorFlow 2.x)
  };

  // Model Sources & Citations
  model_sources?: {
    repository: string;                   // URL to the model's repository
    paper?: string;                       // Optional link to a research paper associated with the model
    demo?: string;                        // Optional link to a live demo of the model
  };

  // Versioning Control for Hybrid Approach
  previous_versions?: {
    version: number;                      // Previous version number
    updatedAt: any;                       // Timestamp for the previous version
    change_log?: string;                  // Notes or change log for the previous version
  }[];

  // Citation Formats
  citation?: {
    bibtex?: string;                      // Optional BibTeX citation format for the model
    apa?: string;                         // Optional APA citation format for the model
  };
};

export type DataConnector = {
  id: string;
  accountId: string;
  name: string;
  description?: string;
  icon?: string; // URL to the connector icon
  form?: React.ComponentType<any>; // Type for the connector form component
  connectionType: string;
}

// app/types.ts

export interface InfoAsset {
  id: string;
  accountId: string;
  URI: string;
  name: string;
  category?: string;
  asset_type?: string;
  content?: string;
  media_link?: string;
  mimetype?: string;
  dc_creator?: string;
  dc_description?: string;
  schema_dateCreated?: string;
  labels?: string[];
  status?: string;
  dcma_registrant_email?: string;
  read?: boolean;
  uri: string;
  creation_date: string;
  entity_type?: string;
  image?: string; 
}

export type Workflow = {
    workflow_creator: string;
    id: string;
    accountId: string;
    name: string
    emoji?: string
    artist: string
    cover: string
    description: string
}

// New Statement Type
export type Statement = {
  attribute: string;
  operator: string;
  value: string; // scalar value or entity
};

// New Rule Type
export type Rule = {
  id: string;
  accountId: string;
  deontologicalDuty: string; // Prohibited, Allowed, Obligated
  subjectCondition: Statement;
  predicate: string;
  objectCondition: Statement;
  createdBy: string;
  ownedBy: string;
  ruleType: string; // access | content | action
};

export type Goal = {
    id: string;
    accountId: string;
    Goal: string;
    Description: string;
    StrategicIndicator: string;
    KPI: string;
    Developer: string;
    RelatedIssues: string[];
    isActive: boolean;
};

export type StategicIssue = {
    Topic: string;
    "SWOT Type": string;
    Subscribed: boolean;
    RelatedGoals?: string[];
    RelatedUseCases?: string[];
}

export type UseCase = {
    id: string;
    accountId: string;
    Description: string;
    Subject: string;
    Target: string;
    ForPurpose: string[]; // Array of strings for different purposes
    Models: number; // Assuming the number of models is an integer
}

export type Agent = {
    id: string;
    accountId: string;
    Name: string;
    Description: string;
    Type: "Corporate Entity" | "Individual" | string;
    AssociatedUseCases: string[];
    is_persona: boolean;
    Image: string;
}

export type Contact = {
    name: string;
    email: string;
    agentTypes: Agent[]
}
export interface BusinessModel {
  companyName: string;
  logo: string;
  industry: string;
  location: string;
  foundedYear: number;
  description: string;
  website: string;
  socialMedia: {
      linkedin: string;
      twitter: string;
      facebook: string;
  };
  customerSegments: Array<{
      id: string;
      name: string;
      description: string;
  }>;
  valuePropositions: Array<{
      id: string;
      name: string;
      description: string;
  }>;
  channels: Array<{
      id: string;
      name: string;
      description: string;
  }>;
  customerRelationships: Array<{
      id: string;
      name: string;
      description: string;
  }>;
  revenueStreams: Array<{
      id: string;
      name: string;
      description: string;
  }>;
  keyResources: Array<{
      id: string;
      name: string;
      description: string;
  }>;
  keyActivities: Array<{
      id: string;
      name: string;
      description: string;
  }>;
  keyPartners: Array<{
      id: string;
      name: string;
      description: string;
  }>;
  cost: Array<{
      id: string;
      name: string;
      description: string;
  }>;
}
export interface StatCard {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: string;
    measure: Measure; // ID of the measure
    page: string; // Original page
    // ... other properties for customization (optional)
}

export interface Scale {
    name: string; // Name of the scale (e.g., Ratio, Ordinal, Interval)
    // ... other properties related to scale definition (optional)
}
export interface InformationNeed {
    id: string;
    description: string;
    measurableEntity: any;
    // ... other properties related to the information need (optional)
}
export interface Measure {
    id: string;
    name: string;
    description: string;
    scale?: Scale;
    // ... other properties related to the measure definition (optional)
}
export interface MeasurementProcedure {
    id: string;
    name: string;
    description: string;
    // ... other properties related to the measurement procedure (optional)
}
  
// export type Account = (typeof accounts)[number]
// export type Contact = (typeof contacts)[number]
  
// DEPRECATED  

// export type Tool = {
//     label: string;
//     description: string;
//     iconName?: string; // Make iconName optional
//     href: string;
//     color: string;
//     bgColor: string;
//   }

export enum ACTION {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE"
}

export enum ENTITY_TYPE {
  BOARD = "BOARD",
  LIST = "LIST",
  CARD = "CARD"
}
export interface AuditLog {
  id: string;
  orgId: string;
  action: ACTION;
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  userId: string;
  userImage: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface OrgLimit {
  id: string;
  orgId: string;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface OrgSubscription {
  id: string;
  orgId: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  stripeCurrentPeriodEnd?: Date;
}
export type Card = {
  id: string;
  title: string;
  description: string;
  order: number;
  listId: string;
  // createdAt: Date;
  // updatedAt: Date;
};
export interface List {
  boardId: string | number | readonly string[] | undefined;
  id: string;
  title: string;
  order: number;
  cards: Card[];
}
export interface Board {
  id: string;
  title: string;
  lists: List[];
}
export type ListWithCards = List & { cards: Card[] };

// @/app/types.ts
export interface CardWithList {
  id: string;
  boardId: string;
  description: string;
  order: string;
  listId: string;
  title: string;
  list: List; // Add the list property of type List
}

export type UserSelectedFacets = {
  userId: string;
  selectedMarketingChannels: string[];
  selectedMarkets: string[];
  selectedIndustries: string[];
  selectedVALSSegments: string[];
  selectedLanguages: string[];
  selectedNILActivities: string[];
  selectedInterests: string[];
  selectedProducts: string[];
};

export type DropdownOption = {
  id: string;
  name: string;
  parent_id?: string | number | null;
  [key: string]: any; // For additional fields like 'type', 'region', etc.
};