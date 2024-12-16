import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const tasksFeature: Feature = {
    key: FeatureKey.Tasks,
    schema: Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string(),
        status: Yup.string().required('Status is required'),
        priority: Yup.string().required('Priority is required'),
        stageId: Yup.string().required('Stage ID is required'),
        relatedWorkflows: Yup.array().of(Yup.string()),
        relatedAgents: Yup.array().of(Yup.string()),
    }),
    actions: [
        {
            actionKey: ActionFeatureKey.ReadTask,
            action: 'read',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 10, 100],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateTask,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 5, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateTask,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 5, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteTask,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [0, 2, 20],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Workflows,
        icon: Target,
        label: 'Tasks',
        href: '/workflows/tasks',
        description: 'Manage your tasks.',
        isInProd: false,
        resourceName: 'tasks',
        resourceType: ResourceType.Task,
        maxResourceCount: [0, 10, 100],
        agentId: 'leadTasksAgent',
        requiredPredicates: [],
        defaultPredicates: {
              "title": "required",
              "description": "allowed",
              "status": "required",
              "priority": "required",
              "stage_id": "required",
              "related_workflows": "allowed",
              "related_agents": "allowed"
            }
    },
};
