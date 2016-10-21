import { connect } from 'react-redux';

import GameView from '../components/GameView';
import buildActionCreators from '../helpers/buildActionCreators';
import * as ActionTypes from '../constants/actionTypes';
import * as GameSelectors from '../selectors/gameSelectors';

const mapStateToProps = appState => ({
  game: GameSelectors.getGame(appState),
  aiTurn: GameSelectors.isAITurn(appState),
  lastGuess: GameSelectors.getLastGuess(appState),
});

export default connect(
  mapStateToProps,
  buildActionCreators({
    onWillMount: ActionTypes.START_GAME,
    onWillUnmount: ActionTypes.LEAVE_GAME,
    onCipherSelected: ActionTypes.PLAYER_GUESS
  })
)(GameView);
