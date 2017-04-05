import get from './utils/get';
import {
  CALL_API,
  REDUCER_PATH,
  ACTION_UPDATE_LOCAL,
  ACTION_RESET_LOCAL,
} from './constants';

const normalizeResetData = data => {
  const defaultData = [
    'lastRequest',
    'isFetching',
    'isInvalidated',
    'lastResponse',
    'data',
    'error',
  ];
  if (data === undefined) {
    return defaultData;
  }
  if (typeof data === 'string') {
    return [data];
  }
  return data;
}

export default (apiName, apiConfigFn, selectorDescriptor = {}) => {
  const actionCreator = (...params) => ({
    [CALL_API]: {
      ...apiConfigFn(...params),
      name: apiName,
    },
  });

  const updater = data => ({
    type: ACTION_UPDATE_LOCAL,
    payload: {
      name: apiName,
      data,
    },
  });

  const resetter = data => ({
    type: ACTION_RESET_LOCAL,
    payload: {
      name: apiName,
      data: normalizeResetData(data)
    },
  });

  const isFetchingSelector = get([REDUCER_PATH, apiName, 'isFetching'], false);
  const isInvalidatedSelector = get([REDUCER_PATH, apiName, 'isInvalidated'], false);
  const dataSelector = get([REDUCER_PATH, apiName, 'data'], null);
  const errorSelector = get([REDUCER_PATH, apiName, 'error'], null);
  const lastResponseSelector = get([REDUCER_PATH, apiName, 'lastResponse'], null);

  return {
    actionCreator,
    updater,
    isFetchingSelector,
    isInvalidatedSelector,
    dataSelector,
    errorSelector,
    lastResponseSelector,
    resetter,
  };
};
