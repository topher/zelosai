// app/components/nav.tsx

import React from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface NavProps {
  isCollapsed: boolean;
  attribute: string;
  items: {
    label: string;
    value: string;
    count: number;
    isRefined: boolean;
  }[];
  refine: (value: string) => void;
  currentRefinement: string;
}

const NavComponent: React.FC<NavProps> = ({
  isCollapsed,
  items,
  refine,
  currentRefinement,
  attribute,
}) => {
  const handleRefinement = (value: string) => {
    if (currentRefinement === value) {
      // Unselect the current refinement
      refine('');
    } else {
      // Refine to the selected value
      refine(value);
    }
  };

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {items.map((item, index) => {
          const isActive = item.isRefined;
          return (
            <button
              key={`${item.label}-${index}`}
              onClick={() => handleRefinement(item.value)}
              className={cn(
                buttonVariants({
                  variant: isActive ? 'default' : 'ghost',
                  size: isCollapsed ? 'icon' : 'sm',
                }),
                'justify-start w-full flex items-center'
              )}
            >
              {/* Replace with appropriate icon */}
              <span className="mr-2 h-4 w-4">{item.label.charAt(0)}</span>
              {!isCollapsed && item.label}
              {item.count !== undefined && (
                <span className="ml-auto">{item.count}</span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export const ConnectedNav = NavComponent;
