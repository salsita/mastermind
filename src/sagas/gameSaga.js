import { call, take, put, cancel, fork, select } from 'redux-saga/effects';

import Backend from '../backend';
import buildAction from '../helpers/buildAction';
import * as ConfirmationModalSaga from './confirmationModalSaga';
import * as EntityRepositorySaga from './entityRepositorySaga';
import * as ActionTypes from '../constants/actionTypes';
import * as Entities from '../constants/entities';
import * as GameSelectors from '../selectors/gameSelectors';

function* onStartGame() {
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

  // Let's get game Entity from server
  const activeGame = yield call(Backend.getActiveGame);
  // Then just normalize it
  const gameId = yield call(EntityRepositorySaga.normalizeAndStore, activeGame, Entities.GAME);

  // We are done with Async stuff, spinner can be reset
  yield put(buildAction(ActionTypes.RESET_LOADING));

  // We provide the gameId to reducer so that we have a reference to active game
  yield put(buildAction(ActionTypes.RESUME_GAME, gameId));

  // The main game loop which is active as long as game has not over yet
  // Backend sets `over` flag in the Game entity when the game is over.
  while (!(yield select(GameSelectors.getGame)).over) {
    // Wait for user to take a guess
    const playerGuessAction = yield take(ActionTypes.PLAYER_GUESS);
    const guess = playerGuessAction.payload;

    // Start turn -> display spinner for AI turn in the UI
    yield put(buildAction(ActionTypes.START_TURN));
    // Send the guess to the server and wait for response
    yield call(Backend.playerGuess, guess);

    // After backend responded to playerGuess, we have all the information in the
    // game entity already so we just need to re-fetch it.
    // We need to call `getGame` instead of `getActiveGame` because the game may
    // potentially be inactive in case of game over.
    const game = yield call(Backend.getGame, gameId);

    // Well now just store the info in the app state
    yield call(EntityRepositorySaga.normalizeAndStore, game, Entities.GAME);

    // And finish the turn (hide spinner)
    yield put(buildAction(ActionTypes.FINISH_TURN));
  }
}

export function* onBootstrap() {
  // Obviously starting a game needs to be treated separately (not using takeEvery)
  // because we want to terminate the process when user leaves the game.
  // Because either they just left the game or the game is over.
  while (true) {
    yield take(ActionTypes.START_GAME);
    const startGameProcess = yield fork(onStartGame);
    yield take(ActionTypes.LEAVE_GAME);
    yield cancel(startGameProcess);
  }
}
