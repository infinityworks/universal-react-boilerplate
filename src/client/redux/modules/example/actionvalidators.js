// ACTION VALIDATORS
const isValidNameString = name => name != null && name.length > 0;

const isPhoneNumberValid = phoneNumber => new RegExp(/(\+44|0)[0-9]{10,15}/g).test(phoneNumber);

const isDOBNotEmpty = dob => dob && dob !== null;

const isDOBLegal = date => {
  const lastValidDate = new Date();
  lastValidDate.setFullYear(lastValidDate.getFullYear() - 16);
  return date < lastValidDate;
};

const isDOBYearAfter1900 = year => year >= 1900;

export const isValidDate = (y, m, d) => {
  try {
    // create the date object with the values sent in (month is zero based)
    const dt = new Date(parseInt(y), parseInt(m) - 1, parseInt(d), 0, 0, 0, 0);

    // get the month, day, and year from the object we just created
    const mon = dt.getMonth() + 1;
    const day = dt.getDate();
    const yr = dt.getYear() + 1900;

    // if they match then the date is valid
    return mon === parseInt(m) && yr === parseInt(y) && day === parseInt(d);
  } catch (e) {
    return false;
  }
};

export const validateFirstName = (firstname) => {
  if (!isValidNameString(firstname)) return { result: false, message: 'First name is required' };
  return { result: true };
};

export const validateSurname = (lastname) => {
  if (!isValidNameString(lastname)) return { result: false, message: 'Surname is required' };
  return { result: true };
};

export const validatePhone = phoneNumber => {
  if (!isPhoneNumberValid(phoneNumber)) {
    return { result: false, message: 'A valid UK phone number is required' };
  }
  return { result: true };
};

export const validateDOB = dob => {
  if (!isDOBNotEmpty(dob)) {
    return { result: false, message: 'You must supply a date.' };
  }

  const { year, month, day } = dob;
  const dt = new Date(Date.UTC(year, month - 1, day));

  if (!isValidDate(year, month, day)) {
    return { result: false, message: 'You must supply a valid date.' };
  }
  if (!isDOBYearAfter1900(dt.getUTCFullYear())) {
    return { result: false, message: 'You must supply a year after 1900.' };
  }
  if (!isDOBLegal(dt)) {
    return { result: false, message: 'You must be at least 16 years of age.' };
  }

  return { result: true };
};
