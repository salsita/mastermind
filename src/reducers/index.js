import { combineReducers } from 'redux';

import authReducer from './authReducer';
import confirmationModalReducer from './confirmationModalReducer';
import entityRepositoryReducer from './entityRepositoryReducer';
import gameReducer from './gameReducer';
import onlineUsersReducer from './onlineUsersReducer';
import leaderboardReducer from './leaderboardReducer';
import loadingSpinnerReducer from './loadingSpinnerReducer';

export default combineReducers({
  auth: authReducer,
  confirmationModal: confirmationModalReducer,
  entityRepository: entityRepositoryReducer,
  game: gameReducer,
  onlineUsers: onlineUsersReducer,
  leaderboard: leaderboardReducer,
  loadingSpinner: loadingSpinnerReducer
});
