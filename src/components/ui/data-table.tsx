'use client';

import { useSearch } from '@/hooks/use-search';
import { exportData } from '@/lib/export-utils';
import ActionMenu from './action-menu';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsUpDownIcon,
} from '@heroicons/react/24/outline';

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: (item: T) => {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'danger';
  }[];
  exportOptions?: {
    filename: string;
    format: 'csv' | 'excel';
  };
}

export default function DataTable<T extends { id: string | number }>({
  data,
  columns,
  actions,
  exportOptions,
}: DataTableProps<T>) {
  const {
    searchQuery,
    setSearchQuery,
    filteredData,
    handleSort,
    currentSort,
  } = useSearch({
    data,
    searchFields: columns.map((col) => col.key),
    sortField: columns.find((col) => col.sortable)?.key,
  });

  const handleExport = () => {
    if (exportOptions) {
      exportData(filteredData, {
        ...exportOptions,
        columns: columns.map((col) => ({
          key: col.key as string,
          label: col.label,
        })),
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {exportOptions && (
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Exportar
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              {columns.map((column) => (
                <th
                  key={column.key as string}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-400"
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <button
                        onClick={() => handleSort(column.key)}
                        className="p-1 hover:bg-gray-700 rounded"
                      >
                        {currentSort.field === column.key ? (
                          currentSort.direction === 'asc' ? (
                            <ArrowUpIcon className="h-4 w-4" />
                          ) : (
                            <ArrowDownIcon className="h-4 w-4" />
                          )
                        ) : (
                          <ArrowsUpDownIcon className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className="w-10"></th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-700 hover:bg-gray-800/50"
              >
                {columns.map((column) => (
                  <td
                    key={column.key as string}
                    className="px-4 py-3 text-sm text-gray-300"
                  >
                    {String(item[column.key])}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3 text-sm">
                    <ActionMenu actions={actions(item)} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}