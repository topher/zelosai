import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const triplesFeature: Feature = {
    key: FeatureKey.Triples,
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
    actions: [
        {
            actionKey: ActionFeatureKey.ReadTriple,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [5, 20, 100],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateTriple,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [2, 10, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateTriple,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [2, 10, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteTriple,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [1, 5, 20],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Dashboard,
        icon: Target,
        description: 'Manage triples notifications.',
        isInProd: true,
        href: '/dashboard/search/triples',
        resourceType: ResourceType.Triple,
        resourceName: 'triples',
        label: 'Triple',
        agentId: 'leadTriplesAgent',
        requiredPredicates: [],
        defaultPredicates: {
              "subject": "required",
              "predicate": "required",
              "object": "required",
              "citation": "allowed",
              "visibility": "required",
              "profile_id": "required"
            }
    }
};