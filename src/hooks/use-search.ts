'use client';

import { useState, useMemo, useCallback } from 'react';

interface UseSearchOptions<T> {
  data: T[];
  searchFields: (keyof T)[];
  sortField?: keyof T;
  sortDirection?: 'asc' | 'desc';
}

export function useSearch<T>({
  data,
  searchFields,
  sortField,
  sortDirection = 'asc'
}: UseSearchOptions<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSort, setCurrentSort] = useState({
    field: sortField,
    direction: sortDirection
  });

  const filteredData = useMemo(() => {
    let results = [...data];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(item =>
        searchFields.some(field => {
          const value = item[field];
          return value && String(value).toLowerCase().includes(query);
        })
      );
    }

    if (currentSort.field) {
      results.sort((a, b) => {
        const aVal = a[currentSort.field as keyof T];
        const bVal = b[currentSort.field as keyof T];
        
        if (aVal < bVal) return currentSort.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return currentSort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return results;
  }, [data, searchQuery, searchFields, currentSort]);

  const handleSort = useCallback((field: keyof T) => {
    setCurrentSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
    handleSort,
    currentSort
  };
}