import React, { Component, PropTypes } from 'react';

import './CipherSelector.css';
import COLORS from '../constants/colors';

export default class CipherSelector extends Component {

  static propTypes = {
    cipher: PropTypes.arrayOf(PropTypes.number.isRequired),
    onCipherSelected: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      cipher: props.cipher || [0, 0, 0, 0]
    };

    this.boundOnCommit = this.onCommit.bind(this);
  }

  onCommit() {
    this.props.onCipherSelected(this.state.cipher);
  }

  changeColour(index) {
    this.setState({
      cipher: this.state.cipher.map((value, indexOfValue) => {
        if (indexOfValue === index) {
          return (value + 1) % COLORS.length;
        } else {
          return value;
        }
      })
    });
  }

  render() {
    return (
      <div className="CipherSelector">
        <ul>
          {this.state.cipher.map((value, index) => (
            <li
              onClick={() => this.changeColour(index)}
              key={index}
              style={{ backgroundColor: COLORS[value] }}
            />
          ))}
        </ul>
        <button onClick={this.boundOnCommit}>OK</button>
      </div>
    );
  }
}
