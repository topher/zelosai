// components/modals/DynamicResourceModal.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form'; 
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from "react-hot-toast";
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { features } from '@/config/features';
import { Button } from '@/components/ui/button';
import Input from '@/app/components/atomic/atoms/Input';
import AutocompleteSelect from '@/app/components/atomic/AutocompleteSelect';
import { Subscription } from '@/app/types';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { FeatureKey } from '@/config/featuresConfig'; // Import FeatureKey
import { Pencil, Trash } from 'lucide-react'; // Import icons

export interface DynamicResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceType: FeatureKey;
  action: 'create' | 'read' | 'update' | 'delete';
  resourceId?: string;
  initialData?: any;
  onSuccess?: (result: any) => void;
}

export const DynamicResourceModal: React.FC<DynamicResourceModalProps> = ({
  isOpen,
  onClose,
  resourceType,
  action,
  resourceId,
  initialData,
  onSuccess,
}) => {
  console.log("DynamicResourceModal Props:", { isOpen, resourceType, action, resourceId, initialData });

  const feature = features[resourceType];
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [subLoading, setSubLoading] = useState<boolean>(false);
  const [subError, setSubError] = useState<string | null>(null);

  if (!feature) {
    console.error(`Feature config not found for resource type: ${resourceType}`);
    return null;
  }

  const schema = feature.schema;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {},
  });

  useEffect(() => {
    console.log("DynamicResourceModal useEffect: resetting form with initialData:", initialData);
    reset(initialData || {});
  }, [initialData, reset]);

  useEffect(() => {
    const fetchSubscription = async () => {
      setSubLoading(true);
      setSubError(null);
      try {
        const response = await fetch('/api/subscriptions', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // Ensure cookies are sent for authentication
        });

        if (response.ok) {
          const data = await response.json();
          console.log('DynamicResourceModal: Fetched subscription data:', data);
          setSubscription(data.subscription);
        } else {
          const errorData = await response.json();
          console.error('DynamicResourceModal: Failed to fetch subscription:', errorData.error);
          setSubError(errorData.error || 'Failed to fetch subscription.');
        }
      } catch (error) {
        console.error('DynamicResourceModal: Error fetching subscription:', error);
        setSubError('Error fetching subscription.');
      } finally {
        setSubLoading(false);
      }
    };

    if (isOpen) {
      fetchSubscription();
    }
  }, [isOpen]);

  if (!isOpen) {
    return null; // Do not render the modal if it's not open
  }

  if (subLoading) {
    console.log("DynamicResourceModal: Subscription is loading...");
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="flex items-center justify-center p-6">
          <div className="text-center">
            <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <p className="text-gray-700">Loading subscription...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (subError) {
    console.error("DynamicResourceModal: Subscription error:", subError);
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="p-6">
          <DialogHeader>
            <DialogTitle className="text-red-600">Error</DialogTitle>
          </DialogHeader>
          <div className="p-4 text-center text-red-500">Error: {subError}</div>
          <DialogFooter>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (!subscription) {
    console.error("DynamicResourceModal: No subscription data.");
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="p-6">
          <DialogHeader>
            <DialogTitle className="text-red-600">No Subscription Data</DialogTitle>
          </DialogHeader>
          <div className="p-4 text-center text-red-500">No subscription data available.</div>
          <DialogFooter>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  const { isFeatureAllowed, performAction } = useFeatureAccess(subscription);

  const router = useRouter();

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log("DynamicResourceModal: Form submitted with data:", data);
    setLoading(true);
    setApiError(null);

    console.log("DynamicResourceModal: isFeatureAllowed", resourceType, action);


    // Check if action is allowed
    const allowed = await isFeatureAllowed(resourceType, action);
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
        await performAction(resourceType, action);
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

  // Render form fields dynamically based on featureConfig
  const renderFormFields = () => {
    const fields = feature.fields;

    return fields.map((field) => {
      const { name, label, type, required, resourceTypes, multiple } = field;

      if (type === 'autocomplete') {
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
                  resourceTypes={resourceTypes}
                  placeholder={`Select ${label}`}
                  disabled={action === 'read'}
                />
              )}
            />
            {errors[name]?.message && (
              <p className="text-red-500 text-sm mt-1">{String(errors[name]?.message)}</p>
            )}
          </div>
        );
      }

      // Handle other field types (text, textarea, date, etc.)
      return (
        <div key={name} className="mb-4">
          <label htmlFor={name} className="block font-medium mb-1 text-gray-700">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
          <Input
            id={name}
            type={type}
            {...register(name)}
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
    });
  };

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
                <Button type="submit" disabled={loading} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white">
                  {loading ? 'Processing...' : (action === 'delete' ? 'Delete' : `${action.charAt(0).toUpperCase() + action.slice(1)}`)}
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
