import { handleActions } from 'redux-actions';
import { validate } from '../../middleware/validator';
import { ROUTE } from '../../middleware/route';
import paths from '../../../routes/paths';

export const SET_GP_ID = 'SIGNUP/SET_GP_ID';
export const SET_GP_ERROR = 'SIGNUP/SET_GP_ERROR';
export const CLEAR_GP_ERROR = 'SIGNUP/CLEAR_GP_ERROR';

export const submitGP = gpId => ({
  type: 'SUBMIT_GP_VALIDATION',
  [validate]: {
    validator: () => gpId != null,
    success: { type: SET_GP_ID, id: gpId, [ROUTE]: paths.examplecreateUser },
    fail: { type: SET_GP_ERROR, error: 'Please select a GP' },
  },
});

export const clearGPError = () => ({
  type: CLEAR_GP_ERROR,
});

export const getGPError = state => state.gpError;
export const getGPId = state => state.gpId;

export const gpError = handleActions({
  [SET_GP_ERROR]: (state, action) => action.error,
  [CLEAR_GP_ERROR]: () => null,
}, null);

export const gpId = handleActions({
  [SET_GP_ID]: (state, action) => action.id,
  [SET_GP_ERROR]: () => null,
}, null);
