import React from 'react';
import getLog from '../logging/logger';
import { renderComponent } from '../routes/renderPageRoute';
import Error500 from '../../client/pages/Error/500';

const log = getLog('/server/middlewares/error-page');

// The `next` param is required for express to use this middleware as an error handler.
// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  const { statusCode } = res;
  log.error('Express error handler', { err: err.message, stack: err.stack, statusCode, userId: req.userId, deviceId: req.deviceId });
  res.status(500).send(renderComponent(<Error500 />));
};
