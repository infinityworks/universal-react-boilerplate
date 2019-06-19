/**
 * This file is used during the build process to generate a static html page
 * for 5XX errors which is set as default response on the API Gateway.
 *
 * Check serverless.yml to see where this file is imported.
 */
import React from 'react';
import Error500 from '../client/pages/Error/500';
import { renderComponent } from './routes/renderPageRoute';

// eslint-disable-next-line import/prefer-default-export
export const html = () => renderComponent(<Error500 />);
