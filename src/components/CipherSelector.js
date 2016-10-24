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
      activeSelector: null,
      cipher: props.cipher || [0, 0, 0, 0]
    };

    this.boundOnCommit = this.onCommit.bind(this);
  }

  onCommit() {
    this.props.onCipherSelected(this.state.cipher);
  }

  changeColour(index, value) {
    this.setState({
      cipher: this.state.cipher.map((originalValue, indexOfValue) => {
        if (indexOfValue === index) {
          return value;
        } else {
          return originalValue;
        }
      })
    });
  }

  changeActiveSelector(index) {
    this.setState({
      activeSelector: this.state.activeSelector === index ? null : index
    });
  }

  render() {
    return (
      <div className="CipherSelector">
        <ul>
          {this.state.cipher.map((value, index) => (
            <li
              key={index}
              className={this.state.activeSelector === index ? 'selected' : ''}
              style={{ backgroundColor: COLORS[value] }}
              onClick={() => this.changeActiveSelector(index)}
            >{index === this.state.activeSelector && (
            <ul>
              {COLORS.map((backgroundColor, colorIndex) => (
                <li
                  key={colorIndex}
                  style={{ backgroundColor }}
                  onClick={() => this.changeColour(index, colorIndex)}
                />
              ))}
            </ul>
            )}
            </li>
          ))}
        </ul>
        <button onClick={this.boundOnCommit}>OK</button>
      </div>
    );
  }
}
