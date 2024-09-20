// components/generationCards/ImageResponseCard.tsx
"use client";

import React from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Download } from "lucide-react";

interface ImageResponseCardProps {
  src: string;
}

export const ImageResponseCard: React.FC<ImageResponseCardProps> = ({ src }) => {
  return (
    <Card className="rounded-lg overflow-hidden">
      <div className="relative aspect-square">
        <Image fill alt="Generated" src={src} />
      </div>
      <CardFooter className="p-2">
        <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};
