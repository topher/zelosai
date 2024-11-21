// utils/errorHandler.ts

import { toast } from 'react-toastify';
import { formatError } from './errorFormatter';
import { ProModal } from '@/app/components/atomic/ttemplates/modals/pro-modal';
import { PurchaseCreditsModal } from '@/app/components/atomic/ttemplates/modals/purchase-credits-modal';

let openModal: (modalType: string) => void;

export function setOpenModalFunction(fn: (type: string) => void) {
  openModal = fn;
}

export function handleApiError(errorResponse: any) {
  const { code, message } = errorResponse.error;

  switch (code) {
    case 'INSUFFICIENT_CREDITS':
      openModal('purchaseCredits');
      break;
    case 'FEATURE_LIMIT_REACHED':
      openModal('upgradeSubscription');
      break;
    case 'PROFILE_LIMIT_REACHED':
      openModal('purchaseCredits'); // Or a specific modal for profile limits
      break;
    case 'ACCESS_DENIED_BY_POLICY':
      toast.error(message);
      break;
    case 'SUBSCRIPTION_TIER_LIMIT':
      openModal('upgradeSubscription');
      break;
    case 'AUTHENTICATION_FAILURE':
      window.location.href = '/sign-up';
      break;
    case 'RESOURCE_NOT_FOUND':
      toast.error('Resource not found.');
      break;
    case 'INTERNAL_SERVER_ERROR':
      toast.error('An unexpected error occurred. Please try again later.');
      break;
    case 'INVALID_FEATURE':
      toast.error('Invalid feature requested.');
      break;
    case 'INVALID_RESOURCE_TYPE':
      toast.error('Invalid resource type.');
      break;
    case 'ACTION_NOT_ALLOWED':
      toast.error('This action is not allowed.');
      break;
    case 'UNAUTHORIZED_ACCESS':
      toast.error('Unauthorized access.');
      break;
    case 'CREDIT_DEDUCTION_FAILED':
      toast.error('Failed to deduct credits. Please try again.');
      break;
    case 'RESOURCE_CREATION_FAILED':
      toast.error('Failed to create the resource. Please try again.');
      break;
    case 'RESOURCE_UPDATE_FAILED':
      toast.error('Failed to update the resource. Please try again.');
      break;
    case 'RESOURCE_DELETION_FAILED':
      toast.error('Failed to delete the resource. Please try again.');
      break;
    case 'UNSUPPORTED_OPERATOR':
      toast.error('Unsupported operator used.');
      break;
    case 'PAYMENT_SESSION_FAILED':
      toast.error('Failed to create payment session. Please try again.');
      break;
    case 'WEBHOOK_VERIFICATION_FAILED':
      toast.error('Webhook verification failed.');
      break;
    case 'EXTERNAL_SERVICE_ERROR':
      toast.error('External service error. Please try again later.');
      break;
    case 'DATA_PARSING_FAILED':
      toast.error('Data parsing failed. Please check your inputs.');
      break;
    case 'RATE_LIMIT_EXCEEDED':
      toast.error('Rate limit exceeded. Please wait before retrying.');
      break;
    default:
      toast.error('An unknown error occurred.');
  }
}
