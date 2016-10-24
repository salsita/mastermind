import * as Actions from '../constants/actionTypes';

const initialState = {
  user: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case Actions.USER_HAS_LOGGED_IN:
      return {
        ...state,
        user: payload
      };

    case Actions.USER_HAS_LOGGED_OUT:
      return {
        ...state,
        user: null
      };

    default:
      return state;
  }
};
