import { action as originalAction } from '@storybook/addon-actions';

export const actionPreventDefault = msg => e => {
  e.preventDefault();
  return originalAction(msg)(e);
};

export const action = originalAction;

export default {};
