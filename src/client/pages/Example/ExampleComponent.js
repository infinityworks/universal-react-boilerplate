import React from 'react';
import { connect } from 'react-redux';

export const ExampleComponent = () => (
  <div>example</div>
);

export default connect(
  null,
  null,
)(ExampleComponent);
