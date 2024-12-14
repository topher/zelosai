// /app/components/atomic/templates/modals/DynamicResourceModal.tsx

"use client";

import React, { useEffect, useState } from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useFeatureAccess } from "@/hooks/useFeatureAccess";
import { features } from "@/config/features";
import { FeatureKey, Feature } from "@/config/featuresConfig";
import { getFeatureKeyFromResourceType } from "@/lib/featureUtils";
import { Button } from "@/components/ui/button";
import Input from "@/app/components/atomic/atoms/Input";
import AutocompleteSelect from "@/app/components/atomic/AutocompleteSelect";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Pencil, Trash } from "lucide-react";
import { ResourceType } from "@/config/resourceTypes";
import { Triple, Predicate } from "@/app/types"; // ✅ Import Predicate
import TripleCardObject from "../../organisms/cards/triple-cards/TripleCardObject";
import { TripleModal } from "@/app/components/atomic/ttemplates/modals/TripleModal"; // 🔧 Corrected the path
import { predicates } from "@/config/predicates"; // ✅ Correct path
import { profileTypeToResourceType } from "@/utils/profileTypeToResourceType";
import * as resourceConfigs from '@/config/resources'; // Import all resource configs
import { searchPredicates } from "@/lib/predicateService";

// Define the type of resourceConfigs for TypeScript
interface ResourceConfigs {
  [key: string]: any; // Replace 'any' with a specific type if available
}

export interface DynamicResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceType: ResourceType;
  action: "create" | "read" | "update" | "delete";
  resourceId?: string;
  initialData?: any;
  onSuccess?: (result: any) => void;
}

interface FormData {
  subject: string;
  predicate: string | string[];
  object: string | string[];
  citation?: string;
  visibility?: "public" | "private" | "restricted";
  profileId?: string;
  type?: string;
  [key: string]: any;
}

type PredicatesMap = Record<string, Predicate>;

