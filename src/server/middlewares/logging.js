import getLog from '../logging/logger';

const log = getLog('request');

export default (err, req, res, next) => action => {
  const actionRes = next(action);
  // Some errors don't need to be logged e.g., user not logged in.
  if (action.error && !action.error.ignore) {
    log.error('Action error', { err: action.payload || action.error, userId: req.userId, deviceId: req.deviceId });
  }

  return actionRes;
};
