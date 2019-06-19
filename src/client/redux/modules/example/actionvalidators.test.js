import * as av from './actionvalidators';

describe('Action Validators', () => {
  describe('validateFirstName', () => {
    [undefined, null, ''].forEach((v) => {
      it(`should return a result of false with an input of ${v}`, () => {
        expect(av.validateFirstName(v)).toEqual(
          { result: false, message: 'First name is required' },
        );
      });
    });
    it('should return a result of true with a valid input', () => {
      expect(av.validateFirstName('joe')).toEqual(
        { result: true },
      );
    });
  });
  describe('validateSurname', () => {
    [undefined, null, ''].forEach((v) => {
      it(`should return a result of false with an input of ${v}`, () => {
        expect(av.validateSurname(v)).toEqual(
          { result: false, message: 'Surname is required' },
        );
      });
    });
    it('should return a result of true with a valid input', () => {
      expect(av.validateSurname('bloggs')).toEqual(
        { result: true },
      );
    });
  });
  describe('validatePhone', () => {
    [undefined, null, '', '1aa', '7906543123'].forEach((v) => {
      it(`should return a result of false with an input of ${v}`, () => {
        expect(av.validatePhone(v)).toEqual(
          { result: false, message: 'A valid UK phone number is required' },
        );
      });
    });
    it('should return a result of true with a valid input', () => {
      expect(av.validatePhone('07906543123')).toEqual(
        { result: true },
      );
    });
  });
  describe('validateDOB', () => {
    [
      { value: undefined, message: 'You must supply a date.' },
      { value: null, message: 'You must supply a date.' },
      { value: {}, message: 'You must supply a valid date.' },
      { value: { year: 'a', month: 12, day: 12 }, message: 'You must supply a valid date.' },
      { value: { year: '2015', month: 12, day: 12 }, message: 'You must be at least 16 years of age.' },
      { value: { year: '1815', month: 12, day: 12 }, message: 'You must supply a year after 1900.' },
    ].forEach((t) => {
      it(`should return a result of false with an value of ${t.value}`, () => {
        expect(av.validateDOB(t.value)).toEqual(
          { result: false, message: t.message },
        );
      });
    });
    it('should return a result of true with a valid input', () => {
      expect(av.validateDOB({ year: 1990, month: 12, day: 1 })).toEqual(
        { result: true },
      );
    });
  });
});
