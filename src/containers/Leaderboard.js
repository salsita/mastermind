import { connect } from 'react-redux';

import Leaderboard from '../components/Leaderboard';
import buildActionCreators from '../helpers/buildActionCreators';
import * as ActionTypes from '../constants/actionTypes';
import * as LeaderboardSelectors from '../selectors/leaderboardSelectors';

const mapStateToProps = appState => ({
  games: LeaderboardSelectors.getGames(appState)
});

export default connect(
  mapStateToProps,
  buildActionCreators({
    onMount: ActionTypes.OPEN_LEADERBOARD
  })
)(Leaderboard);
