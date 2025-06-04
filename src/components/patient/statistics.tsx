'use client';

import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface Statistic {
  label: string;
  value: number;
  unit?: string;
  change?: number;
  timeframe?: string;
}

interface PatientStatisticsProps {
  stats: Statistic[];
}

export default function PatientStatistics({ stats }: PatientStatisticsProps) {
  const getChangeColor = (change: number | undefined) => {
    if (!change) return 'text-gray-400';
    return change > 0 ? 'text-green-400' : 'text-red-400';
  };

  const formatChange = (change: number) => {
    const prefix = change > 0 ? '+' : '';
    return `${prefix}${change.toFixed(1)}%`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {typeof stat.value === 'number' ? stat.value.toFixed(1) : stat.value}
                {stat.unit && (
                  <span className="ml-1 text-sm text-gray-400">{stat.unit}</span>
                )}
              </p>
            </div>
            {stat.change && (
              <div className={`flex items-center ${getChangeColor(stat.change)}`}>
                {stat.change > 0 ? (
                  <ArrowUpIcon className="w-4 h-4" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4" />
                )}
                <span className="text-sm ml-1">{formatChange(stat.change)}</span>
              </div>
            )}
          </div>
          {stat.timeframe && (
            <p className="mt-2 text-xs text-gray-400">
              vs {stat.timeframe}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}