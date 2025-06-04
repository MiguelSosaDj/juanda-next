'use client';

import { useState, useMemo } from 'react';

interface TableStateOptions<T> {
  data: T[];
  itemsPerPage?: number;
  sortKey?: keyof T;
  sortDir?: 'asc' | 'desc';
}

export function useTableState<T>({
  data,
  itemsPerPage = 10,
  sortKey,
  sortDir = 'asc'
}: TableStateOptions<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState({ key: sortKey, direction: sortDir });
  
  const filteredData = useMemo(() => {
    let filtered = [...data];
    
    if (searchQuery) {
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    if (sorting.key) {
      filtered.sort((a, b) => {
        const aVal = a[sorting.key as keyof T];
        const bVal = b[sorting.key as keyof T];
        
        if (aVal < bVal) return sorting.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sorting.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return filtered;
  }, [data, searchQuery, sorting]);
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);
  
  const handleSort = (key: keyof T) => {
    setSorting(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };
  
  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    searchQuery,
    setSearchQuery,
    sorting,
    handleSort
  };
}