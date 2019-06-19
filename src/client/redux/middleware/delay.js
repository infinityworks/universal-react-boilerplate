export const DELAY = Symbol('delay');

export default () => next => action => {
  if (action[DELAY] === undefined) {
    return next(action);
  }
  const { delay } = action[DELAY];
  return new Promise(resolve => setTimeout(() => resolve(next(action)), delay));
};
