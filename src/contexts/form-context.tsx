'use client';

import React, { createContext, useContext, useState } from 'react';

interface FormContextType {
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  formErrors: Record<string, string>;
  setFormErrors: (errors: Record<string, string>) => void;
  clearErrors: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const clearErrors = () => setFormErrors({});

  return (
    <FormContext.Provider value={{
      isSubmitting,
      setIsSubmitting,
      formErrors,
      setFormErrors,
      clearErrors
    }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}