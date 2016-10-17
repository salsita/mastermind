import { call, put } from 'redux-saga/effects';

import Backend from '../backend';
import buildAction from '../helpers/buildAction';
import * as ConfirmationModalSaga from './confirmationModalSaga';
import * as ActionTypes from '../constants/actionTypes';

export function* onStartGame() {
  // We want to display a loading spinner because we need
  // to ask server asynchronously first whether there's
  // any game already
  yield put(buildAction(ActionTypes.SET_LOADING));

  // Ask Backend if any non-finished Game already exists
  const gameInProgress = yield call(Backend.isGameInProgress);

  if (gameInProgress) {
    // We found the game, we can hide the spinner
    yield put(buildAction(ActionTypes.RESET_LOADING));

    // Ask user what they want to do:
    // Start new game or Continue with the old one
    const shouldStartNewGame = yield call(
      ConfirmationModalSaga.showConfirmation,
      'There\'s currently an active game in progress, do you want to start a new game?',
      'Start New Game',
      'Continue playing'
    );

    // After user decides we want to show the spinner again, because
    // there will be some async BE communication
    yield put(buildAction(ActionTypes.SET_LOADING));

    // If user wants to start a new game, we have to delete the active one
    // and immediately after that, we can just a new one.
    if (shouldStartNewGame) {
      yield call(Backend.deleteActiveGame);
      yield call(Backend.startGame);
    }
  } else {
    // If there's no active game, just start one
    yield call(Backend.startGame);
  }
}
