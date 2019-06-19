import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from '.';

export const Error404Page = ({ onButtonClick }) => (
  <ErrorPage
    title="Page not found"
    message="The page you are looking for does not exist."
    onButtonClick={onButtonClick}
  />
);

Error404Page.propTypes = {
  onButtonClick: PropTypes.func,
};
Error404Page.defaultProps = {
  onButtonClick: () => {},
};

export default Error404Page;
