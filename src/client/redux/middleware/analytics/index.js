export const TRACK_EVENT = Symbol('TRACK_EVENT');

export default ({ sendEvent, getUserId }) => ({ getState }) => next => action => {
  if (action[TRACK_EVENT] === undefined || action[TRACK_EVENT] === null) {
    return next(action);
  }
  const eventName = action[TRACK_EVENT];
  const userId = getUserId(getState());
  sendEvent(eventName, userId);
  return next(action);
};
