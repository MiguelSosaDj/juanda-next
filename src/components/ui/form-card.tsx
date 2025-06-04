interface FormCardProps {
  children: React.ReactNode;
  title?: string;
}

export default function FormCard({ children, title }: FormCardProps) {
  return (
    <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
      {title && (
        <h3 className="text-lg font-medium text-gray-200 mb-4">{title}</h3>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}