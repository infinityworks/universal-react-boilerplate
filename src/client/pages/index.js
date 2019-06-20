import { asyncComponent } from 'react-async-component';

const loadComponent = load => asyncComponent({
  resolve: () => load,
});

// Home
export const Home = loadComponent(import('./Home'));

// Error
export const Error404 = loadComponent(import('./Error/404'));
