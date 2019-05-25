import update from 'immutability-helper-x';
import { INSURANCE } from '../constant';
/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
const WRITE_MONTH_INPUT = 'WRITE_MONTH_INPUT';
const SELECT_MONTH = 'SELECT_MONTH';
const NEXT_MONTH = 'NEXT_MONTH';
const COPY = 'COPY';

/**
|--------------------------------------------------
| Actions
|--------------------------------------------------
*/

export const writeMonthInput = payload => ({
  type: WRITE_MONTH_INPUT,
  payload
});

const selectMonth = payload => ({
  type: SELECT_MONTH,
  payload
});

export const selectMonthWithCb = payload => {
  return dispatch => {
    dispatch(selectMonth(payload));
    localStorage.setItem('month', payload);
  };
};

export const writeMonthInputWithCb = payload => {
  return (dispatch, getState) => {
    dispatch(writeMonthInput(payload));
    localStorage.setItem('data', JSON.stringify(getState().monthInput.data));
  };
};

const nextMonth = () => ({
  type: NEXT_MONTH
});

export const nextMonthWithCb = () => {
  return (dispatch, getState) => {
    dispatch(nextMonth());
    localStorage.setItem('month', getState().monthInput.month);
  };
};
const copy = () => ({
  type: COPY
});

export const copyWithCb = () => {
  return (dispatch, getState) => {
    dispatch(copy());
    localStorage.setItem('data', JSON.stringify(getState().monthInput.data));
  };
};
/**
|--------------------------------------------------
| Action Handlers
|--------------------------------------------------
*/
const ACTION_HANDLERS = {
  [WRITE_MONTH_INPUT]: (state, action) => {
    return update.$merge(state, ['data', state.month], action.payload);
  },
  [SELECT_MONTH]: (state, action) => {
    return update.$set(state, 'month', action.payload);
  },
  [NEXT_MONTH]: state => {
    return update.$set(state, 'month', state.month + 1);
  },
  [COPY]: state => {
    return update.$merge(
      state,
      ['data', state.month],
      state.data[state.month - 1]
    );
  }
};

/**
|--------------------------------------------------
| Reducer
|--------------------------------------------------
*/
const cityIdx = +localStorage.getItem('cityIdx') || 0;
const month = +localStorage.getItem('month') || 0;
const data =
  JSON.parse(localStorage.getItem('data')) ||
  new Array(12).fill({
    monthIncome: '',
    insurance: '',
    IBase: '',
    HACBase: '',
    additional: '',
    checkProvident: true,
    HACRate: INSURANCE[cityIdx].HACRates[0]
  });
const initialState = { month, data };

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
