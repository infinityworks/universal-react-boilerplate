import { CALL_API } from 'redux-api-middleware';
import middleware, { CHAIN_NEXT, chainAPIActions } from './chain';

describe('Chain Middleware', async () => {
  it('should call the next function for actions not marked as having a chain', async () => {
    [
      { type: 'SOME_ACTION' },
      { type: 'API_REQUEST_RECEIVE', payload: 'ok', meta: {} },
      { type: 'API_REQUEST_ERROR', payload: 'an error', meta: {} },
    ].forEach(async action => {
      const next = jest.fn().mockReturnValue(Promise.resolve());
      await middleware({})(next)(action);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(action);
    });
  });

  describe('behaviour when CHAIN_NEXT is set', () => {
    let reducerResult;
    let dispatch;
    let next;
    let nextAction;
    let chainNext;
    let action;
    let result;

    beforeAll(async () => {
      reducerResult = async ({ type }) => type;
      dispatch = jest.fn(reducerResult);
      next = jest.fn(reducerResult);
      nextAction = { type: 'ANOTHER_ACTION' };
      chainNext = jest.fn().mockReturnValue(nextAction);
      action = {
        type: 'SOME_ACTION',
        [CHAIN_NEXT]: chainNext,
      };
      result = await middleware({ dispatch })(next)(action);
    });

    it('should still pass the original action down the chain', () => {
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(action);
    });
    it('should call the CHAIN_NEXT action creator with the original action', () => {
      expect(chainNext).toHaveBeenCalledTimes(1);
      expect(chainNext).toHaveBeenCalledWith(action);
    });
    it('should put the result of that function back at the start of the middleware chain', () => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(nextAction);
    });
    it('should await both actions and return the result of the last', async () => {
      expect(result).toEqual(await reducerResult(nextAction));
    });
    it('should not send anything down the middleware chain if the next fn returns null', async () => {
      await middleware({ dispatch })(next)({
        type: 'SOME_ACTION',
        [CHAIN_NEXT]: () => null,
      });
      expect(dispatch).not.toHaveBeenCalledWith(null);
    });
  });

  describe('chainAPIActions utility', () => {
    const createAPIAction = (type = 'SOME_API_ACTION') => ({
      type,
      [CALL_API]: {
        types: [
          'REQUEST',
          'SUCCESS',
          'FAILURE',
        ],
      },
    });
    it('should return the given action if no chain is also passed', () => {
      const action = createAPIAction();
      expect(chainAPIActions(action)).toEqual(action);
    });

    it('should add [CHAIN_NEXT] flag to success action if chain is passed', () => {
      const originalAction = createAPIAction('FIRST_ACTION');
      const nextAction = { type: 'some_action' };
      const result = chainAPIActions(originalAction, () => nextAction);
      expect(result.type).toEqual('FIRST_ACTION');
      const { types } = result[CALL_API];
      expect(types[0]).toEqual('REQUEST');
      expect(types[2]).toEqual('FAILURE');
      expect(typeof types[1]).toEqual('object');
      expect(types[1].type).toEqual('SUCCESS');
      expect(typeof types[1][CHAIN_NEXT]).toEqual('function');
      expect(types[1][CHAIN_NEXT]({})).toEqual(nextAction);
    });

    it('should support multiple levels of nesting', () => {
      const firstAction = createAPIAction('FIRST_ACTION');
      const secondAction = createAPIAction('SECOND_ACTION');
      const thirdAction = createAPIAction('THIRD_ACTION');
      const result1 = chainAPIActions(
        firstAction,
        () => secondAction,
        () => thirdAction,
      );
      expect(result1.type).toEqual('FIRST_ACTION');
      const result2 = result1[CALL_API].types[1][CHAIN_NEXT]({});
      expect(result2.type).toEqual('SECOND_ACTION');
      const result3 = result2[CALL_API].types[1][CHAIN_NEXT]({});
      expect(result3.type).toEqual('THIRD_ACTION');
    });
  });
});