const DynamicResourceModal: React.FC<DynamicResourceModalProps> = ({
  isOpen,
  onClose,
  resourceType,
  action,
  resourceId,
  initialData,
  onSuccess,
}) => {
  const [predicates, setPredicates] = useState<PredicatesMap>({});

  console.log("DynamicResourceModal Props:", { isOpen, resourceType, action, resourceId, initialData });
  // 0. fetchPredicates
  useEffect(() => {
    const fetchPredicates = async () => {
      if (!resourceType) {
        console.error('ResourceType is required!');
        return;
      }
      try {
        const fetchedPredicates = await searchPredicates('', resourceType);
        // Handle predicates
      } catch (error) {
        console.error('Error fetching predicates:', error);
      }
    };
  
    fetchPredicates();
  }, [resourceType]);
  

  // 1. Retrieve the FeatureKey based on ResourceType
  const featureKey = getFeatureKeyFromResourceType(resourceType);

  if (!featureKey) {
    console.error(`No FeatureKey found for ResourceType: ${resourceType}`);
    return null;
  }

  // 2. Access the feature configuration
  const feature: Feature | undefined = features[featureKey as FeatureKey];

  if (!feature) {
    console.error(`Feature config not found for FeatureKey: ${featureKey}`);
    return null;
  }

  // 3. Map resourceType to resourceConfig using resourceConfigs imported via index.ts
  const resourceConfigKey = `${resourceType}Resource`;
  const resourceConfig: any = (resourceConfigs as ResourceConfigs)[resourceConfigKey];

  if (!resourceConfig) {
    console.error(`Resource config not found for ResourceType: ${resourceType}`);
    return null;
  }

  // 4. Initialize react-hook-form with Yup resolver imported from resourceConfig
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(resourceConfig.schema), // 🛠️ Imported schema
    defaultValues: initialData || {},
  });

  // 5. Reset form when initialData changes
  useEffect(() => {
    console.log("DynamicResourceModal useEffect: resetting form with initialData:", initialData);
    reset(initialData || {});
  }, [initialData, reset]);

  // 6. Local State for Loading and API Errors
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // 7. Use the custom hook for feature access
  const { isFeatureAllowed, performAction, subscription } = useFeatureAccess();

  // 8. State to manage existing triples
  const [existingTriples, setExistingTriples] = useState<Triple[]>([]);

  const router = useRouter();

  useEffect(() => {
    if ((action === "read" || action === "update") && resourceId) {
      // Fetch existing triples related to the resource
      const fetchExistingTriples = async () => {
        try {
          const response = await fetch(`/api/resource/triples?subject=${resourceId}`); // 🔧 Adjusted endpoint
          if (response.ok) {
            const data = await response.json();
            console.log(data, resourceId);
            setExistingTriples(data.resources);
          } else {
            console.error("Failed to fetch existing triples");
          }
        } catch (error) {
          console.error("Error fetching existing triples:", error);
        }
      };
      fetchExistingTriples();
    }
  }, [action, resourceId, feature.metadata.resourceName]);

  // 9. Define handleEditTriple function
  const handleEditTriple = (triple: Triple): void => {
    // Open the TripleModal in 'update' mode with the selected triple's data
    setModalAction("update");
    setSelectedTriple(triple);
    setTripleModalOpen(true);
  };

  // 10. Define handleDeleteTriple function
  const handleDeleteTriple = async (tripleId: string): Promise<void> => {
    if (confirm("Are you sure you want to delete this triple?")) {
      try {
        const response = await fetch(`/api/resource/triples/${tripleId}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (response.ok) {
          setExistingTriples((prev: Triple[]) =>
            prev.filter((t: Triple) => t.id !== tripleId)
          );
          toast.success("Triple deleted successfully.");
          onSuccess?.(result);
        } else {
          setApiError(result.message || "Failed to delete triple.");
          toast.error(result.message || "Failed to delete triple.");
        }
      } catch (error) {
        console.error("Error deleting triple:", error);
        setApiError("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
      }
    }
  };

  // 11. State to manage modal for editing/creating triples
  const [isTripleModalOpen, setTripleModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"create" | "update">("create");
  const [selectedTriple, setSelectedTriple] = useState<Triple | null>(null);

  // 12. Handle Form Submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setApiError(null);

    // Check if action is allowed
    const allowed = await isFeatureAllowed(featureKey, action);
    if (!allowed) {
      toast.error("Action not allowed due to limits or insufficient credits.");
      setLoading(false);
      return;
    }

    try {
      // Get selected predicates and objects
      const predicatesSelected: string[] = Array.isArray(data.predicate)
        ? data.predicate
        : [data.predicate];
      const objectsSelected: string[] = Array.isArray(data.object)
        ? data.object
        : [data.object];

      // Enforce that only one field can have multiple selections
      if (predicatesSelected.length > 1 && objectsSelected.length > 1) {
        setApiError("Please select multiple values for only one field (either Predicate or Object).");
        toast.error("Please select multiple values for only one field (either Predicate or Object).");
        setLoading(false);
        return;
      }

      // Enforce max 3 selections in the multiple field
      if (
        (predicatesSelected.length > 3 && predicatesSelected.length > objectsSelected.length) ||
        (objectsSelected.length > 3 && objectsSelected.length > predicatesSelected.length)
      ) {
        setApiError("You can select a maximum of 3 values in the multiple field.");
        toast.error("You can select a maximum of 3 values in the multiple field.");
        setLoading(false);
        return;
      }

      // Calculate total number of triples
      const totalTriples = predicatesSelected.length * objectsSelected.length;
      if (totalTriples > 9) {
        setApiError("The total number of triples cannot exceed 9.");
        toast.error("The total number of triples cannot exceed 9.");
        setLoading(false);
        return;
      }

      // Generate combinations of predicates and objects
      const triplesToCreate: Partial<Triple>[] = [];

      for (const predicate of predicatesSelected) {
        for (const object of objectsSelected) {
          triplesToCreate.push({
            subject: data.subject,
            predicate,
            object,
            citation: data.citation,
            visibility: data.visibility,
            profileId: data.profileId,
            type: data.type,
          });
        }
      }

      // Create triples
      const createPromises = triplesToCreate.map((triple) =>
        fetch(`/api/resource/triples`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(triple),
        })
      );

      const responses = await Promise.all(createPromises);
      const results = await Promise.all(responses.map((res) => res.json()));

      const allCreated = responses.every((res) => res.ok);
      if (allCreated) {
        // Update feature usage
        await performAction(featureKey, action);

        toast.success(`${triplesToCreate.length} triples created successfully.`);
        onSuccess?.(results); // Pass all created triples
        onClose();
      } else {
        const errorMessages = results
          .map(
            (res, idx) =>
              res.message || `Failed to create triple ${idx + 1}`
          )
          .join(", ");
        setApiError(errorMessages);
        toast.error(errorMessages);
      }
    } catch (error) {
      console.error("API error:", error);
      setApiError("An unexpected error occurred.");
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // 13. Function to determine object field type based on selected predicates
  const predicateValue = watch("predicate");

  const selectedPredicates: string[] = [];

  if (predicateValue) {
    if (Array.isArray(predicateValue)) {
      selectedPredicates.push(...predicateValue);
    } else {
      selectedPredicates.push(predicateValue);
    }
  }

  const firstPredicateId = selectedPredicates[0];

  const firstPredicate: Predicate | undefined = predicates[firstPredicateId];

  const determineObjectFieldType = (): {
    type: "text" |  "checkbox" | "number" | "date" | "enum" | "reference";
    enumOptions?: string[];
    referenceResourceTypes?: ResourceType[];
  } => {
    if (selectedPredicates.length === 0) {
      return { type: "text" };
    }

    const firstPredicateId = selectedPredicates[0];
    const firstPredicate: Predicate | undefined = predicates[firstPredicateId];

    if (firstPredicate) {
      // Map applicableObjectResourceTypes to input types
      const objectType = firstPredicate.applicableObjectResourceTypes[0];
      let determinedType: "text" | "checkbox" | "number" | "date" | "enum" | "reference" = "text";
      let enumOptions: string[] | undefined;
      let referenceResourceTypes: ResourceType[] | undefined;

      switch (objectType) {
        case 'ScalarString':
          determinedType = "text";
          break;
        case 'ScalarInt':
        case 'ScalarFloat':
          determinedType = "number";
          break;
        case 'ScalarDate':
          determinedType = "date";
          break;
        case 'ScalarBoolean':
          determinedType = "checkbox";
          break;
        case 'ScalarEnum':
          determinedType = "enum";
          enumOptions = firstPredicate.enumOptions; // Ensure enumOptions exist in Predicate
          break;
        case 'Reference':
          determinedType = "reference";
          referenceResourceTypes = firstPredicate.referenceResourceTypes; // Ensure referenceResourceTypes exist in Predicate
          break;
        // Add other cases as needed
        default:
          determinedType = "text";
          break;
      }

      return {
        type: determinedType,
        enumOptions,
        referenceResourceTypes,
      };
    }

    return { type: "text" };
  };

  const { type: objectFieldType, enumOptions, referenceResourceTypes } =
    determineObjectFieldType();

  // 14. Render Form Fields Dynamically Based on Feature Configuration
  const renderFormFields = () => {
    const { defaultPredicates } = resourceConfig; // resourceConfig is your resource definition

    return Object.entries(defaultPredicates).map(([predicateKey, status]) => {
      const predicateConfig = predicates[predicateKey];

      if (!predicateConfig) {
        console.warn(`Predicate "${predicateKey}" not found in predicates. Skipping.`);
        return null;
      }

      const fieldLabel = predicateConfig.label || predicateKey;
      const isRequired = status === 'required';
      const isProhibited = status === 'prohibited';

      if (isProhibited) {
        // Do not render a form field for prohibited predicates
        return null;
      }

      // Determine the field type based on predicateConfig
      let fieldType = 'text'; // Default to 'text', adjust based on predicateConfig

      // Map applicableObjectResourceTypes to input types
      const objectTypes = predicateConfig.applicableObjectResourceTypes;
      if (objectTypes.includes(ResourceType.ScalarString)) {
        fieldType = 'text';
      } else if (objectTypes.includes(ResourceType.ScalarInt) || objectTypes.includes(ResourceType.ScalarFloat)) {
        fieldType = 'number';
      } else if (objectTypes.includes(ResourceType.ScalarBoolean)) {
        fieldType = 'checkbox';
      } else if (objectTypes.includes(ResourceType.ScalarDate)) {
        fieldType = 'date';
      } else if (objectTypes.includes(ResourceType.ScalarEnum)) {
        fieldType = 'select';
      } else if (objectTypes.includes(ResourceType.Reference)) {
        fieldType = 'autocomplete'; // Assuming AutocompleteSelect handles references
      }

      // Render the form field based on fieldType
      let inputElement = null;

      if (fieldType === 'select' && enumOptions) {
        inputElement = (
          <select
            {...register(predicateKey)}
            id={predicateKey}
            disabled={action === 'read'}
            required={isRequired}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors[predicateKey] ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select {fieldLabel}</option>
            {enumOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      } else if (fieldType === 'autocomplete' && referenceResourceTypes) {
        inputElement = (
          <Controller
            control={control}
            name={predicateKey}
            render={({ field }) => (
            <AutocompleteSelect
              fetchPredicates={true} {...field}
              resourceTypes={referenceResourceTypes} // Swapped from 'options' to 'resourceTypes'
              placeholder={`Select ${fieldLabel}`}
              disabled={action === 'read'}
              multiple={false} // Adjust based on requirements
            />
            )}
          />
        );
      } else if (fieldType === 'checkbox') {
        inputElement = (
          <input
            {...register(predicateKey)}
            id={predicateKey}
            type={fieldType}
            disabled={action === 'read'}
            className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500`}
          />
        );
      } else {
        inputElement = (
          <Input
            {...register(predicateKey)}
            id={predicateKey}
            type={fieldType}
            placeholder={`Enter ${fieldLabel}`}
            disabled={action === 'read'}
            required={isRequired}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors[predicateKey] ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        );
      }

      return (
        <div key={predicateKey} className="mb-4">
          <label htmlFor={predicateKey} className="block font-medium mb-1 text-gray-700">
            {fieldLabel}
            {isRequired && <span className="text-red-500"> *</span>}
          </label>
          {inputElement}
          {errors[predicateKey]?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors[predicateKey]?.message as React.ReactNode}
            </p>
          )}
        </div>
      );
    });
  };

  // 15. Render Existing Triples
  const renderExistingTriples = () => {
    if (existingTriples.length === 0) {
      return <p>No existing triples for this resource.</p>;
    }

    return (
      <div className="space-y-4">
        {existingTriples.map((triple: Triple) => (
          <TripleCardObject
            key={triple.id}
            triple={triple}
            onUpdateTriple={(updatedTriple: Triple) => {
              // Update the existingTriples state with updated triples
              setExistingTriples((prev: Triple[]) =>
                prev.map((t: Triple) => (t.id === triple.id ? updatedTriple : t))
              );
              onSuccess?.(updatedTriple);
            }}
            onDeleteTriple={handleDeleteTriple}
            onEditTriple={handleEditTriple} // ✅ Passed onEditTriple
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              {action.charAt(0).toUpperCase() + action.slice(1)} {feature.metadata.label}
            </DialogTitle>
          </DialogHeader>
          <div className="p-4">
            {apiError && (
              <p className="text-red-500 mb-4">{apiError}</p>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              {renderFormFields()}

              {/* Existing Triples Section (for 'read' or 'update' actions) */}
              {(action === "read" || action === "update") && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Existing Triples</h3>
                  {renderExistingTriples()}
                </div>
              )}

              <DialogFooter className="mt-6 flex justify-end space-x-4">
                <Button
                  variant="secondary"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
                {(action === "create" || action === "update") && (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {loading ? "Processing..." : `${action.charAt(0).toUpperCase() + action.slice(1)}`}
                  </Button>
                )}
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Triple Modal for Creating or Updating a Triple */}
      {isTripleModalOpen && (
        <TripleModal
          isOpen={isTripleModalOpen}
          onClose={() => setTripleModalOpen(false)}
          action={modalAction}
          tripleId={selectedTriple?.id}
          initialData={selectedTriple}
          onSuccess={(result: Triple) => {
            if (modalAction === "create") {
              setExistingTriples((prev: Triple[]) => [...prev, result]);
            } else if (modalAction === "update") {
              setExistingTriples((prev: Triple[]) =>
                prev.map((t: Triple) => (t.id === result.id ? result : t))
              );
            }
            toast.success("Triple successfully processed.");
            onSuccess?.(result);
            setTripleModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default DynamicResourceModal;
