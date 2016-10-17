import { createSelector } from 'reselect';

import { getOnlineUsers as getState } from './rootSelectors';
import * as AuthSelectors from './authSelectors';
import * as EntityRepositorySelectors from './entityRepositorySelectors';

export const getOnlineUsers = createSelector(
  getState,
  AuthSelectors.getLoggedUserId,
  EntityRepositorySelectors.getUsers,
  (rootState, loggedUserId, users) => rootState
    .users
    .filter(id => id !== loggedUserId)
    .map(id => users[id])
);
