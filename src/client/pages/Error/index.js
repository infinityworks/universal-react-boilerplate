import React from 'react';
import PropTypes from 'prop-types';

const ErrorPage = ({ title, message, onButtonClick }) => (
  <div>error</div>
);

ErrorPage.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onButtonClick: PropTypes.func,
};
ErrorPage.defaultProps = {
  title: '',
  message: '',
  onButtonClick: () => {},
};

export default ErrorPage;
