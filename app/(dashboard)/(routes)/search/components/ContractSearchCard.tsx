// app/components/ContractSearchCard.tsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFileContract } from "react-icons/fa";
import AvatarAndUsername from "@/app/(dashboard)/(routes)/search/components/AvatarAndUsername";
import ContractCardTermDetail from "./ContractCardTermDetail";
import { ContractModel } from "@/app/types";

interface ContractSearchCardProps {
  data: ContractModel;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "expired":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const ContractSearchCard: React.FC<ContractSearchCardProps> = ({ data }) => {
  return (
    <Link href={`/contracts/${data.id}`}>
      <div className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md bg-white transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg">
        {/* Header Section */}
        <div className="relative h-32 bg-gradient-to-r from-indigo-600 to-pink-500 flex items-center justify-center">
          {/* Contract Emoji or Icon */}
          <span className="text-white text-6xl">
            {data.emoji || <FaFileContract />}
          </span>
          {/* Status Badge */}
          <div className="absolute top-2 right-2">
            <span
              className={`text-sm px-2 py-1 rounded-full ${getStatusColor(
                data.status || "Unknown"
              )}`}
            >
              {data.status || "Unknown Status"}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-darkGray mb-2 line-clamp-2">
            {data.title}
          </h2>
          <ContractCardTermDetail
            data={{
              effectiveDate: data.effectiveDate,
              expirationDate: data.expirationDate,
            }}
          />
          {/* Creator Information */}
          <div className="mt-4">
            <AvatarAndUsername
              data={{
                avatarSrc: data.creatorAvatar || "/truchet_avatar.png",
                username: data.contract_creator || "Unknown Creator",
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContractSearchCard;
