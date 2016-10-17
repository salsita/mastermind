import { map } from 'lodash';
import moment from 'moment';
import { createSelector } from 'reselect';

import * as Entities from '../constants/entities';
import { getEntityRepository as getState } from './rootSelectors';

export const getUsers = createSelector(
  getState,
  state => state[Entities.USER]
);

export const getGuesses = createSelector(
  getState,
  state => state[Entities.GUESS]
);

export const getRatings = createSelector(
  getState,
  state => state[Entities.RATING]
);

export const getGames = createSelector(
  getState,
  getUsers,
  getGuesses,
  getRatings,
  (state, users, guesses, ratings) => map(state[Entities.GAME], game => ({
    ...game,
    user: users[game.user],
    created: moment(game.created),
    guesses: game.guesses.map(guessId => guesses[guessId]),
    ratings: game.ratings.map(ratingId => ratings[ratingId])
  }))
);
