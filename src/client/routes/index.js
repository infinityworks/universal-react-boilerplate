import App from '../App';
import {
  // Login,
  Error404,
  Home,
} from '../pages';
// import createCheckoutExemptPage from '../pages/Checkout/AreYouExempt';
import paths from './paths';

const routes = [
  {
    component: App,
    routes: [
      // routeForPage(createCheckoutExemptPage),
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
