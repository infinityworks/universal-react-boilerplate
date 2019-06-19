import {
  CLEAR_GP_ERROR,
  SET_GP_ID,
  SET_GP_ERROR,
  getGPError,
  clearGPError,
  submitGP,
  getGPId,
} from './gp';
import reducer from '.';
import { validate } from '../../middleware/validator';
import { ROUTE } from '../../middleware/route';
import paths from '../../../routes/paths';

describe('signup', () => {
  describe('Action Creators', () => {
    describe('submitGP', () => {
      it('should return the expected action', () => {
        const action = submitGP('3');
        expect(action).toMatchObject({
          type: 'SUBMIT_GP_VALIDATION',
          [validate]: {
            validator: expect.any(Function),
            success: { type: SET_GP_ID, id: '3', [ROUTE]: paths.examplecreateUser },
            fail: { type: SET_GP_ERROR, error: 'Please select a GP' },
          },
        });
      });
      it('should be valid gpId is set', () => {
        const action = submitGP('3');
        const { validator } = action[validate];
        expect(validator()).toEqual(true);
      });
      it('should be not valid when gp is not set', () => {
        const action = submitGP();
        const { validator } = action[validate];
        expect(validator()).toEqual(false);
      });
    });
    describe('clearGPError', () => {
      it('should return the expected action', () => {
        const action = clearGPError();
        expect(action).toEqual({
          type: CLEAR_GP_ERROR,
        });
      });
    });
  });
  describe('Selectors', () => {
    describe('getGPError', () => {
      it('should return gpError', () => {
        expect(getGPError({ gpError: 'test' })).toEqual('test');
      });
    });
    describe('getGPId', () => {
      it('should return gpId', () => {
        expect(getGPId({ gpId: 'test' })).toEqual('test');
      });
    });
  });
  describe('Reducers', () => {
    describe('gpError', () => {
      it('should be initially null', () => {
        const state = reducer(undefined, { type: 'no' });
        expect(getGPError(state)).toBeNull();
      });
      it('should be set on SET_GP_ERROR', () => {
        const action = { type: SET_GP_ERROR, error: 'error' };
        const state = reducer(undefined, action);
        expect(getGPError(state)).toEqual('error');
      });
      it('should be set to null on CLEAR_GP_ERROR', () => {
        const state = [
          { type: SET_GP_ERROR, error: 'no' },
          clearGPError(),
        ].reduce(reducer, undefined);
        expect(getGPError(state)).toBeNull();
      });
    });
    describe('gpId', () => {
      it('should be initially null', () => {
        const state = reducer(undefined, { type: 'no' });
        expect(getGPId(state)).toBeNull();
      });
      it('should be set on SET_GP_ID', () => {
        const action = { type: SET_GP_ID, id: 'hello' };
        const state = reducer(undefined, action);
        expect(getGPId(state)).toEqual('hello');
      });
      it('should be set to null on SET_GP_ERROR', () => {
        const state = [
          { type: SET_GP_ID, id: 'hello' },
          { type: SET_GP_ERROR, error: 'no' },
        ].reduce(reducer, undefined);
        expect(getGPId(state)).toBeNull();
      });
    });
  });
});
