import { takeEvery } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import * as ActionTypes from '../constants/actionTypes';
import * as AuthSaga from './authSaga';

export default function* () {
  yield [
    fork(takeEvery, ActionTypes.BOOTSTRAP, AuthSaga.onBootstrap),
    fork(takeEvery, ActionTypes.LOGIN, AuthSaga.onLogin),
    fork(takeEvery, ActionTypes.LOGOUT, AuthSaga.onLogout)
  ];
}
