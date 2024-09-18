// ContractCardTermDetail.tsx
import React from 'react';

interface ContractCardTermDetailProps {
  data: {
    effectiveDate: string;
    expirationDate: string;
  };
}

const ContractCardTermDetail: React.FC<ContractCardTermDetailProps> = ({ data }) => (
  <div className="text-sm text-gray-600 mt-1">
    Effective: {new Date(data.effectiveDate).toLocaleDateString()} <br />
    Expires: {new Date(data.expirationDate).toLocaleDateString()}
  </div>
);

export default ContractCardTermDetail;
