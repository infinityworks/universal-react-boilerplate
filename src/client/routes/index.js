import App from '../App';
import {
  Error404,
  Home,
} from '../pages';
import paths from './paths';

const routes = [
  {
    component: App,
    routes: [
      {
        path: paths.home,
        component: Home,
      },
      {
        path: '*',
        component: Error404,
      },
    ],
  },
];

export default routes;
