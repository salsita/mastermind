import { createSelector } from 'reselect';
import { head, sortBy } from 'lodash';

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


export const getLastGuess = createSelector(
  getGame,
  (game) => {
    if (game && game.guesses.length > 0) {
      const { guesses } = game;

      return head(sortBy(guesses, guess => guess.turn).reverse()).guess;
    } else {
      return null;
    }
  }
);

