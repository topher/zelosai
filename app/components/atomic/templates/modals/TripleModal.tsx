// /app/components/atomic/templates/modals/TripleModal.tsx

"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import Input from "@/app/components/atomic/atoms/Input";
import AutocompleteSelect from "@/app/components/atomic/AutocompleteSelect";
import { Triple, Predicate, ProfileType } from "@/app/types";
import { toast } from "react-hot-toast";
import { predicates } from "@/config/predicates"; // Ensure correct import
import { features } from "@/config/features";
import { FeatureKey, Feature } from "@/config/featuresConfig";
import { getFeatureKeyFromResourceType } from "@/lib/featureUtils";
import { ResourceType } from "@/config/resourceTypes"; // Ensure correct import
import { LucideIcon } from "lucide-react"; // Import LucideIcon type

interface TripleModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: "create" | "update" | "read";
  tripleId?: string;
  initialData?: Triple;
  profileId?: string; // Added profileId
  profileType?: ProfileType; // Added profileType
  onSuccess?: (result: Triple) => void;
}

export const TripleModal: React.FC<TripleModalProps> = ({
  isOpen,
  onClose,
  action,
  tripleId,
  initialData,
  profileId, // Destructure profileId
  profileType,
  onSuccess,
}) => {
  // 1. Retrieve the FeatureKey for 'triples'
  const featureKey = FeatureKey.Triples; // 🔍 Ensure this matches your FeatureKey enum

  // 2. Access the feature configuration
  const feature: Feature | undefined = features[featureKey];

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
  } = useForm<Triple>({
    resolver: yupResolver(feature.schema), // 🛠️ Imported schema
    defaultValues: initialData || {
      subject: "",
      predicate: "",
      object: "",
      citation: "",
      visibility: "public",
      profileId: profileId, // Initialize with passed profileId
      type: profileType || "",
    },
  });

  // 4. Reset form when initialData or profileId changes
  useEffect(() => {
    reset(initialData || {
      subject: "",
      predicate: "",
      object: "",
      citation: "",
      visibility: "public",
      profileId: profileId, // Ensure profileId is set
      type: profileType || "",
    });
  }, [initialData, reset, profileId]);

  const onSubmit: SubmitHandler<Triple> = async (data) => {
    try {
      const method = action === "create" ? "POST" : "PUT";
      const url =
        action === "create"
          ? `/api/resource/triples`
          : `/api/resource/triples/${tripleId}`;

      const payload = {
        ...data,
        profileId, // Ensure profileId is included
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          `Triple ${action === "create" ? "created" : "updated"} successfully.`
        );
        onSuccess?.(result);
        onClose();
      } else {
        toast.error(result.message || "Failed to process triple.");
      }
    } catch (error) {
      console.error("Error processing triple:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  // Watch the selected predicate to determine object field type
  const selectedPredicate = watch("predicate");

  // Retrieve the PredicateConfig based on selected predicate
  const selectedPredicateConfig: Predicate | undefined =
    selectedPredicate ? predicates[selectedPredicate] : undefined;

  // Determine object field type based on PredicateConfig
  const determineObjectFieldType = (): {
    type: "text" | "number" | "date" | "enum" | "reference";
    enumOptions?: string[];
    referenceResourceTypes?: ResourceType[];
  } => {
    if (selectedPredicateConfig) {
      const objectTypes = selectedPredicateConfig.applicableObjectResourceTypes;

      if (
        objectTypes.includes(ResourceType.ScalarEnum) &&
        selectedPredicateConfig.enumOptions
      ) {
        return { type: "enum", enumOptions: selectedPredicateConfig.enumOptions };
      } else if (objectTypes.includes(ResourceType.ScalarDate)) {
        return { type: "date" };
      } else if (objectTypes.includes(ResourceType.ScalarString)) {
        return { type: "text" };
      } else if (
        objectTypes.some((rt) =>
          rt.startsWith("Profile") || rt.startsWith("Searchable")
        )
      ) {
        return {
          type: "reference",
          referenceResourceTypes: objectTypes.filter((rt) =>
            rt.startsWith("Profile") || rt.startsWith("Searchable")
          ),
        };
      }
      // Add other cases as necessary
    }

    return { type: "text" };
  };

  const { type: objectFieldType, enumOptions, referenceResourceTypes } =
    determineObjectFieldType();

  // Render Object Field based on determined type
  const renderObjectField = () => {
    switch (objectFieldType) {
      case "enum":
        return (
          <div className="mb-4">
            <label
              htmlFor="object"
              className="block font-medium mb-1 text-gray-700"
            >
              Object<span className="text-red-500"> *</span>
            </label>
            <select
              {...register("object")}
              id="object"
              disabled={action === "read"}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.object ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Object</option>
              {enumOptions?.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
            {errors.object && (
              <p className="text-red-500 text-sm mt-1">
                {errors.object.message}
              </p>
            )}
          </div>
        );
      case "date":
        return (
          <div className="mb-4">
            <label
              htmlFor="object"
              className="block font-medium mb-1 text-gray-700"
            >
              Object<span className="text-red-500"> *</span>
            </label>
            <Input
              {...register("object")}
              id="object"
              type="date"
              placeholder="Select date"
              disabled={action === "read"}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.object ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.object && (
              <p className="text-red-500 text-sm mt-1">
                {errors.object.message}
              </p>
            )}
          </div>
        );
      case "reference":
        return (
          <div className="mb-4">
            <label
              htmlFor="object"
              className="block font-medium mb-1 text-gray-700"
            >
              Object<span className="text-red-500"> *</span>
            </label>
            <Controller
              name="object"
              control={control}
              render={({ field }) => (
                <AutocompleteSelect
                  {...field}
                  multiple={false}
                  resourceTypes={referenceResourceTypes || []}
                  placeholder="Select an object"
                  disabled={action === "read"}
                  fetchPredicates={false} // Assuming predicates are not needed here
                  icons={true} // Enable icon rendering
                  profileType={profileType}
                />
              )}
            />
            {errors.object && (
              <p className="text-red-500 text-sm mt-1">
                {errors.object.message}
              </p>
            )}
          </div>
        );
      default:
        return (
          <div className="mb-4">
            <label
              htmlFor="object"
              className="block font-medium mb-1 text-gray-700"
            >
              Object<span className="text-red-500"> *</span>
            </label>
            <Input
              {...register("object")}
              id="object"
              type="text"
              placeholder="Enter object"
              disabled={action === "read"}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.object ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.object && (
              <p className="text-red-500 text-sm mt-1">
                {errors.object.message}
              </p>
            )}
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {action === "create"
              ? "Create Triple"
              : action === "update"
              ? "Update Triple"
              : "View Triple"}{" "}
            {/* 🎨 Adjusted for 'read' action */}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          {/* Subject Field */}
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block font-medium mb-1 text-gray-700"
            >
              Subject<span className="text-red-500"> *</span>
            </label>
            <Input
                {...register("subject")}
                id="subject"
                type="text"
                placeholder="Enter subject URI"
                disabled={true} // Disable editing
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                }`}
              />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Predicate Field */}
          <div className="mb-4">
            <label
              htmlFor="predicate"
              className="block font-medium mb-1 text-gray-700"
            >
              Predicate<span className="text-red-500"> *</span>
            </label>
            <Controller
              name="predicate"
              control={control}
              render={({ field }) => (
                <AutocompleteSelect
                  {...field}
                  multiple={false}
                  resourceTypes={["Predicate"]} // 🛠️ Adjust as necessary
                  placeholder="Select a predicate"
                  disabled={action === "update" || action === "read"} // 🔒 Disabled for 'update' and 'read'
                  fetchPredicates={true} // ✅ Enabled fetching predicates
                  icons={true} // Enable icon rendering
                  profileType={profileType}
                />
              )}
            />
            {errors.predicate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.predicate.message}
              </p>
            )}
          </div>

          {/* Object Field */}
          {renderObjectField()}

          {/* Citation Field */}
          <div className="mb-4">
            <label
              htmlFor="citation"
              className="block font-medium mb-1 text-gray-700"
            >
              Citation
            </label>
            <Input
              {...register("citation")}
              id="citation"
              type="text"
              placeholder="Enter citation (optional)"
              disabled={action === "read"}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.citation ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.citation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.citation.message}
              </p>
            )}
          </div>

          {/* Visibility Field */}
          <div className="mb-4">
            <label
              htmlFor="visibility"
              className="block font-medium mb-1 text-gray-700"
            >
              Visibility<span className="text-red-500"> *</span>
            </label>
            <select
              {...register("visibility")}
              id="visibility"
              disabled={action === "read"}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.visibility ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Visibility</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="restricted">Restricted</option>
            </select>
            {errors.visibility && (
              <p className="text-red-500 text-sm mt-1">
                {errors.visibility.message}
              </p>
            )}
          </div>

          {/* Profile ID Field */}
          <div className="mb-4">
            <label
              htmlFor="profileId"
              className="block font-medium mb-1 text-gray-700"
            >
              Profile ID<span className="text-red-500"> *</span>
            </label>
            <Input
              {...register("profileId")}
              id="profileId"
              type="text"
              placeholder="Enter profile ID"
              disabled={action === "read"} // 🔒 Disabled for 'read'
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.profileId ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.profileId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.profileId.message}
              </p>
            )}
          </div>

          {/* Type Field */}
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block font-medium mb-1 text-gray-700"
            >
              Type<span className="text-red-500"> *</span>
            </label>
            <select
              {...register("type")}
              id="type"
              disabled={action === "read"}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.type ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Type</option>
              <option value={ResourceType.ProfileAthlete}>Athlete</option>
              <option value={ResourceType.ProfileBrand}>Brand</option>
              <option value={ResourceType.ProfileUser}>User</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">
                {errors.type.message}
              </p>
            )}
          </div>

          <DialogFooter className="flex justify-end space-x-4">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            {/* Show submit button only for 'create' and 'update' actions */}
            {(action === "create" || action === "update") && (
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {action === "create" ? "Create" : "Update"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TripleModal;
