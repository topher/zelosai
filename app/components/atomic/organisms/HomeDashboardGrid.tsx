import React from 'react';

interface HomeDashboardGridProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const HomeDashboardGrid = <T,>({ items, renderItem }: HomeDashboardGridProps<T>) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
      ))}
    </div>
  );
};

export default HomeDashboardGrid;