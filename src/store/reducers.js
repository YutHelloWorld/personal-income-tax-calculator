import { combineReducers } from 'redux';
import cityReducer from './city';

export const makeRootReducer = asyncReducers => {
  return combineReducers({
    cityIdx: cityReducer,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
