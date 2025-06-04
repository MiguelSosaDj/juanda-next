'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartCardProps {
  title: string;
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }>;
  };
}

export default function ChartCard({ title, data }: ChartCardProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#9CA3AF'
        }
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        grid: {
          color: '#374151'
        },
        ticks: {
          color: '#9CA3AF'
        }
      },
      x: {
        grid: {
          color: '#374151'
        },
        ticks: {
          color: '#9CA3AF'
        }
      }
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
      <h3 className="text-lg font-medium text-white mb-4">{title}</h3>
      <div className="h-64">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}