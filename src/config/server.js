import { getEnvFlag, getEnvVar } from './utils';

export const PORT = getEnvVar(process.env.NODE_PORT, 5000);
export const STORYBOOK = getEnvFlag(process.env.STORYBOOK);
export const DYNAMO_SESSION_TABLE = getEnvVar(process.env.DYNAMODB_SESSION_TABLE, 'example-web-sessions');
export const DYNAMO_LIVE = getEnvFlag(process.env.DYNAMODB_LIVE);
export const LOG_LEVEL = getEnvVar(process.env.LOG_LEVEL, 'info');
export const COOKIE_SECRET = getEnvVar(process.env.COOKIE_SECRET, 'secret');
export const GOOGLE_TAG_MANAGER_ID = getEnvVar(process.env.GOOGLE_TAG_MANAGER_ID, '');
export const AMPLITUDE_KEY = getEnvVar(process.env.AMPLITUDE_KEY);
