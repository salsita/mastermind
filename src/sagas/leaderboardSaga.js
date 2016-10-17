import { call, put } from 'redux-saga/effects';

import Backend from '../backend';
import buildAction from '../helpers/buildAction';
import * as EntityRepositorySaga from './entityRepositorySaga';
import * as LoadingSpinnerSaga from './loadingSpinnerSaga';
import * as ActionTypes from '../constants/actionTypes';
import * as Entities from '../constants/entities';

const LIMIT_BEST_GAMES = 20;

function* fetchBestGames() {
  // Get list of best games
  const games = yield call(Backend.getBestGames, LIMIT_BEST_GAMES);
  // Normalize them
  const result = yield call(EntityRepositorySaga.normalizeAndStore, games, Entities.GAME, true);
  // Store the references
  yield put(buildAction(ActionTypes.LEADERBOARD_LOADED, result));
}

export function* onOpenLeaderboard() {
  // Just call the subsaga
  // It will wrap the Saga transaction with loading spinner
  yield call(LoadingSpinnerSaga.withSpinner, fetchBestGames);
}
