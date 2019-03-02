import { combineReducers } from 'redux';
import cityReducer from './city';
import resultReducer from './result';

export const makeRootReducer = asyncReducers => {
  return combineReducers({
    cityIdx: cityReducer,
    calc: resultReducer,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
