  // Profile interface
export interface Profile {
    id: string;
    name: string;
    sport: string;
    location: string;
    imageSrc: string;
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
  status: 'draft' | 'active' | 'expired' | string; // Optional property
  parties: Array<{ id: string; name: string; role: string; contactInfo: string; }>;
  sections: Section[];
  assets: InfoAsset[];
  obligations: Array<{
    debtorPartyId: string;
    creditorPartyId: string;
    status: 'active' | 'fulfilled' | 'breached'| string;
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
};


export type UserDefinedModelCategory = {
    // account: Account;
    accountId: string;
    name: string;
    includes?: string[];
    excludes?: string[];
}

export type AIModel = {
    accountId: string;
    label: string;
    tags: string[];  
    emoji?: string;
    description: string;
    iconName: string;
    href: string;
    color: string;
    bgColor: string;
    foundational_model: boolean;
    model_file_path: string;
    modelId: string;
    thumbnail: string;
    prompt_template: string;
    use_case_ids: string[];
    elabs_voice_id?: string;
    elabs_model_id?: string;
    subject_prompt_alias?: string[];
    subject_prompt_key?: string;
    default_language?: string;
    createdBy: string;
    createdAt: any;
}

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
