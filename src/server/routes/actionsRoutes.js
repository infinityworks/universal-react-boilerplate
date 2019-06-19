import paths from './paths';
import { setFullName } from '../../client/redux/modules/example/fullname';

import { actionRoutes as exampleActionRoutes } from '../../client/pages/Example';

const buildActionRoute = route => ({
  path: route.actionPath,
  action: route.action,
});

const createActionRoutes = actionRoutes => (
  Object
    .keys(actionRoutes)
    .reduce((routes, k) => routes.concat(buildActionRoute(actionRoutes[k])), [])
);

export default [
  ...createActionRoutes(exampleActionRoutes),
  {
    path: `/${paths.actions.example.setFullName}`,
    action: ({ body }) => setFullName(body.firstName, body.surname),
  },
].map(route => ({
  ...route,
  // New routes include '/actions'.
  path: route.path.startsWith('/actions') ? route.path : `/actions${route.path}`,
  method: 'post',
}));
