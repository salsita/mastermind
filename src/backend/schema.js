import { schema } from 'normalizr';

import * as Entities from '../constants/entities';

const GameSchema = new schema.Entity(Entities.GAME);
const UserSchema = new schema.Entity(Entities.USER);
const GuessSchema = new schema.Entity(Entities.GUESS);
const RatingSchema = new schema.Entity(Entities.RATING);

GameSchema.define({
  user: UserSchema,
  guesses: [GuessSchema],
  ratings: [RatingSchema]
});

export default {
  [Entities.USER]: UserSchema,
  [Entities.GAME]: GameSchema,
  [Entities.GUESS]: GuessSchema,
  [Entities.RATING]: RatingSchema
};
