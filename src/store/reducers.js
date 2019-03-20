import { combineReducers } from 'redux';
import resultReducer from './result';
import inputReducer from './input';

export const makeRootReducer = asyncReducers => {
  return combineReducers({
    calc: resultReducer,
    input: inputReducer,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
