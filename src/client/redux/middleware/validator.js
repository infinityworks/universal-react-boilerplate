export const validate = Symbol('validate');

const dispatchIfExists = (store, action) => {
  if (!action) return null;
  return store.dispatch(action);
};

export default store => next => action => {
  if (action[validate] === undefined) {
    return next(action);
  }
  const valid = action[validate].validator(store);
  dispatchIfExists(store, action[validate].always);
  if (valid) {
    return dispatchIfExists(store, action[validate].success);
  }
  return dispatchIfExists(store, action[validate].fail);
};

export const notEmptyString = val => typeof val === 'string' && val.length > 0;
