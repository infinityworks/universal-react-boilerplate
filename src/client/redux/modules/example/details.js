import { handleActions } from 'redux-actions';
import { validate } from '../../middleware/validator';
import { ROUTE } from '../../middleware/route';
import paths from '../../../routes/paths';
import * as av from './actionvalidators';

export const SET_PHONE_AND_DOB = 'SIGNUP/SET_PHONE_AND_DOB';
export const SET_PHONE_AND_DOB_ERROR = 'SIGNUP/SET_PHONE_AND_DOB_ERROR';

export const setPhoneNumberAndDOBSuccess = (phoneNumber, DOB) => ({
  type: SET_PHONE_AND_DOB,
  phoneNumber,
  DOB,
  [ROUTE]: paths.exampleaddress,
});

export const setPhoneNumberAndDOBFailure = (phoneNumber, DOB) => ({
  type: SET_PHONE_AND_DOB_ERROR,
  phoneNumber,
  DOB,
  [ROUTE]: paths.examplephoneAndDOB,
});

export const setPhoneNumberAndDOB = (phoneNumber, DOB) => ({
  [validate]: {
    validator: () => av.validatePhone(phoneNumber).result && av.validateDOB(DOB).result,
    success: setPhoneNumberAndDOBSuccess(phoneNumber, DOB),
    fail: setPhoneNumberAndDOBFailure(phoneNumber, DOB),
  },
});
export const getPhoneNumber = state => state.phoneNumber;
export const getDOBDate = ({ DOB }) => {
  const { year, month, day } = DOB;
  return new Date(Date.UTC(year, month - 1, day));
};
export const getDOBYear = state => state.DOB.year;
export const getDOBMonth = state => state.DOB.month;
export const getDOBDay = state => state.DOB.day;
export const getPhoneNumberError = state => state.phoneNumberError;
export const getDOBError = state => state.DOBError;

export const phoneNumber = handleActions({
  [SET_PHONE_AND_DOB]: (state, action) => action.phoneNumber,
  [SET_PHONE_AND_DOB_ERROR]: (state, action) => action.phoneNumber,
}, null);

export const DOB = handleActions({
  [SET_PHONE_AND_DOB]: (state, action) => action.DOB,
  [SET_PHONE_AND_DOB_ERROR]: (state, action) => action.DOB,
}, {
  year: null,
  month: null,
  day: null,
});

export const phoneNumberError = handleActions({
  [SET_PHONE_AND_DOB]: () => null,
  [SET_PHONE_AND_DOB_ERROR]: (state, action) => (
    av.validatePhone(action.phoneNumber).message || null
  ),
}, null);

export const DOBError = handleActions({
  [SET_PHONE_AND_DOB]: () => null,
  [SET_PHONE_AND_DOB_ERROR]: (state, action) => av.validateDOB(action.DOB).message || null,
}, null);
