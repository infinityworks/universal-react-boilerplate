// this is the entry point for the client app bundle
import React from 'react';
import { hydrate } from 'react-dom';
import { Router } from 'react-router-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { renderRoutes } from 'react-router-config';
import { AsyncComponentProvider } from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';
import { Provider } from 'react-redux';
import './utils/polyfills';
import { currentTheme } from './theme';
import routes from './routes';
import createStore from './redux/store';
import history from './history';
import normalize from './theme/normalize';

injectGlobal([], normalize);

const initData = window.__INIT_DATA_FROM_SERVER_RENDER__; // eslint-disable-line
const rehydrateState = window.ASYNC_COMPONENTS_STATE; // eslint-disable-line

const store = createStore(initData, history);

const app = (
  <AsyncComponentProvider rehydrateState={rehydrateState}>
    <ThemeProvider theme={currentTheme}>
      <Provider store={store}>
        <Router history={history}>
          {renderRoutes(routes)}
        </Router>
      </Provider>
    </ThemeProvider>
  </AsyncComponentProvider>
);

const renderApp = () => {
  hydrate(app, document.getElementById('app'));
};

asyncBootstrapper(app).then(() => {
  renderApp();
});

if (module.hot) {
  module.hot.accept(renderApp);
}
