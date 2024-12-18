// utils/getIconComponent.ts

import { iconMapping } from './iconMapping';
import { LucideIcon } from 'lucide-react';

export const getIconComponent = (iconName: string): LucideIcon | null => {
    try {
      const Icon = require(`lucide-react`).iconName;
      return Icon || null;
    } catch (error) {
      console.error(`Icon "${iconName}" not found`);
      return null;
    }
  };
  