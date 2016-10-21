import { connect } from 'react-redux';

import GameView from '../components/GameView';
import buildActionCreators from '../helpers/buildActionCreators';
import * as ActionTypes from '../constants/actionTypes';

const mapStateToProps = (appState) => ({
  game: null,
  aiTurn: false,
  lastGuess: null
});

export default connect(
  mapStateToProps,
  buildActionCreators({
    onWillMount: ActionTypes.START_GAME,
    onWillUnmount: ActionTypes.LEAVE_GAME,
    onCipherSelected: ActionTypes.PLAYER_GUESS
  })
)(GameView);
