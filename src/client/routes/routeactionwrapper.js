import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { matchRoutes } from 'react-router-config';
import { connect } from 'react-redux';


/**
 * `RouteActionWrapper` dispatches the action associated with the current route.
 * It's the client-side equivalent of `server/routes/actions.js`.
 */
class RouteActionWrapper extends Component {
  componentDidMount() {
    this.sendAction();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location.pathname === prevProps.location.pathname) {
      this.sendAction();
    }
  }

  sendAction() {
    const { routes, location, dispatch } = this.props;
    const results = matchRoutes(routes, location.pathname);
    if (!Array.isArray(results) || results.length === 0) {
      return;
    }
    const result = results[results.length - 1];
    const actionCreator = result.route.action;
    if (typeof actionCreator !== 'function') {
      return;
    }
    const action = actionCreator({
      query: queryString.parse(location.search),
      params: result.match.params,
      body: {},
      cookies: {},
    });
    dispatch(action);
  }


  render() {
    const { children } = this.props;
    return children;
  }
}

RouteActionWrapper.propTypes = {
  routes: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(() => ({}), dispatch => ({ dispatch }))(withRouter(RouteActionWrapper));
