import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const TransactionResource = {
  resourceTypeId: ResourceType.Transaction,
  schema: Yup.object().shape({
        transactionType: Yup.string().required('Transaction Type is required'),
        amount: Yup.number().required('Amount is required'),
        currency: Yup.string().required('Currency is required'),
        senderId: Yup.string().required('Sender ID is required'),
        recipientId: Yup.string().required('Recipient ID is required'),
        transactionDate: Yup.string().required('Transaction Date is required'),
        status: Yup.string().required('Status is required'),
        relatedResourceId: Yup.string(),
        notes: Yup.string(),
    }),
  fields: [
        { name: 'transactionType', label: 'Transaction Type', type: 'text', required: true },
        { name: 'amount', label: 'Amount', type: 'number', required: true },
        { name: 'currency', label: 'Currency', type: 'text', required: true },
        { name: 'senderId', label: 'Sender ID', type: 'text', required: true },
        { name: 'recipientId', label: 'Recipient ID', type: 'text', required: true },
        { name: 'transactionDate', label: 'Transaction Date', type: 'text', required: true },
        { name: 'status', label: 'Status', type: 'text', required: true },
        { name: 'relatedResourceId', label: 'Related Resource ID', type: 'text' },
        { name: 'notes', label: 'Notes', type: 'textarea' },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyTransactionsAgent', // Assign an agentId to the resource
};

export default TransactionResource;
