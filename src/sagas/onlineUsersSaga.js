import { call, take, put } from 'redux-saga/effects';

import Backend from '../backend';
import buildAction from '../helpers/buildAction';

import * as Entities from '../constants/entities';
import * as ActionTypes from '../constants/actionTypes';
import * as EntityRepositorySaga from './entityRepositorySaga';

export function* onBootstrap() {
  const usersChannel = yield call(Backend.createUsersChannel);

  while (true) {
    // Wait for any user to either log in or disconnect
    const { type, user } = yield take(usersChannel);

    switch (type) {
      case Backend.userChannelEvents.USER_HAS_JOINED: {
        // When user logs in we need to update Entity repository &
        // store their reference into online users list
        const result = yield call(EntityRepositorySaga.normalizeAndStore, user, Entities.USER);
        yield put(buildAction(ActionTypes.USER_HAS_JOINED, result));
        break;
      }

      case Backend.userChannelEvents.USER_HAS_DISCONNECTED:
        // When user logs out, just remove their reference in Entity repository
        yield put(buildAction(ActionTypes.USER_HAS_DISCONNECTED, user.id));
        break;

      default:
        throw new Error(`Invalid state ${type}`);
    }
  }
}
