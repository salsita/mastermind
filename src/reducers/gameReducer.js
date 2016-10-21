import * as ActionTypes from '../constants/actionTypes';

const initialState = {
  gameId: null,
  aiTurn: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LEAVE_GAME:
      return initialState;

    case ActionTypes.RESUME_GAME:
      return {
        ...state,
        gameId: payload
      };

    case ActionTypes.START_TURN:
      return {
        ...state,
        aiTurn: true
      };

    case ActionTypes.FINISH_TURN:
      return {
        ...state,
        aiTurn: false
      };

    default:
      return state;
  }
};
