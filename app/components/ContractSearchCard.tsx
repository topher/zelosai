import React from "react";
import Link from "next/link";
import AvatarAndUsername from "./AvatarAndUsername";
import ContractCardTermDetail from "./ContractCardTermDetail";
import { ContractModel } from "@/app/types";

interface ContractSearchCardProps {
  data: ContractModel;
}

const ContractSearchCard: React.FC<ContractSearchCardProps> = ({ data }) => {
  return (
    <div className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg bg-gray-100">
      <Link href={`/contracts/${data.id}`}>
        <div className="relative">
          <div className="flex items-center justify-center h-48 bg-gray-200">
            <span className="text-6xl">{data.emoji || '📄'}</span>
          </div>
          <div className="absolute top-0 left-0 m-2">
            <span className="bg-white bg-opacity-75 rounded-full px-2 py-1 text-sm">
              {data.status || 'Unknown Status'}
            </span>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold">{data.title}</h2>
            <ContractCardTermDetail
              data={{
                effectiveDate: data.effectiveDate,
                expirationDate: data.expirationDate,
              }}
            />
            <AvatarAndUsername
              data={{
                avatarSrc: data.creatorAvatar || '/truchet_avatar.png', // Use placeholder if creatorAvatar is missing
                username: data.contract_creator || 'Unknown Creator',
              }}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ContractSearchCard;
