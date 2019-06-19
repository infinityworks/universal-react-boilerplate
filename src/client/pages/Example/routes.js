import { hasCondition } from '../../routes/conditional';
import paths from '../../routes/paths';

// eslint-disable-next-line import/prefer-default-export
export const page = {
  path: paths.example.pay,
  isAllowed: [hasCondition],
};
