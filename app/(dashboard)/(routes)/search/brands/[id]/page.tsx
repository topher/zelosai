// app/(dashboard)/(routes)/search/brands/[id]/page.tsx

"use client";

import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const BrandDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(id ? `/api/brands/${id}` : null, fetcher);

  if (error) return <div>Failed to load brand details.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center space-x-4">
        <Image
          src={data.logo_url || "/placeholder-logo.png"}
          alt={data.brand_name}
          width={100}
          height={100}
          className="object-contain"
        />
        <h1 className="text-3xl font-bold">{data.brand_name}</h1>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Industry</h2>
        <p>{data.industry.Primary_Industry} {data.industry.Secondary_Industry && ` / ${data.industry.Secondary_Industry}`}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Mission & Vision</h2>
        <p>{data.mission_vision || "No mission or vision statement available."}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Regions</h2>
        <p>{data.regions && data.regions.length > 0 ? data.regions.join(", ") : "No regions specified."}</p>
      </div>
      {/* Add more sections as needed */}
    </div>
  );
};

export default BrandDetailPage;
