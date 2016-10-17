import { connect } from 'react-redux';

import buildActionCreators from '../helpers/buildActionCreators';
import ConfirmationModal from '../components/ConfirmationModal';
import * as ActionTypes from '../constants/actionTypes';
import * as ConfirmationModalSelectors from '../selectors/confirmationModalSelectors';

const mapStateToProps = appState => ({
  displayed: ConfirmationModalSelectors.isDisplayed(appState),
  message: ConfirmationModalSelectors.getMessage(appState),
  confirmMessage: ConfirmationModalSelectors.getConfirmMessage(appState),
  cancelMessage: ConfirmationModalSelectors.getCancelMessage(appState)
});

export default connect(
  mapStateToProps,
  buildActionCreators({
    onConfirm: ActionTypes.CONFIRM_MODAL,
    onCancel: ActionTypes.CANCEL_MODAL
  })
)(ConfirmationModal);
