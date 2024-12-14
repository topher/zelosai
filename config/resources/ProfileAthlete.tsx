import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const ProfileAthleteResource = {
  resourceTypeId: ResourceType.ProfileAthlete,
  schema: Yup.object().shape({
        athleteName: Yup.string().required('Athlete Name is required'),
        sport: Yup.string().required('Sport is required'),
        age: Yup.number().required('Age is required'),
        country: Yup.string().required('Country is required'),
        bio: Yup.string().required('Bio is required'),
        isActive: Yup.boolean().default(true),
        relatedSports: Yup.array().of(Yup.string()).required('Related Sports are required'),
        relatedEvents: Yup.array().of(Yup.string()),
    }),
  fields: [
        { name: 'athleteName', label: 'Athlete Name', type: 'text', required: true },
        { name: 'sport', label: 'Sport', type: 'text', required: true },
        { name: 'age', label: 'Age', type: 'number', required: true },
        { name: 'country', label: 'Country', type: 'text', required: true },
        { name: 'bio', label: 'Bio', type: 'textarea', required: true },
        {
            name: 'relatedSports',
            label: 'Related Sports',
            type: 'autocomplete',
            resourceTypes: ['sports'],
            multiple: true,
            required: true,
        },
        {
            name: 'isActive',
            label: 'Is Active',
            type: 'checkbox',
        },
        {
            name: 'relatedEvents',
            label: 'Related Events',
            type: 'autocomplete',
            resourceTypes: ['events'],
            multiple: true,
        },
    ],
  requiredPredicates: [
  "represents_noc",
  "has_name",
  "has_short_name",
  "participates_in_sport",
  "represents_location",
  "has_occupation",
  "has_family",
  "speaks_language",
  "belongs_to_club",
  "has_coach",
  "has_position_style",
  "has_sporting_relatives",
  "has_injuries",
  "competes_in_national_league",
  "has_award",
  "has_achievements",
  "has_description",
  "has_start",
  "has_reason",
  "has_ambition",
  "has_training",
  "has_influence",
  "has_interest"
],
  agentId: 'leadFeatureKeyProfileAthletesAgent', // Assign an agentId to the resource
};

export default ProfileAthleteResource;
