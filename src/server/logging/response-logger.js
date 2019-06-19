import morgan from 'morgan';

const statusCategory = status => {
  if (status < 300) return { http_2xx: 1 };
  if (status < 400) return { http_3xx: 1 };
  if (status < 500) return { http_4xx: 1 };
  return { http_5xx: 1 };
};

export default morgan((tokens, req, res) => JSON.stringify({
  time: new Date().toISOString(),
  src: 'rl',
  status: parseInt(tokens.status(req, res)),
  ...statusCategory(tokens.status(req, res)),
  len: tokens.res(req, res, 'content-length'),
  ms: Math.round(parseFloat(tokens['response-time'](req, res))),
  method: tokens.method(req, res),
  path: tokens.url(req, res),
}));
