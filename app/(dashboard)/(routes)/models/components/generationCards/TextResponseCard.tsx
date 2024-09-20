// components/generationCards/TextResponseCard.tsx
"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { UserAvatar } from "@/components/ui/user-avatar";
// import { BotAvatar } from "@/components/ui/bot-avatar";

interface TextResponseCardProps {
  message: string;
  role: "user" | "assistant";
}

export const TextResponseCard: React.FC<TextResponseCardProps> = ({ message, role }) => {
  return (
    <Card className="p-4 flex items-start gap-4">
      {/* {role === "user" ? <UserAvatar /> : <BotAvatar />} */}
      <CardContent>
        <p>{message}</p>
      </CardContent>
    </Card>
  );
};
