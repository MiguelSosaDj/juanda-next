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
  Legend,
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

interface GrowthData {
  date: string;
  weight?: number;
  height?: number;
  bmi?: number;
}

interface GrowthChartProps {
  data: GrowthData[];
  type: 'weight' | 'height' | 'bmi';
  referenceData?: {
    p3?: number[];
    p50?: number[];
    p97?: number[];
  };
}

export default function GrowthChart({ data, type, referenceData }: GrowthChartProps) {
  const labels = data.map(d => d.date);
  const values = data.map(d => d[type]);

  const chartData = {
    labels,
    datasets: [
      {
        label: type === 'weight' ? 'Peso (kg)' : 
               type === 'height' ? 'Altura (cm)' : 'IMC',
        data: values,
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f680',
        tension: 0.3,
      },
      ...(referenceData?.p3 ? [{
        label: 'Percentil 3',
        data: referenceData.p3,
        borderColor: '#ef4444',
        borderDash: [5, 5],
        pointStyle: false,
      }] : []),
      ...(referenceData?.p50 ? [{
        label: 'Percentil 50',
        data: referenceData.p50,
        borderColor: '#22c55e',
        borderDash: [5, 5],
        pointStyle: false,
      }] : []),
      ...(referenceData?.p97 ? [{
        label: 'Percentil 97',
        data: referenceData.p97,
        borderColor: '#ef4444',
        borderDash: [5, 5],
        pointStyle: false,
      }] : []),
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb',
        },
      },
      title: {
        display: true,
        text: type === 'weight' ? 'Curva de Peso' :
              type === 'height' ? 'Curva de Altura' : 'Curva de IMC',
        color: '#e5e7eb',
      },
    },
    scales: {
      x: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
      y: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <Line data={chartData} options={options} />
    </div>
  );
}