import * as ActionTypes from '../constants/actionTypes';

const initialState = {
  games: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.OPEN_LEADERBOARD:
      return initialState;

    case ActionTypes.LEADERBOARD_LOADED:
      return {
        ...state,
        games: payload
      };

    default:
      return state;
  }
};
