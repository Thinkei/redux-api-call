import { constant } from 'lodash';
import makeFetchAction from '../makeFetchAction';

describe('makeFetchAction', () => {
  describe('no custom selectors', () => {
    let actual;
    beforeAll(() => {
      actual = makeFetchAction(
        'SAMPLE',
        constant({ endpoint: 'http://example.com' })
      );
    });

    it('should return actionCreator function', () => {
      expect(actual.actionCreator).toBeInstanceOf(Function);
    });

    it('should return isFetchingSelector function', () => {
      expect(actual.isFetchingSelector).toBeInstanceOf(Function);
    });

    it('should return dataSelector function', () => {
      expect(actual.dataSelector).toBeInstanceOf(Function);
    });

    it('should return errorSelector function', () => {
      expect(actual.errorSelector).toBeInstanceOf(Function);
    });

    it('should return lastResponseSelector function', () => {
      expect(actual.lastResponseSelector).toBeInstanceOf(Function);
    });

    it('should return isInvalidatedSelector function', () => {
      expect(actual.isInvalidatedSelector).toBeInstanceOf(Function);
    });

    describe('resetter', () => {
      it('should return array of all field if no param', () => {
        const resetter = actual.resetter;
        const actualValue = resetter();
        const expectedValue = {
          type: '@@api/RESET_LOCAL',
          payload: {
            name: 'SAMPLE',
            data: [
              'lastRequest',
              'isFetching',
              'isInvalidated',
              'lastResponse',
              'data',
              'error',
            ],
          },
        }
        expect(actualValue).toEqual(expectedValue);
      });

      it('should return array of 1 string if param is string', () => {
        const resetter = actual.resetter;
        const actualValue = resetter('lastResponse');
        const expectedValue = {
          type: '@@api/RESET_LOCAL',
          payload: {
            name: 'SAMPLE',
            data: [
              'lastResponse',
            ],
          },
        }
        expect(actualValue).toEqual(expectedValue);
      });

      it('should throw if resetter is called with non-string or non-array value', () => {
        const resetter = actual.resetter;
        expect(
          () => resetter(1)
        ).toThrow();
      });

      it('should return array of multiple fields if param is array', () => {
        const resetter = actual.resetter;
        const actualValue = resetter(['lastResponse', 'error']);
        const expectedValue = {
          type: '@@api/RESET_LOCAL',
          payload: {
            name: 'SAMPLE',
            data: [
              'lastResponse',
              'error',
            ],
          },
        }
        expect(actualValue).toEqual(expectedValue);
      });

    });

    describe('selectors', () => {
      describe('isFetchingSelector', () => {
        it('should return isFetching in state if present', () => {
          expect(actual.isFetchingSelector({
            api_calls: {
              SAMPLE: {
                isFetching: true
              }
            }
          })).toBe(true);

          expect(actual.isFetchingSelector({
            api_calls: {
              SAMPLE: {
                isFetching: false
              }
            }
          })).toBe(false);
        });

        it('should return false if api was not called', () => {
          expect(actual.isFetchingSelector({})).toBe(false);
        });
      });

      describe('isInvalidatedSelector', () => {
        it('should return isInvalidated in state if present', () => {
          expect(actual.isInvalidatedSelector({
            api_calls: {
              SAMPLE: {
                isInvalidated: true
              }
            }
          })).toBe(true);

          expect(actual.isInvalidatedSelector({
            api_calls: {
              SAMPLE: {
                isInvalidated: false
              }
            }
          })).toBe(false);
        });

        it('should return false if api was not called', () => {
          expect(actual.isInvalidatedSelector({})).toBe(false);
        });
      });

      describe('dataSelector', () => {
        it('should return data in state if present', () => {
          const data = { key: 'value' };
          expect(actual.dataSelector({
            api_calls: {
              SAMPLE: {
                data
              }
            }
          })).toBe(data);
        });

        it('should return null if api was not called', () => {
          expect(actual.dataSelector({})).toBe(null);
        });
      });

      describe('errorSelector', () => {
        it('should return error in state if present', () => {
          const error = { error: 'value' };
          expect(actual.errorSelector({
            api_calls: {
              SAMPLE: {
                error
              }
            }
          })).toBe(error);
        });

        it('should return null if api was not called', () => {
          expect(actual.errorSelector({})).toBe(null);
        });
      });

      describe('lastResponseSelector', () => {
        it('should return lastResponse in state if present', () => {
          const lastResponse = 12345;
          expect(actual.lastResponseSelector({
            api_calls: {
              SAMPLE: {
                lastResponse: 12345
              }
            }
          })).toBe(lastResponse);
        });

        it('should return null if api was not called', () => {
          expect(actual.lastResponseSelector({})).toBe(null);
        });
      });

    });
  });
});
