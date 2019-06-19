import { PORT } from '../config/server';
import app from './app';
import getLog from './logging/logger';

const log = getLog();

const server = app.listen(PORT, () => {
  log.info(`Server started on port ${server.address().port} in ${app.get('env')} mode`);
  // Its very useful to output init config to console at startup but we deliberately dont dump it to
  // log files incase it contains sensetive info (like keys for services etc)
  // 'ready' is a hook used by the e2e (integration) tests (see node-while)
  server.emit('ready');
});

// export server instance so we can hook into it in e2e tests etc
export default server;
