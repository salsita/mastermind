import { call, put } from 'redux-saga/effects';

import buildAction from '../helpers/buildAction';
import * as ActionTypes from '../constants/actionTypes';

// Wraps the Saga call in
// try/catch block which ensures that
// even when Saga fails, the spinner will
// be reset
export function* withSpinner(saga) {
  // Display spinner before start of the transaction
  yield put(buildAction(ActionTypes.SET_LOADING));

  try {
    yield call(saga);
  } finally {
    // We put the reset loading in finally block
    // to make sure loading spinner will not hang
    yield put(buildAction(ActionTypes.RESET_LOADING));
  }
}
