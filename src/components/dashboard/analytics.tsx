'use client';

import StatsCard from '@/components/ui/stats-card';
import ChartCard from '@/components/ui/chart-card';

interface AnalyticsDashboardProps {
  stats: {
    totalAlumnos: number;
    totalGestantes: number;
    totalLactantes: number;
    totalBajoPeso: number;
    totalSobrePeso: number;
    totalGemelares: number;
  };
  chartData: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }>;
  };
}

export default function AnalyticsDashboard({ stats, chartData }: AnalyticsDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Alumnos"
          value={stats.totalAlumnos}
          description="Alumnos registrados en el sistema"
        />
        <StatsCard
          title="Gestantes"
          value={stats.totalGestantes}
          description="Pacientes gestantes en control"
        />
        <StatsCard
          title="Lactantes"
          value={stats.totalLactantes}
          description="Lactantes en seguimiento"
        />
        <StatsCard
          title="Bajo Peso"
          value={stats.totalBajoPeso}
          description="Pacientes con bajo peso"
        />
        <StatsCard
          title="Sobre Peso"
          value={stats.totalSobrePeso}
          description="Pacientes con sobre peso"
        />
        <StatsCard
          title="Gemelares"
          value={stats.totalGemelares}
          description="Casos gemelares registrados"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Estadísticas Mensuales"
          data={chartData}
        />
        <ChartCard
          title="Distribución por Categoría"
          data={{
            labels: ['Gestantes', 'Lactantes', 'Bajo Peso', 'Sobre Peso', 'Gemelares'],
            datasets: [{
              label: 'Distribución',
              data: [
                stats.totalGestantes,
                stats.totalLactantes,
                stats.totalBajoPeso,
                stats.totalSobrePeso,
                stats.totalGemelares
              ],
              borderColor: '#3b82f6',
              backgroundColor: '#3b82f680',
            }]
          }}
        />
      </div>
    </div>
  );
}