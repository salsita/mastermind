import { connect } from 'react-redux';

import buildActionCreators from '../helpers/buildActionCreators';
import ConfirmationModal from '../components/ConfirmationModal';
import * as ActionTypes from '../constants/actionTypes';
import * as RootSelectors from '../selectors/rootSelectors';

const mapStateToProps = appState => RootSelectors.getConfirmationModal(appState);

export default connect(
  mapStateToProps,
  buildActionCreators({
    onConfirm: ActionTypes.CONFIRM_MODAL,
    onCancel: ActionTypes.CANCEL_MODAL
  })
)(ConfirmationModal);
