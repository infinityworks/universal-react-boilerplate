// this is the entry point for the server app
import '../config';
import express from 'express';
// import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import path from 'path';
import helmet from 'helmet'
import renderPageRoute from './routes/renderPageRoute';
import actionLogger from './middlewares/logging';
import responseLogger from './logging/response-logger';
import errorPage from './middlewares/error-page';
import sendAmplitudeEvent from './services/analytics/logEvent';
import routes from './routes';
import { STORYBOOK, COOKIE_SECRET } from '../config/server';

global.fetch = require('node-fetch');

const app = express();

// dont reveal whats running server
app.use(helmet({
  hsts: process.env.NODE_ENV !== 'development',
}));

app.use(cookieParser(COOKIE_SECRET));
app.use(compression()); // GZip compress responses
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(responseLogger);

// static files
// app.use(favicon(path.join(__dirname, '../static/favicons/favicon.ico')));
app.use('/', express.static(path.join(__dirname, '../static'), {
  setHeaders: (res, src) => {
    if (express.static.mime.lookup(src).includes('application/font')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // cache fonts 1 year
    }
  },
}));
app.use('/bundles', express.static(path.join(__dirname, '../../dist/bundles')));

// Storybook
if (STORYBOOK) {
  app.use('/storybook', express.static(path.join(__dirname, '../../dist/storybook')));
}

app.get('*', renderPageRoute);

app.use(errorPage);


export default app;
