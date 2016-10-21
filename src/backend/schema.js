import { Schema, arrayOf } from 'normalizr';

import * as Entities from '../constants/entities';

const GameSchema = new Schema(Entities.GAME);
const UserSchema = new Schema(Entities.USER);
const GuessSchema = new Schema(Entities.GUESS);
const RatingSchema = new Schema(Entities.RATING);

GameSchema.define({
  user: UserSchema,
  guesses: arrayOf(GuessSchema),
  ratings: arrayOf(RatingSchema)
});

export default {
  [Entities.USER]: UserSchema,
  [Entities.GAME]: GameSchema,
  [Entities.GUESS]: GuessSchema,
  [Entities.RATING]: RatingSchema
};
