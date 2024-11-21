// /app/components/atomic/templates/modals/DynamicResourceModal.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form'; 
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from "react-hot-toast";
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { features } from '@/config/features'; 
import { FeatureKey, FieldConfig, Feature } from '@/config/featuresConfig'; 
import { getFeatureKeyFromResourceType } from '@/lib/featureUtils'; 
import { Button } from '@/components/ui/button';
import Input from '@/app/components/atomic/atoms/Input';
import AutocompleteSelect from '@/app/components/atomic/AutocompleteSelect';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Pencil, Trash } from 'lucide-react'; 
import { ResourceType } from '@/config/resourceTypes';
import { Triple } from '@/app/types';
import TripleCardObject from '../../organisms/cards/triple-cards/TripleCardObject';
import { predicates } from '@/config/predicates'; // Ensure predicates are imported correctly
import { Predicate } from "@/app/types";

// Define the Option interface
interface Option {
  value: string;
  label: string;
}

export interface DynamicResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceType: ResourceType;
  action: 'create' | 'read' | 'update' | 'delete';
  resourceId?: string;
  initialData?: any;
  onSuccess?: (result: any) => void;
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

  // 3. Initialize react-hook-form with Yup resolver
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(feature.schema),
    defaultValues: initialData || {},
  });

  // 4. Reset form when initialData changes
  useEffect(() => {
    console.log("DynamicResourceModal useEffect: resetting form with initialData:", initialData);
    reset(initialData || {});
  }, [initialData, reset]);

  // 5. Local State for Loading and API Errors
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const router = useRouter();

  // 6. Use the custom hook for feature access
  const { isFeatureAllowed, performAction, subscription } = useFeatureAccess();

  // 7. State to manage existing triples
  const [existingTriples, setExistingTriples] = useState<Triple[]>([]);

  useEffect(() => {
    if ((action === 'read' || action === 'update') && resourceId) {
      // Fetch existing triples related to the resource
      const fetchExistingTriples = async () => {
        try {
          const response = await fetch(`/api/resource/${feature.metadata.resourceName}?subject=${resourceId}`);
          if (response.ok) {
            const data = await response.json();
            setExistingTriples(data.resources);
          } else {
            console.error('Failed to fetch existing triples');
          }
        } catch (error) {
          console.error('Error fetching existing triples:', error);
        }
      };
      fetchExistingTriples();
    }
  }, [action, resourceId, feature.metadata.resourceName]);

  // 8. Define handleEditTriple function
  const handleEditTriple = (triple: Triple): void => {
    // Open the modal in 'update' mode with the selected triple's data
    setModalAction('update');
    setSelectedTriple(triple);
    setTripleModalOpen(true);
  };

  // 9. Define handleDeleteTriple function
  const handleDeleteTriple = async (tripleId: string): Promise<void> => {
    if (confirm("Are you sure you want to delete this triple?")) {
      try {
        const response = await fetch(`/api/resource/${feature.metadata.resourceName}/${tripleId}`, {
          method: 'DELETE',
        });

        const result = await response.json();

        if (response.ok) {
          setExistingTriples((prev: Triple[]) => prev.filter((t: Triple) => t.id !== tripleId));
          toast.success('Triple deleted successfully.');
          onSuccess?.(result);
        } else {
          setApiError(result.message || 'Failed to delete triple.');
          toast.error(result.message || 'Failed to delete triple.');
        }
      } catch (error) {
        console.error('Error deleting triple:', error);
        setApiError('An unexpected error occurred.');
        toast.error('An unexpected error occurred.');
      }
    }
  };

  // 10. State to manage modal for editing/creating triples
  const [isTripleModalOpen, setTripleModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<'create' | 'update'>('create');
  const [selectedTriple, setSelectedTriple] = useState<Triple | null>(null);

  // 11. Handle Form Submission
  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log("DynamicResourceModal: Form submitted with data:", data);
    setLoading(true);
    setApiError(null);

    console.log("DynamicResourceModal: isFeatureAllowed", featureKey, action);

    // Check if action is allowed
    const allowed = await isFeatureAllowed(featureKey, action);
    if (!allowed) {
      console.log("DynamicResourceModal: Action not allowed.");
      toast.error('Action not allowed due to limits or insufficient credits.');
      setLoading(false);
      return;
    }

    // Perform the action
    try {
      if (action === 'create' || action === 'update') {
        // For 'create' and 'update', handle multiple predicates
        const predicatesSelected: string[] = data.predicates || [];
        const triplesToCreateOrUpdate: Partial<Triple>[] = predicatesSelected.map((predicate, index) => ({
          id: action === 'update' && existingTriples[index] ? existingTriples[index].id : undefined, // Include the id if updating
          subject: data.subject,
          predicate,
          object: data.object,
          citation: data.citation,
          visibility: data.visibility,
          profileId: data.profileId,
          type: data.type, // Ensure 'type' is part of the form data
        }));

        if (action === 'create') {
          // Create multiple triples
          const createPromises = triplesToCreateOrUpdate.map(triple =>
            fetch(`/api/resource/${feature.metadata.resourceName}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(triple),
            })
          );

          const responses = await Promise.all(createPromises);
          const results = await Promise.all(responses.map(res => res.json()));

          const allCreated = responses.every(res => res.ok);
          if (allCreated) {
            // Update feature usage
            await performAction(featureKey, action);
            console.log("DynamicResourceModal: Action performed successfully.");

            toast.success(`${feature.metadata.label} created successfully.`);
            onSuccess?.(results); // Pass all created triples
            onClose();
          } else {
            const errorMessages = results.map((res, idx) => res.message || `Failed to create triple ${idx + 1}`).join(', ');
            setApiError(errorMessages);
            toast.error(errorMessages);
          }
        } else if (action === 'update' && resourceId) {
          // Update multiple triples
          const updatePromises = triplesToCreateOrUpdate.map(triple => {
            if (!triple.id) {
              // If there's no id, skip updating this triple
              return Promise.resolve({ ok: false, json: async () => ({ message: 'Triple ID is missing.' }) });
            }
            return fetch(`/api/resource/${feature.metadata.resourceName}/${triple.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(triple),
            });
          });

          const responses = await Promise.all(updatePromises);
          const results = await Promise.all(responses.map(res => res.json()));

          const allUpdated = responses.every(res => res.ok);
          if (allUpdated) {
            // Update feature usage
            await performAction(featureKey, action);
            console.log("DynamicResourceModal: Action performed successfully.");

            toast.success(`${feature.metadata.label} updated successfully.`);
            onSuccess?.(results); // Pass all updated triples
            onClose();
          } else {
            const errorMessages = results.map((res, idx) => res.message || `Failed to update triple ${idx + 1}`).join(', ');
            setApiError(errorMessages);
            toast.error(errorMessages);
          }
        }
      } else if (action === 'delete' && resourceId) {
        // Handle delete action
        const response = await fetch(`/api/resource/${feature.metadata.resourceName}/${resourceId}`, {
          method: 'DELETE',
        });

        const result = await response.json();
        console.log("DynamicResourceModal: API response:", result);

        if (response.ok) {
          // Update feature usage
          await performAction(featureKey, action);
          console.log("DynamicResourceModal: Action performed successfully.");

          toast.success(`${feature.metadata.label} deleted successfully.`);
          onSuccess?.(result);
          onClose();
        } else {
          setApiError(result.message || 'An error occurred.');
          toast.error(result.message || 'An error occurred.');
        }
      } else {
        console.log("DynamicResourceModal: Invalid action or missing resource ID.");
        setLoading(false);
        toast.error('Invalid action or missing resource ID.');
        return;
      }
    } catch (error) {
      console.error('DynamicResourceModal: API error:', error);
      setApiError('An unexpected error occurred.');
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // 12. Function to determine object field type based on selected predicates
  const determineObjectFieldType = (): { 
    type: 'text' | 'number' | 'date' | 'enum' | 'reference'; 
    enumOptions?: string[]; 
    referenceResourceTypes?: ResourceType[] 
  } => {
    if (selectedPredicates.length === 0) {
      return { type: 'text' };
    }

    const firstPredicate = predicates.find(p => p.id === selectedPredicates[0]);
    if (firstPredicate) {
      const objectType = firstPredicate.applicableObjectResourceTypes[0] as unknown as 'text' | 'number' | 'date' | 'enum' | 'reference'; // Type assertion

      if (objectType === 'enum') {
        return { type: 'enum', enumOptions: firstPredicate.enumOptions };
      } else if (objectType === 'reference') {
        return { type: 'reference', referenceResourceTypes: firstPredicate.referenceResourceTypes };
      } else if (['text', 'number', 'date'].includes(objectType)) {
        return { type: objectType };
      } else {
        console.warn(`Unsupported object type: ${objectType}. Defaulting to 'text'.`);
        return { type: 'text' };
      }
    }

    return { type: 'text' };
  };

  const selectedPredicates = watch('predicates') || [];

  const { type: objectFieldType, enumOptions, referenceResourceTypes } = determineObjectFieldType();

  // 13. Render Form Fields Dynamically Based on Feature Configuration
  const renderFormFields = () => {
    const fields = feature.fields;

    return fields.map((field: FieldConfig) => {
      const { name, label, type, required, resourceTypes, multiple, options, placeholder, fetchPredicates } = field;

      // Render based on field type
      switch (type) {
        case 'autocomplete':
          return (
            <div key={name} className="mb-4">
              <label htmlFor={name} className="block font-medium mb-1 text-gray-700">
                {label}
                {required && <span className="text-red-500"> *</span>}
              </label>
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <AutocompleteSelect
                    {...field}
                    multiple={multiple}
                    resourceTypes={resourceTypes || []}
                    placeholder={placeholder || `Select ${label}`}
                    disabled={action === 'read'}
                    fetchPredicates={fetchPredicates || false}
                  />
                )}
              />
              {errors[name]?.message && (
                <p className="text-red-500 text-sm mt-1">{String(errors[name]?.message)}</p>
              )}
            </div>
          );

        case 'select':
          if (name === 'object' && objectFieldType === 'enum' && enumOptions) {
            return (
              <div key={name} className="mb-4">
                <label htmlFor={name} className="block font-medium mb-1 text-gray-700">
                  {label}
                  {required && <span className="text-red-500"> *</span>}
                </label>
                <select
                  id={name}
                  {...register(name)}
                  disabled={action === 'read'}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors[name] ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select {label}</option>
                  {enumOptions.map(option => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
                {errors[name]?.message && (
                  <p className="text-red-500 text-sm mt-1">{String(errors[name]?.message)}</p>
                )}
              </div>
            );
          }

          if (name === 'object' && objectFieldType === 'reference' && referenceResourceTypes && referenceResourceTypes.length > 0) {
            return (
              <div key={name} className="mb-4">
                <label htmlFor={name} className="block font-medium mb-1 text-gray-700">
                  {label}
                  {required && <span className="text-red-500"> *</span>}
                </label>
                <Controller
                  name={name}
                  control={control}
                  render={({ field }) => (
                    <AutocompleteSelect
                      {...field}
                      multiple={false}
                      resourceTypes={referenceResourceTypes.map(rt => rt)} // Assuming ResourceType has a 'name' property
                      placeholder={`Select a ${label}`}
                      disabled={action === 'read'}
                      fetchPredicates={false} // References typically don't involve predicates
                    />
                  )}
                />
                {errors[name]?.message && (
                  <p className="text-red-500 text-sm mt-1">{String(errors[name]?.message)}</p>
                )}
              </div>
            );
          }

          return (
            <div key={name} className="mb-4">
              <label htmlFor={name} className="block font-medium mb-1 text-gray-700">
                {label}
                {required && <span className="text-red-500"> *</span>}
              </label>
              <select
                id={name}
                {...register(name)}
                disabled={action === 'read'}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[name] ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select {label}</option>
                {options?.map(option => (
                  <option key={option} value={option}>
                    {(option.charAt(0).toUpperCase() + option.slice(1))}
                  </option>
                ))}
              </select>
              {errors[name]?.message && (
                <p className="text-red-500 text-sm mt-1">{String(errors[name]?.message)}</p>
              )}
            </div>
          );

        case 'textarea':
          return (
            <div key={name} className="mb-4">
              <label htmlFor={name} className="block font-medium mb-1 text-gray-700">
                {label}
                {required && <span className="text-red-500"> *</span>}
              </label>
              <textarea
                {...register(name)}
                id={name}
                placeholder={placeholder || label}
                disabled={action === 'read'}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[name] ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors[name]?.message && (
                <p className="text-red-500 text-sm mt-1">{String(errors[name]?.message)}</p>
              )}
            </div>
          );

        case 'checkbox':
          return (
            <div key={name} className="mb-4 flex items-center">
              <input
                {...register(name)}
                type="checkbox"
                id={name}
                disabled={action === 'read'}
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={name} className="block font-medium text-gray-700">
                {label}
              </label>
              {errors[name]?.message && (
                <p className="text-red-500 text-sm mt-1">{String(errors[name]?.message)}</p>
              )}
            </div>
          );

        default:
          return (
            <div key={name} className="mb-4">
              <label htmlFor={name} className="block font-medium mb-1 text-gray-700">
                {label}
                {required && <span className="text-red-500"> *</span>}
              </label>
              <Input
                {...register(name)}
                id={name}
                type={type}
                placeholder={placeholder || label}
                disabled={action === 'read'}
                required={required}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[name] ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors[name]?.message && (
                <p className="text-red-500 text-sm mt-1">{String(errors[name]?.message)}</p>
              )}
            </div>
          );
      };
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
            onUpdateTriple={(updatedTriples: Triple[]) => {
              // Update the existingTriples state with updated triples
              setExistingTriples((prev: Triple[]) => prev.map((t: Triple) => t.id === triple.id ? updatedTriples[0] : t));
              onSuccess?.(updatedTriples);
            }}
            onDeleteTriple={handleDeleteTriple}
            onEditTriple={handleEditTriple}
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
            {apiError && <p className="text-red-500 mb-4">{apiError}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
              {renderFormFields()}

              {/* Existing Triples Section (for 'read' or 'update' actions) */}
              {(action === 'read' || action === 'update') && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Existing Triples</h3>
                  {renderExistingTriples()}
                </div>
              )}

              <DialogFooter className="mt-6 flex justify-end space-x-4">
                <Button variant="secondary" onClick={onClose} disabled={loading}>
                  Cancel
                </Button>
                {(action === 'create' || action === 'update') && (
                  <Button 
                    type="submit" 
                    disabled={loading} 
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {loading 
                      ? 'Processing...' 
                      : `${action.charAt(0).toUpperCase() + action.slice(1)}`}
                  </Button>
                )}
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Triple Modal for Creating or Updating a Triple */}
      {isTripleModalOpen && (
        <DynamicResourceModal
          isOpen={isTripleModalOpen}
          onClose={() => setTripleModalOpen(false)}
          resourceType={ResourceType.Triple}
          action={modalAction}
          resourceId={selectedTriple?.id}
          initialData={selectedTriple}
          onSuccess={(result: any) => {
            if (modalAction === 'create') {
              setExistingTriples((prev: Triple[]) => [...prev, ...result]);
            } else if (modalAction === 'update') {
              setExistingTriples((prev: Triple[]) => prev.map((t: Triple) => t.id === result[0].id ? result[0] : t));
            }
            toast.success('Triple successfully processed.');
            onSuccess?.(result);
            setTripleModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default DynamicResourceModal;
