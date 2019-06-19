import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import validator from './middleware/validator';
import delay from './middleware/delay';
import rootReducer from './modules/root-reducer';
import route from './middleware/route';
import sequence from './middleware/sequence';
import chain from './middleware/chain';

export default (state = {}, history = null, mwStart = [], mwEnd = []) => {
  const middlewares = [
    ...mwStart,
    validator,
    delay,
    apiMiddleware,
    sequence,
    chain,
    route(history),
    ...mwEnd,
  ];

  const store = createStore(
    rootReducer,
    state,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  return store;
};
