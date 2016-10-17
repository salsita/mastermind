import React, { PropTypes } from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ loading }) => loading && (
  <div className="LoadingSpinner">
    <div className="sk-cube-grid">
      <div className="sk-cube sk-cube1" />
      <div className="sk-cube sk-cube2" />
      <div className="sk-cube sk-cube3" />
      <div className="sk-cube sk-cube4" />
      <div className="sk-cube sk-cube5" />
      <div className="sk-cube sk-cube6" />
      <div className="sk-cube sk-cube7" />
      <div className="sk-cube sk-cube8" />
      <div className="sk-cube sk-cube9" />
    </div>
  </div>
);

LoadingSpinner.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default LoadingSpinner;
