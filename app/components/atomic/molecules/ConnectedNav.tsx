// components/atomic/molecules/ConnectedNav.tsx

import React from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface NavProps {
  isCollapsed?: boolean;
  attribute?: string;
  items: {
    label: string;
    value: string;
    count: number;
    isRefined: boolean;
  }[];
  refine: (value: string) => void;
  currentRefinement?: string;
}

const ConnectedNav: React.FC<NavProps> = ({
  isCollapsed = false,
  items,
  refine,
  currentRefinement,
}) => {
  return (
    <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 py-2">
      <nav className="grid gap-1 px-2">
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => refine(item.value)}
            className={cn(
              buttonVariants({
                variant: item.isRefined ? 'default' : 'ghost',
                size: isCollapsed ? 'icon' : 'sm',
              }),
              'justify-start w-full flex items-center'
            )}
          >
            <span className="mr-2 h-4 w-4">{item.label.charAt(0)}</span>
            {!isCollapsed && item.label}
            {item.count !== undefined && (
              <span className="ml-auto">{item.count}</span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ConnectedNav;
