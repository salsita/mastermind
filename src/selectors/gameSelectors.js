import { createSelector } from 'reselect';

import { getGame as getState } from './rootSelectors';
import * as EntityRepositorySelectors from './entityRepositorySelectors';

export const getGame = createSelector(
  getState,
  EntityRepositorySelectors.getGames,
  (state, gameRepository) => gameRepository.find(game => game.id === state.gameId)
);

export const isAITurn = createSelector(
  getState,
  state => state.aiTurn
);

export const getLastGuess = () => null;
