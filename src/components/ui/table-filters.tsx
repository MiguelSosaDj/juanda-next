'use client';

interface TableFiltersProps {
  onSearch: (query: string) => void;
  filters?: Array<{
    label: string;
    value: string;
    options: Array<{ label: string; value: string }>;
    onChange: (value: string) => void;
  }>;
}

export default function TableFilters({ onSearch, filters = [] }: TableFiltersProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-4 items-center">
      <div className="flex-1 min-w-[200px]">
        <input
          type="text"
          placeholder="Buscar..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      {filters.map((filter) => (
        <div key={filter.value} className="min-w-[150px]">
          <select
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{filter.label}</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}