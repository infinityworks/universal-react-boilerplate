// import uuidv4 from 'uuid/v4';
import getLog from '../logging/logger';
import * as sessionStore from '../services/session/dynamodb';
import {
  startLog as reduxStartLog,
  endLog as reduxEndLog,
} from '../../client/redux/middleware/log';

const AUTH_STATE_COOKIE = 'auth';
const SESSION_ID = 'sessionId';

const log = getLog('express/middleware/redux');

// LOAD
const loadStateFromSession = async (req) => {
  const sessionId = req.signedCookies[SESSION_ID];
  if (!sessionId) return null;
  return await sessionStore.getState(sessionId);
};

const loadStateFromCookies = async (req) => {
  const authData = req.signedCookies[AUTH_STATE_COOKIE];
  try {
    return JSON.parse(authData);
  } catch (e) {
    return null;
  }
};

const loadState = async (req) => {
  let state = await loadStateFromSession(req);
  if (!state) {
    state = await loadStateFromCookies(req);
  }
  return state;
};

export const loadSession = (createStore) => async (req, res, next) => {
  try {
    const state = await loadState(req);
    req.store = createStore(
      state || {}, null,
      [reduxStartLog],
      [
        reduxEndLog,
      ],
    );
    req.state = req.store.getState();
    return next();
  } catch (err) {
    log.error('Failed to load session', {
      url: req.url,
      fn: 'loadSession',
      err: err.message,
      stack: err.stack,
      userId: req.userId,
      deviceId: req.deviceId,
    });
    return next(err);
  }
};

// SAVE
// const saveStateInSession = async (req, res) => {
//   const state = req.store.getState();
//   const sessionId = req.signedCookies[SESSION_ID] || uuidv4();
//   await sessionStore.saveState(sessionId, state);
//   res.cookie(SESSION_ID, sessionId, {
//     signed: true,
//     httpOnly: true,
//     secure: process.env.NODE_ENV !== 'development',
//   });
//   res.clearCookie(AUTH_STATE_COOKIE);
//   log.info('Successfully saved state in store', {
//     sessionId,
//     fn: 'saveStateInSession',
//     userId: req.userId,
//     deviceId: req.deviceId,
//   });
// };

const saveStateInCookies = (req, res) => {
  // const state = req.store.getState();
  // const substate = {
  //   login: state.login,
  //   auth: state.auth,
  // };
  // res.cookie(AUTH_STATE_COOKIE, JSON.stringify(substate), {
  //   signed: true,
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== 'development',
  // });
  // res.clearCookie(SESSION_ID);
  // log.info('Successfully saved state in cookies', {
  //   url: req.url,
  //   fn: 'saveStateInCookies',
  //   userId: req.userId,
  //   deviceId: req.deviceId,
  // });
};

const saveState = async (req, res) => {
  // const state = req.store.getState();
  // if (getIdToken(state)) {
  //   return await saveStateInSession(req, res);
  // }
  return saveStateInCookies(req, res);
};

const dispatchActions = async (
  store,
  actions,
  url,
  userId,
  deviceId) => actions.reduce(async (route, action) => {
  log.info('Handling action', {
    url,
    fn: 'dispatchActions',
    actionType: action.type,
    userId,
    deviceId,
  });
  try {
    const newRoute = await store.dispatch(action);
    return newRoute || route;
  } catch (err) {
    log.error('Error handling actions', {
      url,
      actionType: action.type,
      err: err.message,
      stack: err.stack,
      fn: 'dispatchActions',
      fatal: true,
      userId,
      deviceId,
    });
    throw err;
  }
}, null);

export const handleAction = async (req, res, next) => {
  if (!req.actions || !req.store) {
    return next();
  }
  let route;
  try {
    route = await dispatchActions(req.store, req.actions, req.url, req.userId, req.deviceId);
  } catch (err) {
    return next(err);
  }
  try {
    await saveState(req, res);
  } catch (err) {
    log.error('Error saving session', {
      url: req.url,
      err: err.message,
      stack: err.stack,
      fn: 'handleAction',
      fatal: true,
      userId: req.userId,
      deviceId: req.deviceId,
    });
  }
  if (route || req.method === 'POST') {
    log.info('Redirecting', {
      url: req.url,
      route,
      fn: 'handleAction',
      userId: req.userId,
      deviceId: req.deviceId,
    });
    res.redirect(route || req.header('Referer'));
  }
  return next();
};
