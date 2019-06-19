import { asyncComponent } from 'react-async-component';

const loadComponent = load => asyncComponent({
  resolve: () => load,
});

// Note: you might be wondering why we need `import('...')`
// on every line below. The reason is that parcel will not recognise
// the import function and create the separate chunk otherwise.
// Still better than webpack.

// Home
export const Home = loadComponent(import('./Home'));

// Error
export const Error404 = loadComponent(import('./Error/404'));
