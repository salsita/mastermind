import { createSelector } from 'reselect';

import { getAuth as getState } from './rootSelectors';
import * as EntityRepositorySelectors from './entityRepositorySelectors';

export const getLoggedUserId = createSelector(
  getState,
  rootState => rootState.user
);

export const isUserLoggedIn = createSelector(
  getLoggedUserId,
  loggedUserId => loggedUserId !== null
);

export const getLoggedUser = createSelector(
  getLoggedUserId,
  EntityRepositorySelectors.getUsers,
  (loggedUserId, users) => users[loggedUserId]
);

