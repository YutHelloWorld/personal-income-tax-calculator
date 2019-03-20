import { INSURANCE } from '../constant';
/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
const WRITE_INPUT = 'WRITE_INPUT';
const SWITCH_CITY = 'SWITCH_CITY';

/**
|--------------------------------------------------
| Actions
|--------------------------------------------------
*/
export const writeInput = payload => ({
  type: WRITE_INPUT,
  payload
});

const switchCity = city => ({
  type: SWITCH_CITY,
  payload: city
});

export const switchCityWithCb = city => {
  return (dispatch, getState) => {
    dispatch(switchCity(city));
    localStorage.setItem('cityIdx', city);
  };
};

/**
|--------------------------------------------------
| Action Handlers
|--------------------------------------------------
*/
const ACTION_HANDLERS = {
  [WRITE_INPUT]: (state, action) => ({ ...state, ...action.payload }),
  [SWITCH_CITY]: (state, action) => ({ ...state, cityIdx: action.payload })
};

/**
|--------------------------------------------------
| Reducer
|--------------------------------------------------
*/
const cityIdx = +localStorage.getItem('cityIdx') || 0;
const initialState = {
  monthIncome: '',
  insurance: '',
  IBase: '',
  HACBase: '',
  additional: '',
  checkProvident: true,
  HACRate: INSURANCE[cityIdx].HACRates[0],
  cityIdx
};

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
