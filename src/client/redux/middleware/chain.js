import { CALL_API } from 'redux-api-middleware';

export const CHAIN_NEXT = Symbol('CHAIN_NEXT');

// First argument is an API action.
// Subsequent arguments are functions like payload => ({ [CALL_API]: ... }).
export const chainAPIActions = (action, ...toChain) => {
  if (toChain.length === 0) {
    return action;
  }
  if (!action[CALL_API]) {
    throw new Error('action is not an API action');
  }
  const newAction = { ...action };
  let actionAPISuccess = action[CALL_API].types[1];
  if (typeof actionAPISuccess === 'string') {
    actionAPISuccess = { type: actionAPISuccess };
  }
  const firstFn = toChain.shift();
  newAction[CALL_API].types[1] = {
    ...actionAPISuccess,
    [CHAIN_NEXT]: ({ payload }) => chainAPIActions(firstFn(payload), ...toChain),
  };
  return action;
};

export default store => next => async action => {
  const result = await next(action);

  if (typeof action[CHAIN_NEXT] !== 'function') {
    return result;
  }

  const newAction = action[CHAIN_NEXT](action);
  if (newAction === null) {
    return result;
  }
  return (await store.dispatch(newAction)) || result;
};
