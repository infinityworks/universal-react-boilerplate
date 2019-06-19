import { asyncComponent } from 'react-async-component';

const loadComponent = load => asyncComponent({
  resolve: () => load,
});

// Disabling eslint as this is just the first export.
// eslint-disable-next-line import/prefer-default-export
export const attachPageComponent = ({ page, ...actionRoutes }, PageComponent) => {
  const pageWithComp = page;
  pageWithComp.component = loadComponent(PageComponent);
  return {
    page: pageWithComp,
    ...actionRoutes,
  };
};
