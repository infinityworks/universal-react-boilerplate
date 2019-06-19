
import { createBrowserHistory as createHistory } from 'history';

export default (global.window ? createHistory({}) : {});
