import {
  setAddress,
  getAddress,
  getAddressErrors,
  SET_ADDRESS,
  getAddressLine1,
  getAddressLine2,
  getTownCity,
  getPostcode,
  getAddressLine1Error,
  getTownCityError,
  getPostcodeError,
} from './address';
import reducer from '.';
import { validate } from '../../middleware/validator';
import { ROUTE } from '../../middleware/route';
import paths from '../../../routes/paths';

describe('signup', () => {
  describe('Action Creators', () => {
    describe('setAddress', () => {
      it('should return the expected action', () => {
        const action = setAddress('Merchants Warehouse', '21 Castle Street', 'Manchester', 'M34LZ');
        expect(action[validate].success).toEqual({
          type: SET_ADDRESS,
          line1: 'Merchants Warehouse',
          line2: '21 Castle Street',
          townCity: 'Manchester',
          postcode: 'M34LZ',
          [ROUTE]: paths.examplegpDetails,
        });
        expect(action[validate].fail).toEqual({
          type: SET_ADDRESS,
          line1: 'Merchants Warehouse',
          line2: '21 Castle Street',
          townCity: 'Manchester',
          postcode: 'M34LZ',
        });
      });
      it('should not be valid when first line of address is missing', () => {
        const invalids = [undefined, null, '', []];
        invalids.forEach((val) => {
          const { validator } = setAddress(val, 'line2', 'townCity', 'M3 4LZ')[validate];
          expect(validator()).toEqual(false);
        });
      });
      it('should not be valid when city or town is missing', () => {
        const invalids = [undefined, null, '', []];
        invalids.forEach((val) => {
          const { validator } = setAddress('line1', 'line2', val, 'M3 4LZ')[validate];
          expect(validator()).toEqual(false);
        });
      });
      it('should not be valid when postcode is invalid', () => {
        const invalids = [undefined, null, '', 'invalid', 'AI1 1AI', 'AZ1 1AZ', 'AAA11B'];
        invalids.forEach((val) => {
          const { validator } = setAddress('line1', 'line2', 'townCity', val)[validate];
          expect(validator()).toEqual(false);
        });
        const valids = ['WC2H 7LT', 'M3 4LZ', 'M34LZ', 'm34lz'];
        valids.forEach((val) => {
          const { validator } = setAddress('line1', 'line2', 'townCity', val)[validate];
          expect(validator()).toEqual(true);
        });
      });
    });
  });
  describe('Selectors', () => {
    describe('getAddressLine1', () => {
      it('should return first line of address', () => {
        expect(getAddressLine1({ address: { line1: 'line1' } })).toEqual('line1');
      });
    });
    describe('getAddressLine2', () => {
      it('should return second line of address', () => {
        expect(getAddressLine2({ address: { line2: 'line2' } })).toEqual('line2');
      });
    });
    describe('getTownCity', () => {
      it('should return town or city of address', () => {
        expect(getTownCity({ address: { townCity: 'townCity' } })).toEqual('townCity');
      });
    });
    describe('getPostcode', () => {
      it('should return postcode', () => {
        expect(getPostcode({ address: { postcode: 'M3 4LZ' } })).toEqual('M3 4LZ');
      });
    });
    describe('getAddressLine1Error', () => {
      it('should return first line of address errors', () => {
        expect(getAddressLine1Error({ addressErrors: { line1: 'error' } })).toEqual('error');
      });
    });
    describe('getTownCityError', () => {
      it('should return town or city of address errors', () => {
        expect(getTownCityError({ addressErrors: { townCity: 'error' } })).toEqual('error');
      });
    });
    describe('getPostcodeError', () => {
      it('should return postcode errors', () => {
        expect(getPostcodeError({ addressErrors: { postcode: 'error' } })).toEqual('error');
      });
    });
    describe('getAddress', () => {
      it('should return the whole address', () => {
        const state = {
          address: {
            line1: 'line1',
            line2: 'line2',
            townCity: 'town',
            postcode: 'M34LZ',
          },
        };
        expect(getAddress(state)).toEqual(state.address);
      });
    });
    describe('getAddressErrors', () => {
      it('should return all address errors', () => {
        const state = {
          addressErrors: {
            line1: 'error1',
            townCity: 'error2',
            postcode: 'error3',
          },
        };
        expect(getAddressErrors(state)).toEqual(state.addressErrors);
      });
    });
  });
  describe('Reducers', () => {
    describe('address', () => {
      it('should be initially empty', () => {
        const state = reducer(undefined, { type: 'no' });
        expect(getAddress(state)).toEqual({});
      });
      it('should be set on SET_ADDRESS', () => {
        const action = { type: SET_ADDRESS, line1: 'line1', line2: 'line2', townCity: 'townCity', postcode: 'postcode' };
        const state = reducer(undefined, action);
        expect(getAddressLine1(state)).toEqual('line1');
        expect(getAddressLine2(state)).toEqual('line2');
        expect(getTownCity(state)).toEqual('townCity');
        expect(getPostcode(state)).toEqual('postcode');
      });
    });
    describe('address errors', () => {
      it('should be initially empty', () => {
        const state = reducer(undefined, { type: 'no' });
        expect(getAddressErrors(state)).toEqual({});
      });
      it('should be set with error messages on SET_ADDRESS when address is invalid', () => {
        const action = { type: SET_ADDRESS, line1: '', line2: '', townCity: '', postcode: '' };
        const state = reducer(undefined, action);
        expect(getAddressErrors(state)).toEqual({
          line1: 'First line of address is required',
          line2: undefined,
          townCity: 'Town / City is required',
          postcode: 'Postcode is invalid',
        });
      });
      it('should set errors to null on SET_ADDRESS when address is valid', () => {
        const state = [
          { type: SET_ADDRESS, line1: 'line1', line2: 'line2', townCity: 'townCity', postcode: '' },
          { type: SET_ADDRESS, line1: 'line1', line2: 'line2', townCity: 'townCity', postcode: 'M3 4LZ' },
        ].reduce(reducer, undefined);
        expect(getAddressErrors(state).postcode).toBeNull();
      });
    });
  });
});
