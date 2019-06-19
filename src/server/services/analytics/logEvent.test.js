import { logEvent } from './logEvent';

describe('Analytics - Log Event', () => {
  it('should send the expected request', () => {
    const sendReq = jest.fn();
    const data = {
      event: 'test-event',
      userId: 'user-id',
      deviceId: 'device-id',
      props: { a: 1 },
      userProps: { b: 2 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1',
    };

    logEvent('amplitude-api-key', sendReq)(data);
    expect(sendReq).toHaveBeenCalledWith({
      url: 'https://api.amplitude.com/httpapi',
      form: {
        api_key: 'amplitude-api-key',
        event: JSON.stringify({
          user_id: 'user-id',
          device_id: 'device-id',
          event_type: 'test-event',
          platform: 'Web',
          event_properties: { a: 1 },
          user_properties: { b: 2 },
          os_name: 'Mobile Safari',
          os_version: '11',
          device_model: 'iOS',
        }),
      },
    }, expect.any(Function));
  });
});
