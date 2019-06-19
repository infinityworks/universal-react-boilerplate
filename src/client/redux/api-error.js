const getDeepProperty = (keyPath, object, defaultValue = null) => (
  keyPath.split('.').reduce((obj, key) => (obj ? obj[key] : null), object) || defaultValue
);

/**
 * Returns the api error code from the given action or null.
 * @param {Action} action api-middleware action
 */
export const getAPIErrorCode = ({ payload } = {}) => getDeepProperty('response.error.errorCode', payload);
/**
 * Returns the api error message from the given action or null.
 * @param {Action} action api-middleware action
 */
export const getAPIErrorMessage = ({ payload } = {}) => getDeepProperty('response.error.message', payload);
