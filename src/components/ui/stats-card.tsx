interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ 
  title, 
  value, 
  description, 
  trend 
}: StatsCardProps) {
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-semibold text-white">{value}</p>
        {trend && (
          <span className={`ml-2 text-sm ${
            trend.isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      {description && (
        <p className="mt-1 text-sm text-gray-400">{description}</p>
      )}
    </div>
  );
}