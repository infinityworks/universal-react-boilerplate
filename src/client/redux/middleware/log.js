import getLog from '../../../server/logging/logger';

const log = getLog('redux');

export const startLog = () => next => action => {
  log.info('Dispatching action', { type: action.type });
  return next(action);
};

export const endLog = () => next => action => {
  log.info('Action handled', { type: action.type });
  if (action.error) {
    log.error('Action error', { error: action.payload || action.error });
  }
  return next(action);
};
