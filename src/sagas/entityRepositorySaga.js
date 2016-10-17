import { put } from 'redux-saga/effects';
import { normalize, arrayOf } from 'normalizr';

import Schema from '../backend/schema';
import buildAction from '../helpers/buildAction';
import * as ActionTypes from '../constants/actionTypes';

export function* normalizeAndStore(data, entity, isArray = false) {
  // We just call normalizr with provided input & entity schema
  const schema = Schema[entity];
  const { entities, result } = normalize(data, isArray ? arrayOf(schema) : schema);

  // The only action which needs to be dispatched is information that
  // entity repository has changed
  yield put(buildAction(ActionTypes.ENTITY_REPOSITORY_HAS_CHANGED, entities));

  // Just return either an entity ID or list of IDs
  return result;
}
