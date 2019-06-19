/*
Setup for winston logger. Default logger setup is to console and to file. Common
config (like desired log level, or log file location) is already controlled by config
files (see config/default.js) so they can be easily configured per environment.
*/
import path from 'path';
import callerCallsite from 'caller-callsite';

const fomatter = context => ((info = { message: '', level: 'info', path: '', method: '' }) => {
  const {
    url,
    method,
    level,
    message,
    fn,
    error,
    err,
    fatal,
    statusCode,
    ...rest
  } = info;
  const data = {
    msg: message,
    level,
    path: url,
    method,
    pkg: context,
    fn,
    ...rest,
    time: (new Date()).toISOString(),
  };

  if (err || error) {
    data.err = `${error} ${err}`;
  }

  if (statusCode) {
    data.status = statusCode;
  }

  if (statusCode && statusCode < 300) {
    data.http_2xx = 1;
  }

  if (statusCode && statusCode >= 300 && statusCode < 400) {
    data.http_3xx = 1;
  }

  if (statusCode && statusCode >= 400 && statusCode < 500) {
    data.http_4xx = 1;
  }

  if (fatal || (statusCode && statusCode >= 500)) {
    data.http_5xx = 1;
  }

  return JSON.stringify(data);
});

const logger = (context, level) => (message, data) => (
  // eslint-disable-next-line no-console
  console.log(fomatter(context)({ message, level, ...data }))
);

export default ctx => {
  const context = ctx || path.basename(callerCallsite().getFileName());
  return {
    info: logger(context, 'info'),
    warning: logger(context, 'warning'),
    error: logger(context, 'error'),
  };
};
