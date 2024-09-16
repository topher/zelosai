import React from "react";
import { ContractModel } from "@/app/types"; // Adjust import based on your project structure

interface ContractSearchCardProps {
  data: ContractModel;
}

const ContractSearchCard: React.FC<ContractSearchCardProps> = ({ data }) => {
  return (
    <div className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
          <span className="text-6xl">{data.emoji}</span>
        </div>
        <div className="mt-2 font-semibold text-lg">{data.title}</div>
        <div className="mt-1 font-light text-neutral-500">{data.status}</div>
        <div className="mt-1 font-light text-neutral-500">
          Effective: {new Date(data.effectiveDate).toLocaleDateString()} <br />
          Expires: {new Date(data.expirationDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default ContractSearchCard;
