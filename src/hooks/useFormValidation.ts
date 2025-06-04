import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

export function useFormValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((name: string, value: any, rules: { required?: boolean }) => {
    if (rules.required && !value) {
      setErrors(prev => ({ ...prev, [name]: 'Este campo es requerido' }));
      return false;
    }
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    return true;
  }, []);

  const handleSubmitError = useCallback((error: Error) => {
    toast.error(error.message || 'Ha ocurrido un error');
  }, []);

  const handleSubmitSuccess = useCallback((message: string = 'Operación exitosa') => {
    toast.success(message);
  }, []);

  return {
    errors,
    validateField,
    handleSubmitError,
    handleSubmitSuccess,
  };
}