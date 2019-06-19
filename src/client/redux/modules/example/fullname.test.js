import {
  setFullName,
  SET_FULL_NAME,
  SET_FULL_NAME_ERROR,
  getFirstName,
  getSurname,
  getFirstNameError,
  getSurnameError,

} from './fullname';
import reducer from '.';
import { validate } from '../../middleware/validator';
import { ROUTE } from '../../middleware/route';
import paths from '../../../routes/paths';

describe('signup', () => {
  describe('Action Creators', () => {
    describe('setFullName', () => {
      it('should return the expected action', () => {
        const action = setFullName('first', 'last');
        expect(action).toEqual({
          [validate]: {
            validator: expect.any(Function),
            success: {
              type: SET_FULL_NAME,
              firstName: 'first',
              surname: 'last',
              [ROUTE]: paths.examplephoneAndDOB,
            },
            fail: { type: SET_FULL_NAME_ERROR, firstName: 'first', surname: 'last' },
          },
        });
      });
      it('should be valid when firstName and surname are not empty', () => {
        const firstName = 'first';
        const surname = 'last';
        const { validator } = setFullName(firstName, surname)[validate];
        expect(validator()).toEqual(true);
      });
      it('should be not valid when firstName is empty', () => {
        const firstName = '';
        const surname = 'last';
        const { validator } = setFullName(firstName, surname)[validate];
        expect(validator()).toEqual(false);
      });
      it('should be not valid when surname is empty', () => {
        const firstName = 'first';
        const surname = '';
        const { validator } = setFullName(firstName, surname)[validate];
        expect(validator()).toEqual(false);
      });
      it('should be not valid when both are empty', () => {
        const firstName = '';
        const surname = '';
        const { validator } = setFullName(firstName, surname)[validate];
        expect(validator()).toEqual(false);
      });
    });
  });
  describe('Selectors', () => {
    describe('getFirstName', () => {
      it('should return firstName', () => {
        expect(getFirstName({ firstName: 'test' })).toEqual('test');
      });
    });
    describe('getSurname', () => {
      it('should return surname', () => {
        expect(getSurname({ surname: 'test' })).toEqual('test');
      });
    });
    describe('getFirstNameError', () => {
      it('should return firstNameError', () => {
        expect(getFirstNameError({ firstNameError: 'test' })).toEqual('test');
      });
    });
    describe('getSurnameError', () => {
      it('should return surnameError', () => {
        expect(getSurnameError({ surnameError: 'test' })).toEqual('test');
      });
    });
  });
  describe('Reducers', () => {
    describe('first name', () => {
      it('should be initially null', () => {
        const state = reducer(undefined, { type: 'no' });
        expect(getFirstName(state)).toBeNull();
      });
      it('should be set on SET_FULL_NAME', () => {
        const action = { type: SET_FULL_NAME, firstName: 'hello', surname: '' };
        const state = reducer(undefined, action);
        expect(getFirstName(state)).toEqual('hello');
      });
    });
    describe('surname', () => {
      it('should be initially null', () => {
        const state = reducer(undefined, { type: 'no' });
        expect(getSurname(state)).toBeNull();
      });
      it('should be set on SET_FULL_NAME', () => {
        const action = { type: SET_FULL_NAME, firstName: '', surname: 'hello' };
        const state = reducer(undefined, action);
        expect(getSurname(state)).toEqual('hello');
      });
    });

    describe('first name error', () => {
      it('should be initially null', () => {
        const state = reducer(undefined, { type: 'no' });
        expect(getFirstNameError(state)).toBeNull();
      });
      it('should be set to the error message on SET_FULL_NAME_ERROR when the first name is empty', () => {
        const action = { type: SET_FULL_NAME_ERROR, firstName: '', surname: 'hello' };
        const state = reducer(undefined, action);
        expect(getFirstNameError(state)).toEqual('First name is required');
      });
      it('should be set to null on SET_FULL_NAME when the first name is not empty', () => {
        const state = [
          { type: SET_FULL_NAME_ERROR, firstName: '', surname: 'hello' },
          { type: SET_FULL_NAME, firstName: 'valid', surname: 'hello' },
        ].reduce(reducer, undefined);
        expect(getFirstNameError(state)).toBeNull();
      });
    });
    describe('surname error', () => {
      it('should be initially null', () => {
        const state = reducer(undefined, { type: 'no' });
        expect(getSurnameError(state)).toBeNull();
      });
      it('should be set to the error message on SET_FULL_NAME when the surname is empty', () => {
        const action = { type: SET_FULL_NAME_ERROR, firstName: 'hello', surname: '' };
        const state = reducer(undefined, action);
        expect(getSurnameError(state)).toEqual('Surname is required');
      });
      it('should be set to null on SET_FULL_NAME when the surname is not empty', () => {
        const state = [
          { type: SET_FULL_NAME_ERROR, firstName: 'hello', surname: '' },
          { type: SET_FULL_NAME, firstName: '', surname: 'valid' },
        ].reduce(reducer, undefined);
        expect(getSurnameError(state)).toBeNull();
      });
    });
  });
});
