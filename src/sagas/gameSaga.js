import { call } from 'redux-saga/effects';

import * as ConfirmationModalSaga from './confirmationModalSaga';

export function* onBootstrap() {
  const result = yield call(
    ConfirmationModalSaga.showConfirmation,
    'How are you?',
    'Good',
    'Better'
  );

  console.log(result);
}
