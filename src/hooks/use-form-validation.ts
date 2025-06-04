'use client';

import { useState, useCallback } from 'react';
import { ValidationRules, validateForm } from '@/lib/validation';

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRules
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState<Record<string, boolean>>({});

  const handleChange = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    setIsDirty(prev => ({ ...prev, [name]: true }));

    if (isDirty[name as string]) {
      const fieldError = validateForm({ [name]: value }, { [name]: validationRules[name as string] });
      setErrors(prev => ({ ...prev, [name]: fieldError[name as string] || '' }));
    }
  }, [isDirty, validationRules]);

  const validateAll = useCallback(() => {
    const newErrors = validateForm(values, validationRules);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validationRules]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsDirty({});
  }, [initialValues]);

  return {
    values,
    errors,
    isDirty,
    handleChange,
    validateAll,
    resetForm,
    setValues
  };
}