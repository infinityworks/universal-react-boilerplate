import { handleActions } from 'redux-actions';
import { validate, notEmptyString } from '../../middleware/validator';
import { ROUTE } from '../../middleware/route';
import paths from '../../../routes/paths';

export const SET_ADDRESS = 'SIGNUP/SET_ADDRESS';

const postcodePattern = new RegExp(
  '^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$',
);

export const isPostcodeValid = postcode => notEmptyString(postcode)
  && postcodePattern.test(postcode);

export const setAddress = (line1, line2, townCity, postcode) => ({
  [validate]: {
    validator: () => isPostcodeValid(postcode) && notEmptyString(townCity) && notEmptyString(line1),
    success: { type: SET_ADDRESS,
      line1,
      line2,
      townCity,
      postcode,
      [ROUTE]: paths.examplegpDetails,
    },
    fail: { type: SET_ADDRESS, line1, line2, townCity, postcode },
  },
});

export const getAddress = state => state.address || {};
export const getAddressErrors = state => state.addressErrors || {};
export const getAddressLine1 = state => getAddress(state).line1;
export const getAddressLine1Error = state => getAddressErrors(state).line1;
export const getAddressLine2 = state => getAddress(state).line2;
export const getTownCity = state => getAddress(state).townCity;
export const getTownCityError = state => getAddressErrors(state).townCity;
export const getPostcode = state => getAddress(state).postcode;
export const getPostcodeError = state => getAddressErrors(state).postcode;

export const address = handleActions({
  [SET_ADDRESS]: (state, action) => ({
    line1: action.line1,
    line2: action.line2,
    townCity: action.townCity,
    postcode: action.postcode,
  }),
}, null);

export const addressErrors = handleActions({
  [SET_ADDRESS]: (state, action) => ({
    line1: notEmptyString(action.line1) ? null : 'First line of address is required',
    townCity: notEmptyString(action.townCity) ? null : 'Town / City is required',
    postcode: isPostcodeValid(action.postcode) ? null : 'Postcode is invalid',
  }) }, null);
