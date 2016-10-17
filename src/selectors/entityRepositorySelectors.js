import { createSelector } from 'reselect';

import * as Entities from '../constants/entities';
import { getEntityRepository as getState } from './rootSelectors';

export const getUsers = createSelector(
  getState,
  state => state[Entities.USER]
);
