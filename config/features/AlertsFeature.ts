import * as Yup from 'yup';
import { BellIcon } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const alertsFeature: Feature = {
    key: FeatureKey.Alerts,
    schema: Yup.object().shape({
        title: Yup.string().required('Title is required'),
        message: Yup.string().required('Message is required'),
        severity: Yup.string().required('Severity is required'),
        date: Yup.string().required('Date is required'),
        tags: Yup.array().of(Yup.string()).required('Tags are required'),
        relatedGoals: Yup.array().of(Yup.string()),
    }),
    fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'message', label: 'Message', type: 'textarea', required: true },
        { name: 'severity', label: 'Severity', type: 'text', required: true },
        { name: 'date', label: 'Date', type: 'text', required: true },
        { name: 'tags', label: 'Tags', type: 'autocomplete', required: true },
        { name: 'relatedGoals', label: 'Related Goals', type: 'autocomplete' },
    ],
    actions: [
        {
            actionKey: ActionFeatureKey.ReadAlert,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [5, 20, 100],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateAlert,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [2, 10, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateAlert,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [2, 10, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteAlert,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [1, 5, 20],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Dashboard,
        icon: BellIcon,
        label: 'Alerts',
        href: '/dashboard/alerts',
        description: 'Manage alert notifications.',
        isInProd: true,
        resourceName: 'alerts',
        resourceType: 'Alert',
    },
};