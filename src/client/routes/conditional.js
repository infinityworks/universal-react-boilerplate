/* eslint-disable import/prefer-default-export */
// import paths from './paths';
// import {
//   getIdToken,
// } from '../redux/modules/root-reducer';

// export const combine = (...conditions) => state => conditions.reduce((acc, isAllowed) => {
//   if (typeof acc === 'string') return acc;
//   return isAllowed(state);
// }, true);

const conditionalRoute = (testFn, fallbackRoute) => state => (testFn(state) ? true : fallbackRoute);

// export const loggedIn = conditionalRoute(
//   state => getIdToken(state) != null,
//   paths.login.root,
// );

// export const notLoggedIn = conditionalRoute(
//   state => getIdToken(state) == null,
//   '/',
// );


export const hasCondition = conditionalRoute(
  () => true,
  '/',
);
