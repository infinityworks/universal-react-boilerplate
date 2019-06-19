export const ROUTE = Symbol('ROUTE');

export default history => () => next => action => {
  next(action);
  const route = action[ROUTE] || (action.meta && action.meta[ROUTE]);
  if (route === undefined) return null;
  if (history) history.push(route);
  return route;
};
