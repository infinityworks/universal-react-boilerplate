import { Router } from 'express';
import { combine } from '../../client/routes/conditional';

const getIsAllowed = route => {
  // Old routing.
  if (route.component) return route.component.isValid;
  // New routing.
  if (!Array.isArray(route.isAllowed)) {
    return route.isAllowed;
  }
  return combine(...route.isAllowed);
};

export const handler = route => (req, res, next) => {
  if (!route.action) {
    return next();
  }
  const isAllowed = getIsAllowed(route);
  if (isAllowed !== undefined && !isAllowed(req.state)) {
    return next();
  }
  const actions = route.action(req);
  if (actions == null) {
    return next();
  }
  req.actions = Array.isArray(actions) ? actions : [actions];
  return next();
};

export default routes => routes.reduce((router, route) => (
  router[route.method || 'use'](route.path, ...(route.middlewares || []), handler(route))),
Router());
