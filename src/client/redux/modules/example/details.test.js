import {
  setPhoneNumberAndDOB,
  SET_PHONE_AND_DOB,
  SET_PHONE_AND_DOB_ERROR,
  getPhoneNumber,
  getDOBYear,
  getDOBMonth,
  getDOBDay,
  getPhoneNumberError,
  getDOBError,
  getDOBDate,
} from './details';
import reducer from '.';
import { validate } from '../../middleware/validator';
import { ROUTE } from '../../middleware/route';
import paths from '../../../routes/paths';

describe('signup', () => {
  describe('Action Creators', () => {
    describe('setPhoneNumberAndDOB', () => {
      it('should return the expected action', () => {
        const action = setPhoneNumberAndDOB('07904111211', { year: '1979', month: '5', day: '22' });
        expect(action).toEqual({
          [validate]: {
            validator: expect.any(Function),
            success: {
              type: SET_PHONE_AND_DOB,
              phoneNumber: '07904111211',
              DOB: { year: '1979', month: '5', day: '22' },
              [ROUTE]: paths.exampleaddress,
            },
            fail: {
              type: SET_PHONE_AND_DOB_ERROR,
              phoneNumber: '07904111211',
              DOB: { year: '1979', month: '5', day: '22' },
              [ROUTE]: paths.examplephoneAndDOB,
            },
          },
        });
      });
      it('should be valid with valid inputs', () => {
        const phoneNumber = '07904111211';
        const DOB = { year: '1979', month: '5', day: '22' };
        const { validator } = setPhoneNumberAndDOB(phoneNumber, DOB)[validate];
        expect(validator()).toEqual(true);
      });
      it('should be not valid when phoneNumber is empty', () => {
        const phoneNumber = '';
        const DOB = { year: '1979', month: '5', day: '22' };
        const { validator } = setPhoneNumberAndDOB(phoneNumber, DOB)[validate];
        expect(validator()).toEqual(false);
      });
      it('should be not valid when phoneNumber is invalid', () => {
        const phoneNumber = 'a111';
        const DOB = { year: '1979', month: '5', day: '22' };
        const { validator } = setPhoneNumberAndDOB(phoneNumber, DOB)[validate];
        expect(validator()).toEqual(false);
      });
      it('should be not valid when DOB is empty', () => {
        const phoneNumber = '07904111211';
        const DOB = {};
        const { validator } = setPhoneNumberAndDOB(phoneNumber, DOB)[validate];
        expect(validator()).toEqual(false);
      });
      it('should be not valid when DOB is invalid', () => {
        const phoneNumber = '07904111211';
        const dobs = [
          { year: 'aa11', month: '5', day: '22' },
          { year: '10', month: '5', day: '22' },
          { year: '1978', month: '20', day: '22' },
          { year: '1978', month: '10', day: '82' },
          { year: '1978', month: '10', day: '-1' },
        ];
        dobs.forEach((dob) => {
          const { validator } = setPhoneNumberAndDOB(phoneNumber, dob)[validate];
          expect(validator()).toEqual(false);
        });
      });
      it('should be not valid when DOB is less than 16 years ago', () => {
        const phoneNumber = '07904111211';
        const DOB = { year: '2010', month: '5', day: '22' };
        const { validator } = setPhoneNumberAndDOB(phoneNumber, DOB)[validate];
        expect(validator()).toEqual(false);
      });
      it('should be not valid when DOB year is before 1900', () => {
        const phoneNumber = '07904111211';
        const DOB = { year: '1899', month: '5', day: '22' };
        const { validator } = setPhoneNumberAndDOB(phoneNumber, DOB)[validate];
        expect(validator()).toEqual(false);
      });
    });
  });
  describe('Selectors', () => {
    describe('getPhoneNumber', () => {
      it('should return phoneNumber', () => {
        expect(getPhoneNumber({ phoneNumber: 'test' })).toEqual('test');
      });
    });
    describe('getDOBYear', () => {
      it('should return the year', () => {
        expect(getDOBYear({ DOB: { year: 'test' } })).toEqual('test');
      });
    });
    describe('getDOBMonth', () => {
      it('should return the month', () => {
        expect(getDOBMonth({ DOB: { month: 'test' } })).toEqual('test');
      });
    });
    describe('getDOBDay', () => {
      it('should return the day', () => {
        expect(getDOBDay({ DOB: { day: 'test' } })).toEqual('test');
      });
    });
    describe('getPhoneNumberError', () => {
      it('should return phoneNumberError', () => {
        expect(getPhoneNumberError({ phoneNumberError: 'test' })).toEqual('test');
      });
    });
    describe('getDOBError', () => {
      it('should return DOBError', () => {
        expect(getDOBError({ DOBError: 'test' })).toEqual('test');
      });
    });
    describe('getDOBDate', () => {
      it('should return DOBDate', () => {
        const DOB = { day: 27, month: 7, year: 1992 };
        expect(getDOBDate({ DOB })).toEqual(new Date('1992-07-27T00:00:00Z'));
      });
    });
  });
  describe('Reducers', () => {
    describe('phoneNumber', () => {
      it('should be initially null', () => {
        const state = reducer(undefined, { type: 'no' });
        expect(getPhoneNumber(state)).toBeNull();
      });
      it('should be set on SET_FULL_NAME', () => {
        const action = { type: SET_PHONE_AND_DOB, phoneNumber: 'hello', DOB: {} };
        const state = reducer(undefined, action);
        expect(getPhoneNumber(state)).toEqual('hello');
      });
    });
    describe('DOB', () => {
      describe('Year', () => {
        it('should be initially null', () => {
          const state = reducer(undefined, { type: 'no' });
          expect(getDOBYear(state)).toBeNull();
        });
        it('should be set on SET_PHONE_AND_DOB', () => {
          const action = { type: SET_PHONE_AND_DOB, phoneNumber: '', DOB: { year: '1922' } };
          const state = reducer(undefined, action);
          expect(getDOBYear(state)).toEqual('1922');
        });
      });
      describe('Month', () => {
        it('should be initially null', () => {
          const state = reducer(undefined, { type: 'no' });
          expect(getDOBMonth(state)).toBeNull();
        });
        it('should be set on SET_PHONE_AND_DOB', () => {
          const action = { type: SET_PHONE_AND_DOB, phoneNumber: '', DOB: { month: '11' } };
          const state = reducer(undefined, action);
          expect(getDOBMonth(state)).toEqual('11');
        });
      });
      describe('Day', () => {
        it('should be initially null', () => {
          const state = reducer(undefined, { type: 'no' });
          expect(getDOBDay(state)).toBeNull();
        });
        it('should be set on SET_PHONE_AND_DOB', () => {
          const action = { type: SET_PHONE_AND_DOB, phoneNumber: '', DOB: { day: '22' } };
          const state = reducer(undefined, action);
          expect(getDOBDay(state)).toEqual('22');
        });
      });
    });

    describe('phone number error', () => {
      it('should be initially null', () => {
        const state = reducer(undefined, { type: 'no' });
        expect(getPhoneNumberError(state)).toBeNull();
      });
      it('should be set to the error message on SET_PHONE_AND_DOB_ERROR when the phoneNumber is empty', () => {
        const action = { type: SET_PHONE_AND_DOB_ERROR, phoneNumber: '', DOB: { year: '2010', month: '5', day: '22' } };
        const state = reducer(undefined, action);
        expect(getPhoneNumberError(state)).toEqual('A valid UK phone number is required');
      });
      it('should be set to the error message on SET_PHONE_AND_DOB when the phoneNumber is invalid', () => {
        const action = { type: SET_PHONE_AND_DOB_ERROR, phoneNumber: 'a111', DOB: { year: '2010', month: '5', day: '22' } };
        const state = reducer(undefined, action);
        expect(getPhoneNumberError(state)).toEqual('A valid UK phone number is required');
      });
      it('should be set to null on SET_PHONE_AND_DOB when the phoneNumber becomes valid', () => {
        const state = [
          { type: SET_PHONE_AND_DOB_ERROR, phoneNumber: 'a111', DOB: { year: '2010', month: '5', day: '22' } },
          { type: SET_PHONE_AND_DOB, phoneNumber: '07904111111', DOB: { year: '2010', month: '5', day: '22' } },
        ].reduce(reducer, undefined);
        expect(getPhoneNumberError(state)).toBeNull();
      });
    });
    describe('DOB error', () => {
      it('should be initially null', () => {
        const state = reducer(undefined, { type: 'no' });
        expect(getDOBError(state)).toBeNull();
      });
      it('should be set to the error message on SET_PHONE_AND_DOB_ERROR when the DOB is empty', () => {
        const action = { type: SET_PHONE_AND_DOB_ERROR, phoneNumber: '07904111111', DOB: null };
        const state = reducer(undefined, action);
        expect(getDOBError(state)).toEqual('You must supply a date.');
      });
      it('should be set to the error message on SET_PHONE_AND_DOB_ERROR when the DOB is invalid', () => {
        const action = { type: SET_PHONE_AND_DOB_ERROR, phoneNumber: '07904111111', DOB: { year: 'a111', month: '5', day: '22' } };
        const state = reducer(undefined, action);
        expect(getDOBError(state)).toEqual('You must supply a valid date.');
      });
      it('should be set to the error message on SET_PHONE_AND_DOB_ERROR when the DOB is less than 16 years old', () => {
        const action = { type: SET_PHONE_AND_DOB_ERROR, phoneNumber: '07904111111', DOB: { year: '2010', month: '5', day: '22' } };
        const state = reducer(undefined, action);
        expect(getDOBError(state)).toEqual('You must be at least 16 years of age.');
      });
      it('should be set to null on SET_PHONE_AND_DOB when the DOB becomes valid', () => {
        const state = [
          { type: SET_PHONE_AND_DOB_ERROR, phoneNumber: '07904111111', DOB: { year: '2010', month: '5', day: '22' } },
          { type: SET_PHONE_AND_DOB, phoneNumber: '07904111111', DOB: { year: '1979', month: '5', day: '22' } },
        ].reduce(reducer, undefined);
        expect(getDOBError(state)).toBeNull();
      });
    });
  });
});
