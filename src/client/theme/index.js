import defaultTheme from './default';
import * as textStyles from './default/textStyles';

export { defaultTheme as currentTheme, textStyles };

export default selector => {
  const r = ({ theme }) => selector
    .split('.')
    .reduce((a, key) => (a ? a[key] : null), theme);

  r.apply = fn => props => fn(r(props), props);

  return r;
};
