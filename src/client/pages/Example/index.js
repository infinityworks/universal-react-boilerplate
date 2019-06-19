import { attachPageComponent } from '../route-utils';
import * as routes from './routes';

const { page, ...actionRoutes } = attachPageComponent(routes, import('./ExampleComponent'));

export default page;
export { actionRoutes };
