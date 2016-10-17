import * as ActionTypes from '../constants/actionTypes';

const initialState = {
  counter: 0,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        counter: state.counter + 1
      };

    case ActionTypes.RESET_LOADING: {
      const counter = Math.max(state.counter - 1, 0);

      return {
        ...state,
        counter
      };
    }

    default:
      return state;
  }
};
