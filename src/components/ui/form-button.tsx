interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

export default function FormButton({ 
  children, 
  loading, 
  variant = 'primary',
  ...props 
}: FormButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-700 text-white hover:bg-gray-600"
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`${baseStyles} ${variants[variant]} ${props.className || ''}`}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          Procesando...
        </span>
      ) : children}
    </button>
  );
}