interface FormLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  onSubmit?: (e: React.FormEvent) => void;
}

export default function FormLayout({ 
  children, 
  title, 
  description, 
  onSubmit 
}: FormLayoutProps) {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-100">{title}</h2>
        {description && (
          <p className="mt-1 text-gray-400">{description}</p>
        )}
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        {children}
      </form>
    </div>
  );
}