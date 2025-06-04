'use client';

import { useFormValidation } from '@/hooks/use-form-validation';
import { useNotifications } from './notifications';
import { ValidationRules } from '@/lib/validation';
import { FormButton } from './form-button';
import { useState } from 'react';

interface FormWrapperProps<T extends Record<string, any>> {
  initialValues: T;
  validationRules: ValidationRules;
  onSubmit: (values: T) => Promise<void>;
  children: (props: {
    values: T;
    errors: Record<string, string>;
    handleChange: (name: keyof T, value: any) => void;
  }) => React.ReactNode;
  submitLabel?: string;
}

export default function FormWrapper<T extends Record<string, any>>({
  initialValues,
  validationRules,
  onSubmit,
  children,
  submitLabel = 'Guardar'
}: FormWrapperProps<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showNotification } = useNotifications();
  const {
    values,
    errors,
    handleChange,
    validateAll,
    resetForm
  } = useFormValidation(initialValues, validationRules);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) {
      showNotification('error', 'Por favor, corrija los errores en el formulario');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
      showNotification('success', 'Datos guardados exitosamente');
      resetForm();
    } catch (error: any) {
      showNotification('error', error.message || 'Error al guardar los datos');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {children({ values, errors, handleChange })}
      <div className="flex justify-end gap-4">
        <FormButton
          type="button"
          variant="secondary"
          onClick={resetForm}
          disabled={isSubmitting}
        >
          Cancelar
        </FormButton>
        <FormButton
          type="submit"
          loading={isSubmitting}
        >
          {submitLabel}
        </FormButton>
      </div>
    </form>
  );
}