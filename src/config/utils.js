export const getEnvVar = (value, defaultValue, isValid = val => val != null) => (
  isValid(value) ? value : defaultValue
);

export const getEnvFlag = (value, trueValue = true, falseValue = false) => (
  (value === 'true' || value === '1') ? trueValue : falseValue
);
