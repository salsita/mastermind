import { put, take } from 'redux-saga/effects';

import buildAction from '../helpers/buildAction';
import * as ActionTypes from '../constants/actionTypes';

// Saga which opens a modal and waits for user to select an option
// returns true in case of Confirmation and false in case of cancelling.
export function* showConfirmation(message, confirmMessage, cancelMessage) {
  // Let's just show the Confirmation Modal parameterized
  // with Message and confirm & cancel messages
  yield put(buildAction(ActionTypes.SHOW_CONFIRMATION_MODAL, {
    message,
    confirmMessage,
    cancelMessage
  }));

  // Now it's the right time to wait for user to respond
  const { type } = yield take([ActionTypes.CONFIRM_MODAL, ActionTypes.CANCEL_MODAL]);

  // Return either true or false based
  // on user's choice
  switch (type) {
    case ActionTypes.CONFIRM_MODAL:
      return true;

    case ActionTypes.CANCEL_MODAL:
      return false;

    default:
      throw new Error('Invalid state');
  }
}
