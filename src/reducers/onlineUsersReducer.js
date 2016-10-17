import * as Actions from '../constants/actionTypes';

const initialState = {
  users: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case Actions.USER_HAS_JOINED:
      return {
        ...state,
        users: [...state.users, payload]
      };

    case Actions.USER_HAS_DISCONNECTED:
      return {
        ...state,
        users: state.users.filter(user => user !== payload)
      };

    default:
      return state;
  }
};
