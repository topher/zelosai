// /app/components/atomic/templates/modals/DynamicResourceModal.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form'; 
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from "react-hot-toast";
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { features } from '@/config/features'; // Correct Import Path

import { FeatureKey, FieldConfig, Feature } from '@/config/featuresConfig'; // Correct Import Path
import { getFeatureKeyFromResourceType } from '@/lib/featureUtils'; // Correct Import Path
import { Button } from '@/components/ui/button';
import Input from '@/app/components/atomic/atoms/Input';
import AutocompleteSelect from '@/app/components/atomic/AutocompleteSelect';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Pencil, Trash } from 'lucide-react'; // Import icons
import { ResourceType } from '@/config/resourceTypes';

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
    return null; // Optionally, render an error modal/message
  }

  // 2. Access the feature configuration
  const feature: Feature | undefined = features[featureKey as FeatureKey]; // Type Assertion

  if (!feature) {
    console.error(`Feature config not found for FeatureKey: ${featureKey}`);
    return null; // Optionally, render an error modal/message
  }

  // 3. Initialize react-hook-form with Yup resolver
  const {
    register,
    handleSubmit,
    control,
    reset,
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

  // 7. Handle Form Submission
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
      let response;
      if (action === 'create') {
        console.log("DynamicResourceModal: Performing create action.");
        response = await fetch(`/api/resource/${feature.metadata.resourceName}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } else if (action === 'update' && resourceId) {
        console.log("DynamicResourceModal: Performing update action.", JSON.stringify(resourceId));
        response = await fetch(`/api/resource/${feature.metadata.resourceName}/${resourceId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } else if (action === 'delete' && resourceId) {
        // Confirm deletion
        if (!confirm('Are you sure you want to delete this item?')) {
          setLoading(false);
          return;
        }
        console.log("DynamicResourceModal: Performing delete action.");
        response = await fetch(`/api/resource/${feature.metadata.resourceName}/${resourceId}`, {
          method: 'DELETE',
        });
      } else {
        console.log("DynamicResourceModal: Invalid action or missing resource ID.");
        setLoading(false);
        toast.error('Invalid action or missing resource ID.');
        return;
      }

      const result = await response.json();
      console.log("DynamicResourceModal: API response:", result);

      if (response.ok) {
        // Update feature usage
        await performAction(featureKey, action);
        console.log("DynamicResourceModal: Action performed successfully.");

        toast.success(`${feature.metadata.label} ${action === 'delete' ? 'deleted' : `${action}d`} successfully.`);
        onSuccess?.(result);
        onClose();
      } else {
        setApiError(result.message || 'An error occurred.');
        toast.error(result.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('DynamicResourceModal: API error:', error);
      setApiError('An unexpected error occurred.');
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // 8. Render Form Fields Dynamically Based on Feature Configuration
  const renderFormFields = () => {
    const fields = feature.fields;

    return fields.map((field: FieldConfig) => {
      const { name, label, type, required, resourceTypes, multiple, options, placeholder } = field;

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
                  />
                )}
              />
              {errors[name]?.message && (
                <p className="text-red-500 text-sm mt-1">{String(errors[name]?.message)}</p>
              )}
            </div>
          );

        case 'select':
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
                    {option.charAt(0).toUpperCase() + option.slice(1)}
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

        // Add more cases for different field types as needed

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
      }
    });
  };

  // 9. Render the Modal with Form
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            {action.charAt(0).toUpperCase() + action.slice(1)} {feature.metadata.label}
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          {apiError && <p className="text-red-500 mb-4">{apiError}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderFormFields()}
            <DialogFooter className="mt-6 flex justify-end space-x-4">
              <Button variant="secondary" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              {action !== 'read' && (
                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading 
                    ? 'Processing...' 
                    : (action === 'delete' ? 'Delete' : `${action.charAt(0).toUpperCase() + action.slice(1)}`)}
                </Button>
              )}
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DynamicResourceModal;
