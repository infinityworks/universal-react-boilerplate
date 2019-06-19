import { combineReducers } from 'redux';
import * as fromFullname from './fullname';
import * as fromDetails from './details';
import * as fromAddress from './address';
import * as gp from './gp';

const { firstName, surname, firstNameError, surnameError, ...fullnameSel } = fromFullname;
const { address, addressErrors, ...addressSel } = fromAddress;
const { phoneNumber, DOB, phoneNumberError, DOBError, ...detailsSel } = fromDetails;
const { gpError, gpId, ...gpSel } = gp;

export const selectors = { ...fullnameSel, ...detailsSel, ...addressSel, ...gpSel };

export default combineReducers({
  firstName,
  surname,
  address,
  firstNameError,
  surnameError,
  addressErrors,
  gpId,
  gpError,
  phoneNumber,
  DOB,
  phoneNumberError,
  DOBError,
});
