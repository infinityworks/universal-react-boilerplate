import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import { injectGlobal, ThemeProvider, ServerStyleSheet, StyleSheetManager } from 'styled-components';
import serialize from 'serialize-javascript';
import { AsyncComponentProvider, createAsyncContext } from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';
import getLog from '../logging/logger';
import routes from '../../client/routes';
import { currentTheme } from '../../client/theme';
import normalize from '../../client/theme/normalize';
import * as gta from './google-tag-manager';

injectGlobal([], normalize);

const log = getLog('/server/routes/renderPageRoute');

const createApp = (store, url, routerContext, asyncContext, sheet) => (
  <AsyncComponentProvider asyncContext={asyncContext}>
    <StyleSheetManager sheet={sheet.instance}>
      <Provider store={store}>
        <ThemeProvider theme={currentTheme}>
          <StaticRouter location={url} context={routerContext}>
            {renderRoutes(routes)}
          </StaticRouter>
        </ThemeProvider>
      </Provider>
    </StyleSheetManager>
  </AsyncComponentProvider>
);

const renderHTML = ({ content, styles, helmet, enableJS, clientData, asyncState, intercomSettings }) => `<!doctype html>
<html ${helmet.htmlAttributes.toString()} >
  <head>
    <meta charset="utf-8" />
    ${gta.head()}
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    ${styles}
  </head>
  <body ${helmet.bodyAttributes.toString()} >
    ${gta.body()}
    <div id="app">${content}</div>
    <script>
      ${clientData ? `window.__INIT_DATA_FROM_SERVER_RENDER__ = ${serialize(clientData)};` : ''}
      ${asyncState ? `window.ASYNC_COMPONENTS_STATE = ${serialize(asyncState)};` : ''}
      ${intercomSettings ? `window.intercomSettings = ${serialize(intercomSettings)};` : ''}
    </script>
    <script>
    (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/' ;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()
    </script>
    ${enableJS ? '<script src="/bundles/index.js"></script>' : ''}
  </body>
</html>  
`;

/** Renders a component as a static markup, no html or anything else. */
export const renderComponent = Component => {
  const sheet = new ServerStyleSheet();
  const App = (
    <StyleSheetManager sheet={sheet.instance}>
      <ThemeProvider theme={currentTheme}>
        { Component }
      </ThemeProvider>
    </StyleSheetManager>
  );
  const content = renderToStaticMarkup(App);
  const helmet = Helmet.renderStatic();
  const styleTags = sheet.getStyleTags();
  return renderHTML({
    content,
    helmet,
    styles: styleTags,
    enableJS: false,
  });
};

export default async (req, res, next) => {
  if (res.statusCode >= 300) {
    return next();
  }
  try {
    const initialState = req.store ? req.store.getState() : {};
    const routerContext = {};
    const asyncContext = createAsyncContext();
    const sheet = new ServerStyleSheet();
    const app = createApp(req.store, req.url, routerContext, asyncContext, sheet);
    // Load all async components
    await asyncBootstrapper(app);
    // Render the page
    const content = renderToString(app);
    const helmet = Helmet.renderStatic();
    const styleTags = sheet.getStyleTags();

    if (routerContext.url) {
      res.redirect(307, routerContext.url);
      return next();
    }

    res.setHeader('Content-Type', 'text/html');
    res.send(renderHTML({
      content,
      asyncState: asyncContext.getState(),
      clientData: initialState,
      helmet,
      styles: styleTags,
      enableJS: true,
    }));
  } catch (error) {
    log.error('Unexpected error', { err: error.stack, fatal: true, userId: req.userId, deviceId: req.deviceId });
    // TODO: set path relative to server folder so it works in prod (i.e. from dist/server)
    res.status(500).sendFile('src/server/views/500.html', { root: process.cwd() });
  }
  return next();
};
