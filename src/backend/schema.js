import { Schema } from 'normalizr';

import * as Entities from '../constants/entities';

const UserSchema = new Schema(Entities.USER);

export default {
  [Entities.USER]: UserSchema
};
