import React from 'react';
import { storiesOf } from '@storybook/react';
import marked from 'marked';
import README from '../../README.md';


// simple helper to output mardown based docs (defined here instead of main app because it's
// potentially dangerous if misused)
// eslint-disable-next-line react/prop-types
const Markup = ({ content }) => (
  <div
    className="markdown-body"
    dangerouslySetInnerHTML={{ __html: marked(content) }} // eslint-disable-line react/no-danger
  />
);


storiesOf('Introduction', module)
  .add('ReadMe', () => <Markup content={README} />);
