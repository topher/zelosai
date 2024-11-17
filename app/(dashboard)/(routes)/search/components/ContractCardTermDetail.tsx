// /app/(dashboard)/(routes)/search/components/ContractCardTermDetail.tsx

"use client";

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
  <div className="flex items-start text-sm text-white mb-2">
    <FaCalendarAlt className="mr-2 mt-1 text-white" />
    <div style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.8)" }}>
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
