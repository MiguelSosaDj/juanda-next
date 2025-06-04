'use client';

import { useEffect, useState } from 'react';
import { TableSkeleton } from './ui/skeleton';

interface QueryWrapperProps<T> {
  children: (data: T) => React.ReactNode;
  queryFn: () => Promise<T>;
  loadingComponent?: React.ReactNode;
  errorComponent?: (error: Error) => React.ReactNode;
}

export default function QueryWrapper<T>({
  children,
  queryFn,
  loadingComponent = <TableSkeleton />,
  errorComponent = (error) => (
    <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg">
      <p className="text-red-400">{error.message}</p>
    </div>
  ),
}: QueryWrapperProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await queryFn();
        setData(result);
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [queryFn]);

  if (isLoading) {
    return loadingComponent;
  }

  if (error) {
    return errorComponent(error);
  }

  if (!data) {
    return null;
  }

  return children(data);
}