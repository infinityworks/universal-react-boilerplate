import React from 'react';
import styled from 'styled-components';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { hot } from 'react-hot-loader';

const AppWrapper = styled.div`
  overflow: hidden;
`;

const App = ({ route }) => (
  <AppWrapper className="app-wrapper">
    <Helmet>
      {/* Set site wide header info here and specific overrides in pages */}
      <title>App Boilerplate</title>
      <meta name="description" content="" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <link rel="canonical" href="" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=2, user-scalable=yes"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="" />
      <meta property="og:title" content="App Boilerplate" />
      <meta property="og:description" content="" />
      <meta property="og:image" content="/og/open_graph.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1000" />
      <meta property="og:image:height" content="1000" />
      <meta property="og:site_name" content="App Boilerplate" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/favicons/icon-192x192.png" />
      <link rel="manifest" href="/favicons/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/favicons/icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
    {renderRoutes(route.routes)}
  </AppWrapper>
);

App.propTypes = {
  route: PropTypes.object.isRequired,
};

export default hot(module)(App);
