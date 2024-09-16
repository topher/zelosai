import React from "react";
import { AIModel } from "@/app/types"; // Adjust import based on your project structure
import Image from "next/image";

interface AIModelSearchCardProps {
  data: AIModel;
}

const AIModelSearchCard: React.FC<AIModelSearchCardProps> = ({ data }) => {
  return (
    <div className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={data.thumbnail}
            alt="AI Model"
          />
        </div>
        <div className="mt-2 font-semibold text-lg">{data.label}</div>
        <div className="mt-1 font-light text-neutral-500">{data.description}</div>
        <div className="mt-1 font-light text-neutral-500">Language: {data.default_language}</div>
      </div>
    </div>
  );
};

export default AIModelSearchCard;
