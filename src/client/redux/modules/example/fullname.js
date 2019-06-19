import { handleActions } from 'redux-actions';
import { validate } from '../../middleware/validator';
import { ROUTE } from '../../middleware/route';
import paths from '../../../routes/paths';
import * as av from './actionvalidators';

export const SET_FULL_NAME = 'SIGNUP/SET_FULL_NAME';
export const SET_FULL_NAME_ERROR = 'SIGNUP/SET_FULL_NAME_ERROR';

const setFullNameSuccess = (firstName, surname) => ({
  type: SET_FULL_NAME,
  firstName,
  surname,
  [ROUTE]: paths.examplephoneAndDOB,
});

const setFullNameFailure = (firstName, surname) => ({
  type: SET_FULL_NAME_ERROR,
  firstName,
  surname,
});

export const setFullName = (firstName, surname) => ({
  [validate]: {
    validator: () => av.validateFirstName(firstName).result && av.validateSurname(surname).result,
    success: setFullNameSuccess(firstName, surname),
    fail: setFullNameFailure(firstName, surname),
  },
});

export const getFirstName = state => state.firstName;
export const getSurname = state => state.surname;
export const getFirstNameError = state => state.firstNameError;
export const getSurnameError = state => state.surnameError;

export const firstName = handleActions({
  [SET_FULL_NAME]: (state, action) => action.firstName,
}, null);

export const surname = handleActions({
  [SET_FULL_NAME]: (state, action) => action.surname,
}, null);

export const firstNameError = handleActions({
  [SET_FULL_NAME]: () => null,
  [SET_FULL_NAME_ERROR]: (state, action) => av.validateFirstName(action.firstName).message || null,
}, null);

export const surnameError = handleActions({
  [SET_FULL_NAME]: () => null,
  [SET_FULL_NAME_ERROR]: (state, action) => av.validateSurname(action.surname).message || null,
}, null);
