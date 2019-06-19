import UAParser from 'ua-parser-js';
import request from 'request';
import getLog from '../../logging/logger';
import { AMPLITUDE_KEY } from '../../../config/server';

const logger = getLog('amplitude');

/**
     * Log an event in Amplitude
     * @param {string} event       The event name.
     * @param {string} userId      The ID of the user which performed the event.
     * @param {string} deviceId    The unique ID of the browser.
     * @param {object} [props]     The event properties.
     * @param {object} [userProps] The properties of the user.
     */
export const logEvent = (
  apiKey,
  sendPostRequest,
) => ({ event, userId, deviceId, props, userProps, userAgent }) => {
  const eventData = {
    user_id: userId || null,
    device_id: deviceId || null,
    event_type: event,
    platform: 'Web',
  };

  if (props) {
    eventData.event_properties = props;
  }
  if (userProps) {
    eventData.user_properties = userProps;
  }

  if (userAgent) {
    const ua = new UAParser(userAgent).getResult();
    eventData.os_name = ua.browser.name || null;
    eventData.os_version = ua.browser.major || null;
    eventData.device_model = ua.os.name || null;
  }

  sendPostRequest({
    url: 'https://api.amplitude.com/httpapi',
    form: {
      api_key: apiKey,
      event: JSON.stringify(eventData),
    },
  }, (err, response, body) => {
    if (err) {
      logger.error('Error uploading event:', { err: err.message });
      return;
    }

    if (response.statusCode !== 200) {
      logger.warning('Unexpected status code', { statusCode: response.statusCode, body });
    }
  });
};

export default logEvent(AMPLITUDE_KEY, (req, cb) => request.post(req, cb));
