import middleware, { preserveSequence, SEQUENCE_KEY, SEQUENCE_ID } from './sequence';

describe('API Latest Middleware', () => {
  it('should call the next function for actions not marked as needing sequence preserving', async () => {
    [
      { type: 'SOME_ACTION' },
      { type: 'API_REQUEST_RECEIVE', payload: 'ok', meta: {} },
      { type: 'API_REQUEST_ERROR', payload: 'an error', meta: {} },
    ].forEach(async action => {
      const next = jest.fn().mockReturnValue(Promise.resolve());
      await middleware({})(next)(action);
      expect(next).toHaveBeenCalledWith(action);
    });
  });

  it('should call the next function for API actions that only arrive in sequence', () => {
    [
      { type: 'API_REQUEST_RECEIVE', meta: { [SEQUENCE_KEY]: 'key', [SEQUENCE_ID]: 1 }, inSequence: true },
      { type: 'API_REQUEST_RECEIVE', meta: { [SEQUENCE_KEY]: 'key', [SEQUENCE_ID]: 3 }, inSequence: true },
      { type: 'API_REQUEST_ERROR', meta: { [SEQUENCE_KEY]: 'key', [SEQUENCE_ID]: 2 }, inSequence: false },
      { type: 'API_REQUEST_RECEIVE', meta: { [SEQUENCE_KEY]: 'key', [SEQUENCE_ID]: 5 }, inSequence: true },
    ].forEach(async action => {
      const next = jest.fn().mockReturnValue(Promise.resolve());
      await middleware({})(next)(action);
      if (action.inSequence) {
        expect(next).toHaveBeenCalledWith(action);
      } else {
        expect(next).not.toHaveBeenCalled();
      }
    });
  });

  it('should keep track of separate keys separately', () => {
    [
      { type: 'API_REQUEST_RECEIVE', meta: { [SEQUENCE_KEY]: 'key1', [SEQUENCE_ID]: 1 }, inSequence: true },
      { type: 'API_REQUEST_RECEIVE', meta: { [SEQUENCE_KEY]: 'key2', [SEQUENCE_ID]: 4 }, inSequence: true },
      { type: 'API_REQUEST_ERROR', meta: { [SEQUENCE_KEY]: 'key1', [SEQUENCE_ID]: 2 }, inSequence: true },
      { type: 'API_REQUEST_ERROR', meta: { [SEQUENCE_KEY]: 'key2', [SEQUENCE_ID]: 3 }, inSequence: false },
    ].forEach(async action => {
      const next = jest.fn().mockReturnValue(Promise.resolve());
      await middleware({})(next)(action);
      if (action.inSequence) {
        expect(next).toHaveBeenCalledWith(action);
      } else {
        expect(next).not.toHaveBeenCalled();
      }
    });
  });

  describe('preserveSequence', () => {
    it('should throw if it doesnt get an array of length 3', () => {
      [
        {},
        [],
        ['a'],
        ['a', 'b'],
        ['a', 'b', 'c', 'd'],
      ].forEach(actions => {
        expect(() => preserveSequence(actions)).toThrowError();
      });
    });

    it('should convert any strings to action objects', () => {
      const result = preserveSequence([{ type: 'A' }, 'B', 'C']);
      expect(result).toHaveLength(3);
      expect(result[0].type).toEqual('A');
      expect(typeof result[1]).toEqual('object');
      expect(result[1].type).toEqual('B');
    });

    it('should add a sequence key equal to the type of the first action to both responses', () => {
      const result = preserveSequence(['A', 'B', 'C']);
      expect(result[0].meta).not.toBeUndefined();
      expect(result[0].meta[SEQUENCE_KEY]).toBeUndefined();
      expect(result[1].meta[SEQUENCE_KEY]).toEqual('A');
      expect(result[2].meta[SEQUENCE_KEY]).toEqual('A');
    });

    it('should add a sequence id that is the same for both kinds of response', () => {
      const result = preserveSequence(['A', 'B', 'C']);
      expect(result[0].meta[SEQUENCE_ID]).toBeUndefined();
      expect(parseFloat(result[1].meta[SEQUENCE_ID])).not.toBeNaN();
      expect(result[2].meta[SEQUENCE_ID]).toEqual(result[1].meta[SEQUENCE_ID]);
    });

    it('sequence id should increase with each call with the same key', () => {
      const result1 = preserveSequence(['A', 'B', 'C']);
      const result2 = preserveSequence(['A', 'B', 'C']);
      const result3 = preserveSequence(['A', 'B', 'C']);
      expect(result3[1].meta[SEQUENCE_ID]).toBeGreaterThan(result2[1].meta[SEQUENCE_ID]);
      expect(result2[1].meta[SEQUENCE_ID]).toBeGreaterThan(result1[1].meta[SEQUENCE_ID]);
    });

    it('sequence id should not increase with each call with different keys', () => {
      const result1 = preserveSequence([Symbol('A'), 'B', 'C']);
      const result2 = preserveSequence([Symbol('A'), 'B', 'C']);
      const result3 = preserveSequence([Symbol('A'), 'B', 'C']);
      expect(result3[1].meta[SEQUENCE_ID]).not.toBeGreaterThan(result2[1].meta[SEQUENCE_ID]);
      expect(result2[1].meta[SEQUENCE_ID]).not.toBeGreaterThan(result1[1].meta[SEQUENCE_ID]);
    });
  });
});
