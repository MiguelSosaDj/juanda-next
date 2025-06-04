interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export default function FormSelect({ label, error, options, ...props }: FormSelectProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <select
        {...props}
        className={`w-full px-3 py-2 bg-gray-800 border ${
          error ? 'border-red-500' : 'border-gray-700'
        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
      >
        <option value="">Seleccionar...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}