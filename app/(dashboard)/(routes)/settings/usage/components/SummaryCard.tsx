// components/SummaryCard.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  colorClass: string; // Tailwind color class, e.g., 'bg-blue-500'
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, description, icon: Icon, colorClass }) => {
  return (
    <Card className="flex items-center space-x-4 p-4">
      <CardHeader className={`p-3 rounded-full ${colorClass} text-white`}>
        <Icon size={24} />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-xl font-bold">{value}</CardDescription>
        {description && <CardDescription className="text-sm text-gray-500">{description}</CardDescription>}
      </CardContent>
    </Card>
  );
};
