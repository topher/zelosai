// /config/predicatesConfig.ts

export interface PredicateConfig {
    label: string;
    applicableResourceTypes?: string[];
  }
  
  export const predicatesConfig: { [key: string]: PredicateConfig } = {
    hasAchievement: {
      label: "Achievement",
      applicableResourceTypes: ["goal", "task"],
    },
    participatesIn: {
      label: "Participation",
      applicableResourceTypes: ["event", "team"],
    },
    linkedTo: {
      label: "Linked To",
      applicableResourceTypes: ["profile", "project"],
    },
    // Add more predicates as needed
  };
  