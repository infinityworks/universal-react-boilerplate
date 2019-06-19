import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { combine } from './conditional';

const redirectWrapper = Component => ({ isAllowedOrRoute, ...props }) => (
  (isAllowedOrRoute === true ? <Component {...props} /> : <Redirect to={isAllowedOrRoute} />)
);

const conditionalPage = ({ isAllowed, component }) => connect(
  state => ({ isAllowedOrRoute: combine(...isAllowed)(state) }),
)(redirectWrapper(component));

export default page => ({
  path: page.path,
  exact: true,
  component: conditionalPage(page),
  action: page.action,
});
