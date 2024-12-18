import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const ProfileAthleteResource = {
  resourceTypeId: ResourceType.ProfileAthlete,
  defaultPredicates: {
  "athlete_name": "required",
  "sport": "required",
  "age": "required",
  "country": "required",
  "bio": "required",
  "related_sports": "required",
  "is_active": "allowed",
  "related_events": "allowed"
},
  schema: generateSchemaFromDefaultPredicates({
  "athlete_name": "required",
  "sport": "required",
  "age": "required",
  "country": "required",
  "bio": "required",
  "related_sports": "required",
  "is_active": "allowed",
  "related_events": "allowed"
},ResourceType.ProfileAthlete),
  agentId: 'leadProfileAthletesAgent', // Assign an agentId to the resource
};

export default ProfileAthleteResource;
