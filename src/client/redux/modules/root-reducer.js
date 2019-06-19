import { combineReducers } from 'redux';
import signup, { selectors as fromSignup } from './example';

// Signup
export const getSignupFirstName = (
  state => fromSignup.getFirstName(state.signup)
);
export const getSignupSurname = (
  state => fromSignup.getSurname(state.signup)
);

export default combineReducers({
  signup,
});
