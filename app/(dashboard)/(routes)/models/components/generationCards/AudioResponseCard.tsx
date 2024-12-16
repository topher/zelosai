// components/generationCards/AudioResponseCard.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface AudioResponseCardProps {
  src: string;
}

export const AudioResponseCard: React.FC<AudioResponseCardProps> = ({ src }) => {
  return (
    <Card className="p-4">
      <CardContent>
        <audio controls className="w-full">
          <source src={src} />
          Your browser does not support the audio element.
        </audio>
      </CardContent>
    </Card>
  );
};
