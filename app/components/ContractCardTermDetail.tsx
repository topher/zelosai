// app/components/ContractCardTermDetail.tsx

import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { format } from 'date-fns';

interface ContractCardTermDetailProps {
  data: {
    effectiveDate: string;
    expirationDate: string;
  };
}

const ContractCardTermDetail: React.FC<ContractCardTermDetailProps> = ({ data }) => (
  <div className="flex items-start text-sm text-gray-600 mb-2">
    <FaCalendarAlt className="mr-2 mt-1 text-indigo-600" />
    <div>
      <div>
        <span className="font-semibold">Effective:</span>{' '}
        {format(new Date(data.effectiveDate), 'MMM dd, yyyy')}
      </div>
      <div>
        <span className="font-semibold">Expires:</span>{' '}
        {format(new Date(data.expirationDate), 'MMM dd, yyyy')}
      </div>
    </div>
  </div>
);

export default ContractCardTermDetail;
