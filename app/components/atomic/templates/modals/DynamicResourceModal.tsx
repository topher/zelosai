// /app/components/atomic/templates/modals/DynamicResourceModal.tsx

"use client";

import React, { useEffect, useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useFeatureAccess } from "@/hooks/useFeatureAccess";
import { features } from "@/config/features";
import { FeatureKey, FieldConfig, Feature } from "@/config/featuresConfig";
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
import { Triple, FormFieldName, Predicate } from "@/app/types"; // ✅ Import Predicate
import TripleCardObject from "../../organisms/cards/triple-cards/TripleCardObject";
import { TripleModal } from "@/app/components/atomic/templates/modals/TripleModal"; // 🔧 Corrected the path
import { predicates } from "@/config/predicates"; // ✅ Correct path
import { profileTypeToResourceType } from "@/utils/profileTypeToResourceType";

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

const DynamicResourceModal: React.FC<DynamicResourceModalProps> = ({
  isOpen,
  onClose,
  resourceType,
  action,
  resourceId,
  initialData,
  onSuccess,
}) => {
  console.log("DynamicResourceModal Props:", { isOpen, resourceType, action, resourceId, initialData });

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

  // 3. Initialize react-hook-form with Yup resolver imported from features 🚀
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(feature.schema), // 🛠️ Imported schema
    defaultValues: initialData || {
      subject: "",
      predicate: "",
      object: "",
      citation: "",
      visibility: "public",
      profileId: "",
      type: "",
    },
  });

  // 4. Reset form when initialData changes
  useEffect(() => {
    console.log("DynamicResourceModal useEffect: resetting form with initialData:", initialData);
    reset(initialData || {
      subject: "",
      predicate: "",
      object: "",
      citation: "",
      visibility: "public",
      profileId: "",
      type: "",
    });
  }, [initialData, reset]);

  // 5. Local State for Loading and API Errors
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // State to keep track of which field is set to multiple
  const [multipleField, setMultipleField] = useState<"predicate" | "object" | null>(null);

  const router = useRouter();

  // 6. Use the custom hook for feature access
  const { isFeatureAllowed, performAction, subscription } = useFeatureAccess();

  // 7. State to manage existing triples
  const [existingTriples, setExistingTriples] = useState<Triple[]>([]);

  useEffect(() => {
    if ((action === "read" || action === "update") && resourceId) {
      // Fetch existing triples related to the resource
      const fetchExistingTriples = async () => {
        try {
          const response = await fetch(`/api/resource/triples?subject=${resourceId}`); // 🔧 Adjusted endpoint
          if (response.ok) {
            const data = await response.json();
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

  // 8. Define handleEditTriple function
  const handleEditTriple = (triple: Triple): void => {
    // Open the TripleModal in 'update' mode with the selected triple's data
    setModalAction("update");
    setSelectedTriple(triple);
    setTripleModalOpen(true);
  };

  // 9. Define handleDeleteTriple function
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

  // 10. State to manage modal for editing/creating triples
  const [isTripleModalOpen, setTripleModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"create" | "update">("create");
  const [selectedTriple, setSelectedTriple] = useState<Triple | null>(null);

  // 11. Handle Form Submission
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

  // 12. Function to determine object field type based on selected predicates
  // Updated code to fix Error 2
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
    type: "text" | "number" | "date" | "enum" | "reference";
    enumOptions?: string[];
    referenceResourceTypes?: ResourceType[];
  } => {
    if (selectedPredicates.length === 0) {
      return { type: "text" };
    }

    const firstPredicateId = selectedPredicates[0];
    const firstPredicate: Predicate | undefined = predicates[firstPredicateId];

    if (firstPredicate) {
      // Map ResourceType to input type
      const objectType = (() => {
        const type = firstPredicate.applicableObjectResourceTypes[0];
        switch (type) {
          case ResourceType.ScalarString:
            return "text";
          case ResourceType.Goal:
          case ResourceType.Task:
            return "reference";
          case ResourceType.ScalarEnum: // Replace with actual enum type if applicable
            return "enum";
          // Add other cases as needed
          default:
            return "text";
        }
      })();

      if (objectType === "enum" && firstPredicate.enumOptions) {
        return { type: "enum", enumOptions: firstPredicate.enumOptions };
      } else if (objectType === "reference" && firstPredicate.referenceResourceTypes) {
        return {
          type: "reference",
          referenceResourceTypes: firstPredicate.referenceResourceTypes,
        };
      } else if (["text", "number", "date"].includes(objectType)) {
        return { type: objectType as "text" | "number" | "date" };
      } else {
        console.warn(
          `Unsupported object type: ${objectType}. Defaulting to 'text'.`
        );
        return { type: "text" };
      }
    }

    return { type: "text" };
  };

  const { type: objectFieldType, enumOptions, referenceResourceTypes } =
    determineObjectFieldType();

  // 13. Render Form Fields Dynamically Based on Feature Configuration
  const renderFormFields = () => {
    const fields = feature.fields;

    return fields.map((field: FieldConfig) => {
      let {
        name,
        label,
        type,
        required,
        resourceTypes,
        multiple,
        options,
        placeholder,
        fetchPredicates,
      } = field;

      // Cast name to FormFieldName
      const fieldName = name as FormFieldName;

      // Determine if this field should be multiple
      if (fieldName === "predicate") {
        multiple = multipleField === "predicate";
      } else if (fieldName === "object") {
        multiple = multipleField === "object";
      }

      // Limit selection to a maximum of 3
      const maxSelection = 3;

      // Access errors using fieldName
      const fieldError = errors[fieldName]?.message;

      // Render based on field type
      switch (type) {
        case "autocomplete":
          return (
            <div key={fieldName} className="mb-4">
              <label
                htmlFor={fieldName}
                className="block font-medium mb-1 text-gray-700"
              >
                {label}
                {required && <span className="text-red-500"> *</span>}
              </label>
              <Controller
                name={fieldName}
                control={control}
                render={({ field }) => (
                  <AutocompleteSelect
                    value={field.value as string | string[]}
                    onChange={(value) => {
                      field.onChange(value);
                      // Update multipleField state
                      if (Array.isArray(value) && value.length > 1) {
                        setMultipleField(fieldName as "predicate" | "object");
                      } else if (Array.isArray(value) && value.length <= 1) {
                        setMultipleField(null);
                      }
                    }}
                    onBlur={field.onBlur} // Ensure AutocompleteSelect accepts onBlur
                    name={field.name}     // Ensure AutocompleteSelect accepts name
                    multiple={multiple || false}
                    resourceTypes={resourceTypes || []}
                    placeholder={placeholder || `Select ${label}`}
                    disabled={action === "read"}
                    fetchPredicates={fetchPredicates || false}
                    maxSelection={multiple ? 3 : undefined}
                  />
                )}
              />

              {fieldError && (
                <p className="text-red-500 text-sm mt-1">
                  {String(fieldError)}
                </p>
              )}
            </div>
          );
        case "select":
          if (fieldName === "object" && objectFieldType === "enum" && Array.isArray(enumOptions)) {
            return (
              <div key={fieldName} className="mb-4">
                <label
                  htmlFor={fieldName}
                  className="block font-medium mb-1 text-gray-700"
                >
                  {label}
                  {required && <span className="text-red-500"> *</span>}
                </label>
                <select
                  id={fieldName}
                  {...register(fieldName)}
                  disabled={action === "read"}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors[fieldName] ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select {label}</option>
                  {enumOptions.map((option: string) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
                {fieldError && (
                  <p className="text-red-500 text-sm mt-1">
                    {String(fieldError)}
                  </p>
                )}
              </div>
            );
          }

          if (
            fieldName === "object" &&
            objectFieldType === "reference" &&
            Array.isArray(referenceResourceTypes) &&
            referenceResourceTypes.length > 0
          ) {
            return (
              <div key={fieldName} className="mb-4">
                <label
                  htmlFor={fieldName}
                  className="block font-medium mb-1 text-gray-700"
                >
                  {label}
                  {required && <span className="text-red-500"> *</span>}
                </label>
                <Controller
                  name={fieldName}
                  control={control}
                  render={({ field }) => (
                    <AutocompleteSelect
                      value={field.value as string | string[]}
                      onChange={(value) => {
                        field.onChange(value);
                        // Update multipleField state
                        if (Array.isArray(value) && value.length > 1) {
                          setMultipleField(fieldName as "predicate" | "object");
                        } else if (Array.isArray(value) && value.length <= 1) {
                          setMultipleField(null);
                        }
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      multiple={multiple || false}
                      resourceTypes={resourceTypes || []}
                      placeholder={placeholder || `Select ${label}`}
                      disabled={action === "read"}
                      fetchPredicates={fetchPredicates || false}
                      maxSelection={multiple ? 3 : undefined}
                    />
                  )}
                />

                {fieldError && (
                  <p className="text-red-500 text-sm mt-1">
                    {String(fieldError)}
                  </p>
                )}
              </div>
            );
          }

          // Generic select handling for other fields
          return (
            <div key={fieldName} className="mb-4">
              <label
                htmlFor={fieldName}
                className="block font-medium mb-1 text-gray-700"
              >
                {label}
                {required && <span className="text-red-500"> *</span>}
              </label>
              <select
                id={fieldName}
                {...register(fieldName)}
                disabled={action === "read"}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[fieldName] ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select {label}</option>
                {options?.map((option: any) =>
                  typeof option === "string" ? (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ) : (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  )
                )}
              </select>
              {fieldError && (
                <p className="text-red-500 text-sm mt-1">
                  {String(fieldError)}
                </p>
              )}
            </div>
          );

        case "textarea":
          return (
            <div key={fieldName} className="mb-4">
              <label
                htmlFor={fieldName}
                className="block font-medium mb-1 text-gray-700"
              >
                {label}
                {required && <span className="text-red-500"> *</span>}
              </label>
              <textarea
                {...register(fieldName)}
                id={fieldName}
                placeholder={placeholder || label}
                disabled={action === "read"}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[fieldName] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {fieldError && (
                <p className="text-red-500 text-sm mt-1">
                  {String(fieldError)}
                </p>
              )}
            </div>
          );

        case "checkbox":
          return (
            <div key={fieldName} className="mb-4 flex items-center">
              <input
                {...register(fieldName)}
                type="checkbox"
                id={fieldName}
                disabled={action === "read"}
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={fieldName} className="block font-medium text-gray-700">
                {label}
              </label>
              {fieldError && (
                <p className="text-red-500 text-sm mt-1">
                  {String(fieldError)}
                </p>
              )}
            </div>
          );

        // Add more cases for different field types as needed

        default:
          return (
            <div key={fieldName} className="mb-4">
              <label
                htmlFor={fieldName}
                className="block font-medium mb-1 text-gray-700"
              >
                {label}
                {required && <span className="text-red-500"> *</span>}
              </label>
              <Input
                {...register(fieldName)}
                id={fieldName}
                type={type}
                placeholder={placeholder || label}
                disabled={action === "read"}
                required={required}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[fieldName] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {fieldError && (
                <p className="text-red-500 text-sm mt-1">
                  {String(fieldError)}
                </p>
              )}
            </div>
          );
      }
    });
  };

  // 14. Render Existing Triples
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
