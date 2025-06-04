export type ValidationRule = {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  custom?: (value: any) => boolean;
};

export type ValidationRules = Record<string, ValidationRule>;

export function validateField(
  name: string,
  value: any,
  rules?: ValidationRule
): string | null {
  if (!rules) return null;

  if (rules.required && !value) {
    return 'Este campo es requerido';
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return 'Formato inválido';
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `Mínimo ${rules.minLength} caracteres`;
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return `Máximo ${rules.maxLength} caracteres`;
  }

  if (rules.min && Number(value) < rules.min) {
    return `El valor mínimo es ${rules.min}`;
  }

  if (rules.max && Number(value) > rules.max) {
    return `El valor máximo es ${rules.max}`;
  }

  if (rules.custom && !rules.custom(value)) {
    return 'Valor inválido';
  }

  return null;
}

export function validateForm(
  values: Record<string, any>,
  rules: ValidationRules
): Record<string, string> {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach((field) => {
    const error = validateField(field, values[field], rules[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}