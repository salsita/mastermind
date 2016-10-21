import { createSelector } from 'reselect';

import { getAuth as getState } from './rootSelectors';

export const getLoggedUser = createSelector(
  getState,
  rootState => rootState.user
);

export const isUserLoggedIn = createSelector(
  getLoggedUser,
  loggedUser => loggedUser !== null
);
