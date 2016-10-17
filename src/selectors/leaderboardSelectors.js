import { createSelector } from 'reselect';

import { getLeaderboard as getState } from './rootSelectors';
import * as EntityRepositorySelectors from './entityRepositorySelectors';

export const getGames = createSelector(
  getState,
  EntityRepositorySelectors.getGames,
  (state, gamesRepository) =>
    state.games.map(gameId => gamesRepository.find(({ id }) => id === gameId))
);
