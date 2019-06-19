import mapping from './mapping';

export default ({ sendEvent }) => (req, res, next) => {
  if (res.statusCode >= 300) return next();

  const eventName = mapping[req.url];
  if (!eventName) return next();

  const eventData = {
    event: eventName,
    userId: req.userId,
    userAgent: req.headers['user-agent'] || '',
  };

  sendEvent(eventData);
  return next();
};
