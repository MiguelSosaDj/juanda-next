'use client';

import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';

interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  completedDate?: Date;
  status: 'pending' | 'completed' | 'overdue';
}

interface ProgressTrackerProps {
  milestones: Milestone[];
  onMilestoneClick: (milestone: Milestone) => void;
}

export default function ProgressTracker({ 
  milestones,
  onMilestoneClick
}: ProgressTrackerProps) {
  const sortedMilestones = [...milestones].sort((a, b) => 
    new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
  );

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700" />
      
      <div className="space-y-6">
        {sortedMilestones.map((milestone, index) => (
          <div
            key={milestone.id}
            className="relative pl-10"
          >
            <div className={`
              absolute left-2.5 -translate-x-1/2 w-7 h-7 rounded-full
              flex items-center justify-center
              ${milestone.status === 'completed' ? 'bg-green-500' :
                milestone.status === 'overdue' ? 'bg-red-500' :
                'bg-blue-500'}
            `}>
              {milestone.status === 'completed' ? (
                <CheckIcon className="w-4 h-4 text-white" />
              ) : (
                <ClockIcon className="w-4 h-4 text-white" />
              )}
            </div>

            <div
              onClick={() => onMilestoneClick(milestone)}
              className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
            >
              <h3 className="text-lg font-medium text-white">
                {milestone.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {milestone.description}
              </p>
              <div className="mt-2 flex items-center space-x-4 text-sm">
                <span className="text-gray-400">
                  Meta: {new Date(milestone.targetDate).toLocaleDateString()}
                </span>
                {milestone.completedDate && (
                  <span className="text-green-400">
                    Completado: {new Date(milestone.completedDate).toLocaleDateString()}
                  </span>
                )}
                <span className={`
                  px-2 py-1 rounded text-xs
                  ${milestone.status === 'completed' ? 'bg-green-900 text-green-200' :
                    milestone.status === 'overdue' ? 'bg-red-900 text-red-200' :
                    'bg-blue-900 text-blue-200'}
                `}>
                  {milestone.status === 'completed' ? 'Completado' :
                   milestone.status === 'overdue' ? 'Vencido' :
                   'Pendiente'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}