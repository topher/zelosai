import * as Yup from 'yup';
import { fetchPredicateById, searchPredicates } from '@/lib/predicateService'; // Adjust the path as necessary
import { ResourceType } from './resourceTypes';

/**
 * Generates a Yup validation schema based on defaultPredicates.
 * @param defaultPredicates - A mapping of predicate keys to their statuses.
 * @param resourceType - The resource type for filtering applicable predicates.
 * @returns A Yup.ObjectSchema representing the validation schema.
 */
export async function generateSchemaFromDefaultPredicates(defaultPredicates: Record<string, string>, resourceType: string): Promise<Yup.ObjectSchema<any>> {
  const shape: Record<string, Yup.AnySchema> = {};

  // Fetch all predicates applicable to the given resource type
  const predicates = await searchPredicates('', resourceType); // Adjust query as necessary

  console.warn(`Predicates "${JSON.stringify(predicates)}" boom.`);


  for (const [predicateKey, status] of Object.entries(defaultPredicates)) {
    const predicateConfig = predicates.find((predicate: { key: string; }) => predicate.key === predicateKey);

    if (!predicateConfig) {
      console.warn(`Predicate "${predicateKey}" not found in fetched predicates. Skipping.`);
      continue;
    }

    let validator: Yup.AnySchema;

    // Determine the type based on predicate's applicableObjectResourceTypes
    const objectTypes = predicateConfig.applicableObjectResourceTypes || [];
    if (objectTypes.includes(ResourceType.ScalarString)) {
      validator = Yup.string();
    } else if (objectTypes.includes(ResourceType.ScalarInt)) {
      validator = Yup.number().integer();
    } else if (objectTypes.includes(ResourceType.ScalarFloat)) {
      validator = Yup.number();
    } else if (objectTypes.includes(ResourceType.ScalarBoolean)) {
      validator = Yup.boolean();
    } else if (objectTypes.includes(ResourceType.ScalarDate)) {
      validator = Yup.date();
    } else {
      validator = Yup.string(); // Default validator
    }
    
    if (status === 'required') {
      validator = validator.required(`${predicateConfig.label} is required`);
    } else if (status === 'prohibited') {
      validator = Yup.mixed().notRequired().test(
        'prohibited',
        `${predicateConfig.label} is prohibited`,
        value => value === undefined || value === null
      );
    } else {
      // 'allowed' or 'suggested'
      validator = validator.notRequired();
    }

    // Add the validator to the shape
    shape[predicateKey] = validator;
  }

  return Yup.object().shape(shape);
}