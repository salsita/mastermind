import { call, take, put } from 'redux-saga/effects';

import buildAction from '../helpers/buildAction';
import * as ActionTypes from '../constants/actionTypes';
import * as Entities from '../constants/entities';
import Backend from '../backend';

import * as EntityRepositorySaga from './entityRepositorySaga';

// Just display a login Dialog when user clicks Login
export function* onLogin() {
  yield call(Backend.login);
}

// Just logout a user and remove them from app state
export function* onLogout() {
  yield put(buildAction(ActionTypes.USER_HAS_LOGGED_OUT));
  yield call(Backend.logout);
}

export function* onBootstrap() {
  // Create a channel which informs Saga when user logs in or out
  const authStateChangesChannel = yield call(Backend.createAuthStateChangesChannel);

  while (true) {
    const user = yield take(authStateChangesChannel);

    // Channel returns a user when they log in
    if (user) {
      // Just propagate this information on the Backend (authentication part is client side only)
      yield call(Backend.joinUser, user);

      // Normalize the user
      yield call(EntityRepositorySaga.normalizeAndStore, user, Entities.USER);

      // And store the reference to the user
      yield put(buildAction(ActionTypes.USER_HAS_LOGGED_IN, user.id));
    }
  }
}
