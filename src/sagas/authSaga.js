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
  // Display a loading spinner on application bootstrap
  // because we need to asynchronously retrieve an infromation (through channel)
  // whether user has been joined in
  yield put(buildAction(ActionTypes.SET_LOADING));

  // Create a channel which informs Saga when user logs in or out
  const authStateChangesChannel = yield call(Backend.createAuthStateChangesChannel);

  let bootstrapped = false;

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

    // The app is bootstrapped when first event comes through auth channel
    // and it doesn't matter whether user is or is not logged in
    if (!bootstrapped) {
      yield put(buildAction(ActionTypes.RESET_LOADING));
      bootstrapped = true;
    }
  }
}
