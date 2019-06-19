// common test init run before ever unit test file
/* eslint-disable*/
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import './jest.polyfills.js'; // polyfills must be imported before other imports to suppress jest warnings
import { configure, shallow, render, mount } from 'enzyme';
import { currentTheme as defaultTheme } from '../../src/client/theme';
import { ThemeProvider } from 'styled-components';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer'
import 'jest-styled-components';

// React Enzyme adapter
configure({ adapter: new Adapter() });

// expose common functions used in tests
// yes, globals are bad, but;
// a) this is only in our tests, not production code
// b) these would be imported in every test anyway making them implicit globals
global.React = React;
global.mount = mount;
global.mountWithTheme = (Tree, theme = defaultTheme) => {
  return mount(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        { Tree }
      </MemoryRouter>
    </ThemeProvider>
  ).children(); // the children are the input Tree.
};
global.render = render;
global.renderWithTheme = (Tree, theme = defaultTheme) => {
  const context = shallow(<ThemeProvider theme={theme}><MemoryRouter /></ThemeProvider>)
    .instance()
    .getChildContext()
  return render(Tree, { context });
};
global.shallow = shallow;
global.shallowWithTheme = (Tree, theme = defaultTheme) => {
  const context = shallow(<ThemeProvider theme={theme}><MemoryRouter /></ThemeProvider>)
    .instance()
    .getChildContext()
  return shallow(Tree, { context })
};
global.snapshot = (Tree) => renderer.create(Tree).toJSON();
global.snapshotWithTheme = (Tree, theme = defaultTheme) => renderer.create(
  <ThemeProvider theme={theme}>
    <MemoryRouter>
      { Tree }
    </MemoryRouter>
  </ThemeProvider>
).toJSON();

// Catch unhandledRejection and log the stack trace.
process.on('unhandledRejection', (reason) => {
	console.log('Rejection Error', reason)
})
