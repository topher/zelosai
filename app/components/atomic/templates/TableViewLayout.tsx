// /app/components/atomic/templates/TableViewLayout.tsx

import React from 'react';
import FeaturePageHeader from '../molecules/FeaturePageHeader';
import { DataTable } from '../organisms/data-table';

interface PageHeaderProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
}

interface TableViewLayoutProps<TData, TValue> {
  header: PageHeaderProps;
  isLoading?: boolean;
  error?: string | null;
  data: TData[];
  columns: any;
}

const TableViewLayout = <TData, TValue>({
  header,
  isLoading = false,
  error = null,
  data,
  columns,
}: TableViewLayoutProps<TData, TValue>) => {
  if (isLoading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="feature-layout">
      {/* Header Component */}
      <FeaturePageHeader
        title={header.title}
        description={header.description}
        actions={header.actions}
      />

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          <DataTable<TData, TValue> columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default TableViewLayout;
