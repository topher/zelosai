// types.ts

import { Action, FeatureKey, ActionFeatureKey, SubscriptionTier } from "@/config/featuresConfig";
import { predicates } from "@/config/predicates";
import { ResourceType } from '@/config/resourceTypes';

export type ProfileType = 'athlete' | 'brand' | 'user';

type PredicateKey = keyof typeof predicates;
export interface Resource {
  id: string;                             // Unique identifier for the resource
  accountId: string;                      // Account or organization ID the resource belongs to
  resourceType: ResourceType | string;             // Type of the resource (enum)
  ownerId: string;                        // User ID of the owner or creator
  createdAt: Date;                        // Timestamp of creation
  updatedAt?: Date;                       // Timestamp of the last update
  tags?: string[];                        // Optional tags for categorization
  visibility?: 'public' | 'private' | 'restricted'; // Access level
  linkedResources?: {
    [key in PredicateKey]?: string[];
  };
  subjectId?: string;
}

export interface Triple extends Resource {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
  visibility: "public" | "private" | "restricted";
  profileId: string;
  type: string;
}
export type FormFieldName = keyof Triple;

// /config/predicates.json
export interface Predicate extends Resource {
  icon: string;
  id: string;
  description: string;
  label: string;
  synonyms: string[];
  applicableSubjectResourceTypes: ResourceType[];
  applicableObjectResourceTypes: ResourceType[];
  enumOptions?: string[];
  referenceResourceTypes?: ResourceType[];
}

// END RDF

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

// START ACCESS CONTROL

export type Account = { 
    label: string;
    email: string;
    icon: any;
}

export type Group = {
  groupId: string;
  name: string;
  type: 'organization' | 'role' | 'custom';
  // Other group attributes as needed
};

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

export interface Membership {
  userId: string;
  role: string;
  // Add other properties if needed
}

export interface OrganizationWithMemberships extends Organization {
  memberships?: Membership[]; // Define Membership interface accordingly
}

export interface Membership {
  userId: string;
  role: string;
  // Add other properties if needed
}

// Extend OrganizationResource to include memberships and privateMetadata
export interface OrganizationResource {
  privateMetadata?: Record<string, any>;
  memberships?: Membership[];
}

// Extend Organization class (if applicable)
export interface Organization {
  privateMetadata: Record<string, any>;
  memberships?: Membership[];
}
// END ACCESS CONTROL
// START RESOURCES 

export interface Statistic extends Resource {
  title: string;
  value: number;
  description: string;
  date: string;
  tags: string[];
  relatedGoals?: string[]; // Links to Goal IDs for tracking metrics against goals
}

export interface Alert extends Resource {
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
  date: string;
  tags: string[];
  associatedRules?: string[]; // Links to Topic IDs for context on alerts
}

export interface Persona extends Resource {
  Name: string;                      // Corresponds to "Name" in JSON
  Description: string;               // Corresponds to "Description" in JSON
  ageRange?: string;                 // Optional field, as not provided in JSON
  interests?: string[];              // Optional field, as not provided in JSON
  profession?: string;               // Optional field, as not provided in JSON
  location?: string;                 // Optional field, as not provided in JSON
  Type: string;                      // Corresponds to "Type" in JSON
  AssociatedUseCases: string[];      // Corresponds to "AssociatedUseCases" in JSON
  isPersona: boolean;                // Corresponds to "is_persona" in JSON
  image: string;                     // Corresponds to "Image" in JSON
  relatedContacts?: string[]; // Contact IDs for CRM integration
  associatedUseCases?: string[]; // Links to specific Use Case IDs
}


export interface Agent extends Resource {
  Name?: string;
  Description?: string;
  Type?: "Corporate Entity" | "Individual" | string;
  AssociatedUseCases?: string[];
  is_persona?: boolean;
  Image?: string;
  image?: string;
  agentType?: 'AI' | 'Human';
  name?: string;
  expertiseAreas?: string[];
  availabilityStatus?: 'online' | 'offline' | 'busy';
  aiCapabilities?: {
    supportedLanguages?: string[];
    responseTime?: number;
    integrations?: string[];
  };
  linkedModels?: string[]; // Related Model IDs
  linkedPersonas?: string[]; // Related Persona IDs for contextual CRM insights
  associatedWorkflows?: string[]; // Links to Workflow IDs for task management
  contactInfo?: Contact; // Direct link to Contact information
}

