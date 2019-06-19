import { handler } from './actions';
import { combine } from '../../client/routes/conditional';

jest.mock('../../client/routes/conditional');

const makeRoute = ({ action, isValid } = {}) => ({
  action,
  component: { isValid },
});

describe('Express action route handler', () => {
  it('should return when isAllowed is a function', () => {
    const route = {
      action: () => ['a'],
      isAllowed: jest.fn(),
    };
    const next = jest.fn();
    const req = {};
    handler(route)(req, {}, next);
    expect(route.isAllowed).toHaveBeenCalled();
  });
  it('should combine conditions when isAllowed is array', () => {
    const combineMock = jest.fn();
    combineMock.mockImplementation(() => true);
    combine.mockReturnValue(combineMock);
    const route = {
      action: () => ['a'],
      isAllowed: [
        () => true,
        () => true,
      ],
    };
    const next = jest.fn();
    const req = {};
    expect(() => handler(route)(req, {}, next)).not.toThrow();
    expect(combine).toBeCalledWith(...route.isAllowed);
    expect(combineMock).toHaveBeenCalled();
  });
});

describe('Legacy Express action route handler', () => {
  describe('action creator not defined', () => {
    it('should call next and set no actions when there are no actions', () => {
      const route = makeRoute();
      const next = jest.fn();
      const req = {};
      handler(route)(req, {}, next);
      expect(next).toHaveBeenCalledWith();
      expect(req).toEqual({});
    });
  });
  describe('route not allowed', () => {
    it('should call next and set no actions', () => {
      const route = makeRoute({ action: () => ['a'], isValid: () => false });
      const next = jest.fn();
      const req = {};
      handler(route)(req, {}, next);
      expect(next).toHaveBeenCalledWith();
      expect(req).toEqual({});
    });
  });

  describe('null action', () => {
    it('should call next and set no actions', () => {
      const route = makeRoute({ action: () => null, isValid: () => true });
      const next = jest.fn();
      const req = {};
      handler(route)(req, {}, next);
      expect(next).toHaveBeenCalledWith();
      expect(req).toEqual({});
    });
  });
  describe('single action', () => {
    it('should call next and set an array on actions', () => {
      const route = makeRoute({ action: () => 'do', isValid: () => true });
      const next = jest.fn();
      const req = {};
      handler(route)(req, {}, next);
      expect(next).toHaveBeenCalledWith();
      expect(req).toEqual({ actions: ['do'] });
    });
  });
  describe('array of actions', () => {
    it('should call next and set an array on actions', () => {
      const route = makeRoute({ action: () => ['do', 'it'], isValid: () => true });
      const next = jest.fn();
      const req = {};
      handler(route)(req, {}, next);
      expect(next).toHaveBeenCalledWith();
      expect(req).toEqual({ actions: ['do', 'it'] });
    });
  });
  it('should call isValid with the current state', () => {
    const isValid = jest.fn();
    const route = makeRoute({ action: () => 'a', isValid });
    const req = { state: 'the state' };
    handler(route)(req, {}, () => { });
    expect(isValid).toHaveBeenCalledWith('the state');
  });
  it('should call the action creator with the request', () => {
    const action = jest.fn();
    const route = makeRoute({ action, isValid: () => true });
    const req = { fact: 'venice', lie: 'italy' };
    handler(route)(req, {}, () => { });
    expect(action).toHaveBeenCalledWith(req);
  });
});
