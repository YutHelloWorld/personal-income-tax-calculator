/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
const SWITCH_CITY = 'SWITCH_CITY';

/**
|--------------------------------------------------
| Actions
|--------------------------------------------------
*/
export const switchCity = city => ({
  type: SWITCH_CITY,
  payload: city
});

/**
|--------------------------------------------------
| Action Handlers
|--------------------------------------------------
*/

const ACTION_HANDLERS = {
  [SWITCH_CITY]: (state, action) => action.payload
};

/**
|--------------------------------------------------
| Reducer
|--------------------------------------------------
*/
const initialState = 0;

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