export interface ModelSubject extends Resource {
  subjectName: string;
  description: string;
  expertiseLevel: 'beginner' | 'intermediate' | 'expert';
  relatedAIModels: string[]; // Links to associated AI Model IDs
  associatedTopics?: string[]; // Links to Topic IDs for subject context
  relatedTrainingIds?: string[]; // IDs of associated ModelTraining
  associatedPersonas?: string[]; // Links to Topic IDs for subject context
  linkedInfoAssets?: string[]; // Links to Info Assets related to this persona

}

export interface ModelTraining extends Resource {
  modelName: string;
  description: string;
  trainingDataSources: string[];
  trainingStatus: 'pending' | 'in_progress' | 'completed' | 'failed';
  accuracy: number;
  lastTrainedAt: string;
  linkedInfoAssets?: string[]; // Links to Info Assets related to this persona
  parameters: {
    epochs: number;
    learningRate: number;
    batchSize: number;
    optimizer: string;
    layers: number[];
  };
}

export interface Topic extends Resource {
  category: string;             // e.g., 'Cycling', 'AI Entrepreneurship'
  description: string;          // Detailed description of the topic
  preferences: string[];        // User preferences related to the topic
  influencerName: string;       // Name of the influencer associated with the topic
  brand: string;                // Brand name associated with the influencer
  // Add other topic-specific properties as needed
}

export interface ContractModel extends Resource {
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
  relatedInfoAssets?: string[]; // Links to Info Assets for contract documentation
  associatedAgents?: string[]; // Links to Agent IDs for involved parties
  relatedOffers?: string[]; // Links to Offer IDs
  linkedTransactions?: string[]; // Links to transactions related to the contract
};

