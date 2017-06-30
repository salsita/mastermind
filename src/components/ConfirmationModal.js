import React from 'react';
import PropTypes from 'prop-types';

import './ConfirmationModal.css';

const ConfirmationModal = ({
  displayed,
  message,
  confirmMessage,
  cancelMessage,
  onConfirm,
  onCancel
}) => displayed && (
  <div className="ConfirmationModal">
    <h2>{message}</h2>
    <button onClick={onConfirm}>{confirmMessage}</button>
    <button onClick={onCancel}>{cancelMessage}</button>
  </div>
);

ConfirmationModal.propTypes = {
  displayed: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  confirmMessage: PropTypes.string.isRequired,
  cancelMessage: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ConfirmationModal;
