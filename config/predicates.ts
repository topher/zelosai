import { Predicate } from "@/app/types";
import { ResourceType } from "./resourceTypes";

  export const predicates: Predicate[] = [
        {
      id: "has_achievement",
      label: "Has Achievement",
      synonyms: ["achievement", "accomplishment"],
      applicableSubjectResourceTypes: [ResourceType.ProfileUser, ResourceType.ProfileBrand, ResourceType.ProfileAthlete],
      applicableObjectResourceTypes: [ResourceType.ScalarString],
      description: "Indicates an achievement associated with a subject."
    },
    {
      id: "participates_in",
      label: "Participates In",
      synonyms: ["participation", "involvement"],
      applicableSubjectResourceTypes: [ResourceType.ProfileUser, ResourceType.ProfileBrand, ResourceType.ProfileAthlete],
      applicableObjectResourceTypes: [ResourceType.Goal, ResourceType.Task],
      description: "Indicates participation in an event or team."
    },
    {
      id: "linked_to",
      label: "Linked To",
      synonyms: ["connected to", "associated with"],
      applicableSubjectResourceTypes: [ResourceType.ProfileUser, ResourceType.ProfileBrand, ResourceType.ProfileAthlete],
      applicableObjectResourceTypes: [ResourceType.Goal, ResourceType.Task],
      description: "Indicates a link or connection between entities."
    }
]
