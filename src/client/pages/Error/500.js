import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from '.';

export const Error500Page = ({ onButtonClick }) => (
  <ErrorPage
    title="Something went wrong"
    message="Sorry there was a problem"
    onButtonClick={onButtonClick}
  />
);

Error500Page.propTypes = {
  onButtonClick: PropTypes.func,
};
Error500Page.defaultProps = {
  onButtonClick: () => {},
};

export default Error500Page;
