import React from 'react';
import { storiesOf } from '@storybook/react';
import { actionPreventDefault } from '../../storybook-utils';
import ErrorPage from '.';
import Error404 from './404';
import Error500 from './500';

const actions = {
  onButtonClick: actionPreventDefault('Button click'),
};

storiesOf('Pages/Error', module)
  .add('default', () => <ErrorPage title="Title" message="Message" {...actions} />)
  .add('404', () => <Error404 {...actions} />)
  .add('500', () => <Error500 {...actions} />);
