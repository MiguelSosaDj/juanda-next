'use client';

interface HistoryEntry {
  id: string;
  date: Date;
  type: 'appointment' | 'measurement' | 'note' | 'prescription';
  title: string;
  description: string;
  metadata?: Record<string, any>;
}

interface HistoryTimelineProps {
  entries: HistoryEntry[];
  onEntryClick: (entry: HistoryEntry) => void;
}

export default function HistoryTimeline({
  entries,
  onEntryClick
}: HistoryTimelineProps) {
  const sortedEntries = [...entries].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getIconForType = (type: HistoryEntry['type']) => {
    switch (type) {
      case 'appointment':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'measurement':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'note':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case 'prescription':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {sortedEntries.map((entry, idx) => (
          <li key={entry.id}>
            <div className="relative pb-8">
              {idx !== sortedEntries.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-700"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div className={`
                  relative h-8 w-8 rounded-full flex items-center justify-center
                  ${entry.type === 'appointment' ? 'bg-blue-900' :
                    entry.type === 'measurement' ? 'bg-green-900' :
                    entry.type === 'note' ? 'bg-yellow-900' :
                    'bg-purple-900'}
                `}>
                  <span className="text-white">
                    {getIconForType(entry.type)}
                  </span>
                </div>
                <div
                  onClick={() => onEntryClick(entry)}
                  className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5 cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{entry.title}</p>
                    <p className="mt-0.5 text-sm text-gray-400">{entry.description}</p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-400">
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}