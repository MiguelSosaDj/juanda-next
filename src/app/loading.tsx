export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="h-10 w-48 bg-gray-800 rounded-lg animate-pulse mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-6 bg-gray-800 rounded-lg shadow-xl">
            <div className="h-6 w-32 bg-gray-700 rounded animate-pulse mb-4" />
            <div className="h-4 w-full bg-gray-700 rounded animate-pulse mb-2" />
            <div className="h-4 w-2/3 bg-gray-700 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}