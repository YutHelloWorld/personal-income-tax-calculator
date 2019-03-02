/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
const COMPUTE = 'COMPUTE';
const SWITCH_TYPE = 'SWITCH_TYPE';

/**
|--------------------------------------------------
| Actions
|--------------------------------------------------
*/
export const compute = payload => ({
  type: COMPUTE,
  payload
});

export const switchType = payload => ({
  type: SWITCH_TYPE,
  payload
});

export const computeWithCb = result => {
  return dispatch => {
    dispatch(compute(result));
    localStorage.setItem('result', JSON.stringify(result));
  };
};

export const switchTypeWithCb = type => {
  return dispatch => {
    dispatch(switchType(type));
    localStorage.setItem('type', type);
  };
};
/**
|--------------------------------------------------
| Action Handlers
|--------------------------------------------------
*/

const ACTION_HANDLERS = {
  [COMPUTE]: (state, action) => ({ ...state, result: action.payload }),
  [SWITCH_TYPE]: (state, action) => ({ ...state, type: action.payload })
};

/**
|--------------------------------------------------
| Reducer
|--------------------------------------------------
*/
const initialState = {
  type: +localStorage.getItem('type') || 1,
  result: JSON.parse(localStorage.getItem('result')) || {
    aMonthTax: []
  }
};

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
