import { merge } from 'lodash';

import * as Actions from '../constants/actionTypes';
import * as Entities from '../constants/entities';

const initialState = {
  [Entities.USER]: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case Actions.ENTITY_REPOSITORY_HAS_CHANGED:
      return merge({}, state, payload);

    default:
      return state;
  }
};
