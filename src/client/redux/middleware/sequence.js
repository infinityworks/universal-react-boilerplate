export const SEQUENCE_ID = Symbol('SEQUENCE_ID');
export const SEQUENCE_KEY = Symbol('SEQUENCE_KEY');

const lastSentIds = {};
const lastReceivedIds = {};

// Pass the array of three API actions to add the necessary data to be caught by this middleware.
export const preserveSequence = (actions) => {
  if (actions.length !== 3) {
    throw new Error(`Expected 3 actions but got ${actions.length}`);
  }
  const [req, res, err] = actions.map(fsa => (!fsa.type ? { type: fsa, meta: {} } : fsa));
  const key = req.type;
  const id = lastSentIds[key] + 1 || 0;
  res.meta[SEQUENCE_KEY] = key;
  err.meta[SEQUENCE_KEY] = key;
  res.meta[SEQUENCE_ID] = id;
  err.meta[SEQUENCE_ID] = id;
  lastSentIds[key] = id;
  return [req, res, err];
};

// Place after redux_api_middleware to filter out api responses that come back in the wrong order.
export default () => next => action => {
  if (action.meta === undefined || !action.meta[SEQUENCE_KEY]) {
    return next(action);
  }
  const key = action.meta[SEQUENCE_KEY];
  const id = action.meta[SEQUENCE_ID];
  if (id < lastReceivedIds[key]) {
    return null;
  }
  lastReceivedIds[key] = id;
  return next(action);
};
