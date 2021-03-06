import { takeEvery } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import * as ActionTypes from '../constants/actionTypes';
import * as AuthSaga from './authSaga';
import * as GameSaga from './gameSaga';

export default function* () {
  yield [
    fork(takeEvery, ActionTypes.BOOTSTRAP, AuthSaga.onBootstrap),
    fork(takeEvery, ActionTypes.BOOTSTRAP, GameSaga.onBootstrap),
    fork(takeEvery, ActionTypes.LOGIN, AuthSaga.onLogin),
    fork(takeEvery, ActionTypes.LOGOUT, AuthSaga.onLogout)
  ];
}
