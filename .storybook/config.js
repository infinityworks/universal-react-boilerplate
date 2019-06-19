//main config for storybook

import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router'
import { setOptions } from '@storybook/addon-options';
import { injectGlobal } from 'styled-components';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import './storybook.css'
import normalize from '../src/client/theme/normalize';

injectGlobal([], normalize);

import { currentTheme } from '../src/client/theme';
addDecorator(withThemesProvider([currentTheme]));
addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>);

setOptions({
  sortStoriesByKind: true
});

// automatically import all files ending in *.stories.js
const req = require.context('../src/client', true, /.stories.js$/);
function loadStories() {
  //Note: sortStoriesByKind doesnt seem to work so force intro story first
  req('./introduction.stories.js');
  
  req.keys()
    .forEach((filename) => req(filename));
}

configure(loadStories, module);

