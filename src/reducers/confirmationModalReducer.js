import * as ActionTypes from '../constants/actionTypes';

const initialState = {
  displayed: false,
  message: '',
  confirmMessage: '',
  cancelMessage: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SHOW_CONFIRMATION_MODAL:
      return {
        ...state,
        displayed: true,
        message: payload.message,
        confirmMessage: payload.confirmMessage,
        cancelMessage: payload.cancelMessage
      };

    case ActionTypes.CONFIRM_MODAL:
    case ActionTypes.CANCEL_MODAL:
      return initialState;

    default:
      return state;
  }
};
