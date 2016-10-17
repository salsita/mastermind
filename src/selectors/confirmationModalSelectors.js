import { createSelector } from 'reselect';

import { getConfirmationModal as getState } from './rootSelectors';

export const isDisplayed = createSelector(
  getState,
  state => state.displayed
);

export const getMessage = createSelector(
  getState,
  state => state.message
);

export const getConfirmMessage = createSelector(
  getState,
  state => state.confirmMessage
);

export const getCancelMessage = createSelector(
  getState,
  state => state.cancelMessage
);
