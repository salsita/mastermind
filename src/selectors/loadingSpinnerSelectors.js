import { createSelector } from 'reselect';

import { getLoadingSpinner as getState } from './rootSelectors';

export const isLoading = createSelector(
  getState,
  state => state.counter > 0
);
