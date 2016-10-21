import { call } from 'redux-saga/effects';

import Backend from '../backend';
import * as ConfirmationModalSaga from './confirmationModalSaga';

export function* onStartGame() {
  const gameInProgress = yield call(Backend.isGameInProgress);

  if (gameInProgress) {
    // Ask user what they want to do:
    // Start new game or Continue with the old one
    const shouldStartNewGame = yield call(
      ConfirmationModalSaga.showConfirmation,
      'There\'s currently an active game in progress, do you want to start a new game?',
      'Start New Game',
      'Continue playing'
    );

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
