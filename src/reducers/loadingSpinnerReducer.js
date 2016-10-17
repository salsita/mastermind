import * as ActionTypes from '../constants/actionTypes';

const initialState = {
  loading: false,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: true
      };

    case ActionTypes.RESET_LOADING: {
      return {
        ...state,
        loading: false
      };
    }

    default:
      return state;
  }
};
