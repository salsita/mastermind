import { call, put, select, take } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import Backend from '../backend';
import Schema from '../backend/schema';
import buildAction from '../helpers/buildAction';
import * as ConfirmationModalSaga from './confirmationModalSaga';
import * as ActionTypes from '../constants/actionTypes';
import * as Entities from '../constants/entities';
import * as GameSelectors from '../selectors/gameSelectors';

function* normalizeAndStoreEntity(data, schema) {
  const {
    entities,
    result
  } = normalize(data, schema);

  yield put(buildAction(ActionTypes.ENTITY_REPOSITORY_HAS_CHANGED, entities));

  return result;
}

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

  // Let's get game Entity from server
  const activeGame = yield call(Backend.getActiveGame);
  // Normalize it and get ID of the game
  const gameId = yield call(normalizeAndStoreEntity, activeGame, Schema[Entities.GAME]);

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

    yield call(normalizeAndStoreEntity, game, Schema[Entities.GAME]);

    // And finish the turn (hide spinner)
    yield put(buildAction(ActionTypes.FINISH_TURN));
  }
}