export interface UserDefinedModelCategory extends Resource {
    // account: Account;
    accountId: string;
    name: string;
    includes?: string[];
    excludes?: string[];
}
export interface AIModel extends Resource {
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
  linkedContracts?: string[]; // Links to CRM contacts using this connector
  relatedSubjects?: string[]; // Links to related ModelSubject IDs
  relatedInfoAssets?: string[]; // Links to Info Assets for contract documentation  
  linkedModelTrainings?: string[]; // Model training sessions related to this model
  relatedAlerts?: string[]; // Alert IDs to highlight model-related risks
  associatedWorkflows?: string[]; // IDs of Workflows related to model development

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
export interface DataConnector extends Resource {
  id: string;
  accountId: string;
  name: string;
  description: string;
  icon: string;
  connectionType: "API" | "Social Media" | "Email Marketing" | "HTTP"; // Add other types as needed
  disabled: boolean;
  metadata: {
    email?: string;
    api_key?: string;
    username?: string;
    password?: string;
    shop_name?: string;
    whitelist?: string[]; // For HTTP Connector
    // Add other metadata fields as necessary
  };
}
export interface InfoAsset extends Resource {
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
  linkedAIModels?: string[]; // AI Models related to the Info Asset
  relatedPersonas?: string[]; // Links to Personas who find this asset useful
  associatedContracts?: string[]; // Links to Contract Models using this asset
}

export interface WorkflowStage {
  id: string;
  name: string;
  params?: any; // Optional parameters for the stage
}
export interface Workflow extends Resource {
  workflow_creator: string;
  id: string;
  accountId: string;
  name: string;
  emoji?: string;
  artist: string;
  cover: string;
  description: string;
  stages: WorkflowStage[]; // Add stages to Workflow
  associatedTasks?: string[]; // Links to Task IDs within this workflow
  associatedAlerts?: string[]; // Contacts who are participants in the workflow
  relatedAgents?: string[]; // Agents involved in this workflow
}

export interface Goal extends Resource {
  id: string;
  accountId: string;
  Goal: string;
  Description: string;
  StrategicIndicator: string;
  KPI: string;
  Developer: string;
  RelatedIssues?: string[];
  isActive: boolean;
  relatedStrategicIssues?: string[]; // Links to Strategic Issues supporting this goal
  relatedModelTrainings?: string[]; // Model Trainings relevant to goal achievement
};

export interface StategicIssue extends Resource {
  Topic: string;
  "SWOT Type": string;
  Subscribed: boolean;
  RelatedGoals?: string[];
  RelatedUseCases?: string[];
  relatedTopics?: string[]; // Topics that align with this strategic issue
  associatedGoals?: string[]; // Goals this issue supports
}

export interface UseCase extends Resource {
  id: string;
  accountId: string;
  Description: string;
  Subject: string;
  Target: string;
  ForPurpose: string[]; // Array of strings for different purposes
  Models: number; // Assuming the number of models is an integer
  associatedModels?: string[]; // AI Models related to this use case
  relatedPersonas?: string[]; // Agents relevant to the use case
}
export interface Contact extends Resource {
  name: string;
  email: string;
  agentTypes: Agent[]
  relatedPersonas?: string[]; // Links to Personas this contact engages with
  linkedOffers?: string[]; // Offers associated with this contact
  linkedMessages?: string[]; // Offers associated with this contact
}

export interface BusinessModel extends Resource {
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
export interface UserSelectedFacets extends Resource {
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

export interface BrandModelCard extends Resource {
  sectionName: string;
  brandFacetId: string;
}

// types/Offer.ts
export interface Offer extends Resource {
  name: string;
  description?: string;
  price: number;
  priceCurrency: string; // ISO 4217 currency codes, e.g., 'USD'
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder' | 'Discontinued';
  validFrom?: string; // Changed to string for ISO dates
  validThrough?: string; // Changed to string for ISO dates
  itemOffered: string; // Reference to the ID of the item being offered
  sellerId: string;    // User ID of the seller
  buyerId?: string;    // User ID of the buyer (if already purchased)
  offerType?: 'Sale' | 'Auction' | 'Rental' | 'Subscription';
  termsOfService?: string;
  status: 'Pending' | 'Accepted' | 'Denied' | 'Countered'; // Added status
}

export interface Recommendation extends Resource {
    title: string;
  description: string;
  recommendedResourceId?: string; // Optional, only on existing resources
  recommendedResourceType: string; // Type of the recommended resource
  action: Action; // e.g., 'CreateGoal', 'EditOffer'
  featureKey: string; // Add this property
  reason?: string; // Reason for recommendation
  recommenderId: string; // User ID of the person/system making the recommendation
}


// types/Message.ts
export interface Message extends Resource {
  labels?: string[];
  status?: string;
    senderId: string;    // User ID of the sender
  recipientId: string; // User ID of the recipient
  content: string;
  sentAt: Date;
  readAt?: Date;
  subject?: string;
  messageType?: 'Text' | 'Image' | 'Video' | 'Audio';
  attachments?: Attachment[];
  relatedContacts?: string[]; // CRM contacts
}

export interface Attachment {
  id: string;
  url: string;
  filename: string;
  contentType: string; // MIME type, e.g., 'image/png'
  size: number;        // Size in bytes
}

// types/ScheduledEvent.ts
export interface ScheduledEvent extends Resource {
    name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  organizerId: string; // User ID of the organizer
  participantIds?: string[]; // User IDs of participants
  eventStatus?: 'Scheduled' | 'Cancelled' | 'Postponed' | 'Completed';
  eventType?: 'Webinar' | 'Meetup' | 'Training' | 'Conference';
  associatedContacts?: string[]; // CRM Contacts attending the event
  relatedGoals?: string[]; // Goals related to the event
}

// types/Transaction.ts

export interface Transaction extends Resource {
    transactionType: 'Purchase' | 'Sale' | 'Refund' | 'Transfer';
  amount: number;
  currency: string; // ISO 4217 currency codes
  senderId: string;
  recipientId: string;
  transactionDate: string; // Changed to string for ISO dates
  status: 'Pending' | 'Completed' | 'Failed' | 'Cancelled';
  relatedResourceId?: string; // ID of the resource related to the transaction (e.g., Offer ID)
  notes?: string;
}

export interface UserAction extends Resource {
  subjectId: string;          // References the User performing the action
  action: Action;    // 'read', 'create', etc.
  actionFeatureKey: ActionFeatureKey; // 'Goals', 'Models', etc.
  resourceId: string;         // References the Resource being acted upon
  creditsUsed: number;
  }


export interface Task extends Resource {
    title: string;
  description?: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked';
  priority: 'Low' | 'Medium' | 'High';
  stageId: string; // Reference to the WorkflowStage
  relatedWorkflows?: string[]; // Workflows this task belongs to
  relatedAgents?: string[]; // Agents assigned to this task
  // Add other task-specific properties
}

export interface Profile extends Resource {
  resourceType: ResourceType.ProfileUser | ResourceType.ProfileAthlete | ResourceType.ProfileBrand; // Profile type
  type: 'athlete' | 'brand' | 'user';
  name: string;
  email?: string;
  idOfProfileSubject: string;
  triples: Triple[];
}
// END RESOURCES 


// START POLICY

// app/types/index.ts

export interface Condition {
  type: 'condition';
  attribute: string;
  operator: string;
  value: string;
}

export interface ConditionGroup {
  type: 'group';
  operator: 'AND' | 'OR';
  conditions: Array<Condition | ConditionGroup>;
}

export interface Rule {
  id: string;
  ruleType: string; // e.g., 'access', 'action', 'content'
  deontologicalDuty: string; // 'allowed', 'prohibited', 'obligated'
  predicate: string[]; // e.g., 'read', 'create', 'update', 'delete'
  subjectCondition: ConditionGroup;
  objectCondition: ConditionGroup;
  createdBy: string;
  ownedBy: string;
}

export interface Policy {
  id: string;
  accountId: string;
  description: string;
  rules: Rule[];
}
export interface User {

}

import type { User as ClerkUser, Organization as ClerkOrganization } from '@clerk/clerk-sdk-node';
import { LucideIcon } from "lucide-react";

/**
 * Extended User interface to include organization memberships.
 */
export interface User extends ClerkUser {
  organizationMemberships?: Array<{
    organization: {
      id: string;
      // Add other organization properties if needed
    };
    // Add other membership properties if needed
  }>;
  id: string;
  subscription: Subscription;
  orgId: string | null;
  orgRole: string | null;
  groups: string[];
  avatarSrc: string;
  name: string;
  email: string; 
}

/**
 * Extended Organization interface to include owner information.
 */
export interface Organization extends ClerkOrganization {
  ownerUserId: string;
  // Add other organization properties if needed
}

// app/types.ts
export interface PaymentSession {
  url: string;
}
export interface Subscription {
  createdAt: any;
  updatedAt: any;
  subscriptionId: string;
  subscriptionTier: SubscriptionTier;
  userId: string;
  organizationId: string;
  credits: number;
  creditsUsed: number;
  monthlyCreditLimit: number;
  featuresUsage: FeaturesUsage; // Tracks action usage and credits
  resourceCounts: ResourceCounts; // New property to track resource counts
  // Include other subscription-related properties if necessary
}

export type ResourceCounts = {
  [key in FeatureKey]?: number; // Number of resources per feature
};

export type FeaturesUsage = {
  [key in ActionFeatureKey]?: ActionFeatureUsage;
};
export interface ActionFeatureUsage {
  count: number; // Number of times the action was performed
  creditsUsed: number; // Total credits used for the action
}


// END POLICY
// Profile interface

// START ANALYTICS
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


// END ANALYTICS
// START CONTRACT 

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

// END CONTRACT 
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
export interface CardWithList extends Card {
  boardId: string;
  list: Omit<List, 'cards'>; // Exclude 'cards' to prevent circular references
}

export type DropdownOption = {
  id: string;
  name: string;
  parent_id?: string | number | null;
  [key: string]: any; // For additional fields like 'type', 'region', etc.
};

export interface SearchHit extends Message {
  objectID: string; // Required by InstantSearch
}

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
  };
}
