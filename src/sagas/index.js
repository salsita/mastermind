import { takeEvery } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import * as ActionTypes from '../constants/actionTypes';
import * as OnlineUsersSaga from './onlineUsersSaga';
import * as AuthSaga from './authSaga';
import * as GameSaga from './gameSaga';
import * as LeaderboardSaga from './leaderboardSaga';

export default function* () {
  yield [
    fork(takeEvery, ActionTypes.BOOTSTRAP, AuthSaga.onBootstrap),
    fork(takeEvery, ActionTypes.BOOTSTRAP, OnlineUsersSaga.onBootstrap),
    fork(takeEvery, ActionTypes.START_GAME, GameSaga.onStartGame),
    fork(takeEvery, ActionTypes.OPEN_LEADERBOARD, LeaderboardSaga.onOpenLeaderboard),
    fork(takeEvery, ActionTypes.LOGIN, AuthSaga.onLogin),
    fork(takeEvery, ActionTypes.LOGOUT, AuthSaga.onLogout)
  ];
}
