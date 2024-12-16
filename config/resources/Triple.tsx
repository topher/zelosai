import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const TripleResource = {
  resourceTypeId: ResourceType.Triple,
  schema: Yup.object().shape({
      subject: Yup.string().required("Subject is required."),
      predicate: Yup.lazy((value) =>
        Array.isArray(value)
          ? Yup.array()
              .of(Yup.string().required())
              .max(3, "You can select a maximum of 3 predicates.")
              .required("At least one predicate is required.")
          : Yup.string().required("Predicate is required.")
      ),
      object: Yup.lazy((value) =>
        Array.isArray(value)
          ? Yup.array()
              .of(Yup.string().required())
              .max(3, "You can select a maximum of 3 objects.")
              .required("At least one object is required.")
          : Yup.string().required("Object is required.")
      ),
      // Custom validation to ensure only one field is multiple
    }).test(
      "only-one-multiple",
      "Please select multiple values for only one field (either Predicate or Object).",
      (value) => {
        const isPredicateMultiple = Array.isArray(value.predicate) && value.predicate.length > 1;
        const isObjectMultiple = Array.isArray(value.object) && value.object.length > 1;
        return !(isPredicateMultiple && isObjectMultiple);
      }
    ),
  fields: [
      {
        name: "subject",
        label: "Subject",
        type: "autocomplete",
        required: true,
        resourceTypes: ["ProfileUser", "ProfileBrand", "ProfileAthlete"],
        multiple: false, // Single subject
      },
      {
        name: "predicate",
        label: "Predicate",
        type: "autocomplete",
        required: true,
        fetchPredicates: true,
        multiple: true, // Allow multiple predicates
      },
      {
        name: "object",
        label: "Object",
        type: "autocomplete",
        required: true,
        resourceTypes: ["Goal", "Task"],
        multiple: false, // Single object
      },
      {
        name: 'citation',
        label: 'Citation',
        type: 'text',
        required: false,
      },
      {
        name: 'visibility',
        label: 'Visibility',
        type: 'select',
        required: true,
        options: ['public', 'private', 'restricted'],
      },
      {
        name: 'profileId',
        label: 'Profile',
        type: 'autocomplete', // Assuming you have an autocomplete component to select profiles
        required: true,
        resourceTypes: ['ProfileUser', 'ProfileAthlete', 'ProfileBrand'],
      },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyTriplesAgent', // Assign an agentId to the resource
};

export default TripleResource;
