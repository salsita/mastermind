import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CipherSelector from './CipherSelector';
import Rating from './Rating';
import SelectedCipher from './SelectedCipher';
import LoadingSpinner from './LoadingSpinner';

import './GameView.css';

export default class GameView extends Component {

  static propTypes = {
    game: PropTypes.shape({
      guesses: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        guess: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
      })).isRequired,
      ratings: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        rating: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
      })).isRequired,
      found: PropTypes.bool.isRequired,
      over: PropTypes.bool.isRequired,
      turn: PropTypes.number.isRequired
    }),
    aiTurn: PropTypes.bool.isRequired,
    lastGuess: PropTypes.arrayOf(PropTypes.number.isRequired),
    onWillMount: PropTypes.func.isRequired,
    onWillUnmount: PropTypes.func.isRequired,
    onCipherSelected: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  componentWillUnmount() {
    this.props.onWillUnmount();
  }

  render() {
    const {
      game,
      aiTurn,
      lastGuess,
      onCipherSelected
    } = this.props;

    if (game) {
      const {
        guesses,
        ratings,
        turn,
        found,
        over
      } = game;

      if (over) {
        if (found) {
          return (
            <div className="gameOver">
              <h2>:) You did it!</h2>
              <p>Congratulations, you have managed to guess the cipher in {turn} turns.</p>
              <Link to="/">Go to Main menu</Link>
            </div>
          );
        } else {
          return (
            <div className="gameOver">
              <h2>:&amp;( Game over</h2>
              <p>You didn&amp;t manage to guess the cipher.</p>
              <Link to="/">Go to Main menu</Link>
            </div>
          );
        }
      } else if (aiTurn) {
        return <LoadingSpinner loading />;
      } else {
        return (
          <div>
            <h2 className="turn">Turn #{turn + 1}</h2>
            <CipherSelector
              cipher={lastGuess}
              onCipherSelected={onCipherSelected}
            />
            <div className="board">
              <div className="board__guesses">
                <h3>Guesses</h3>
                {guesses.map(({ id, guess }) => <SelectedCipher key={id} cipher={guess} />)}
              </div>
              <div className="board__ratings">
                <h3>Ratings</h3>
                {ratings.map(({ id, rating }) => <Rating key={id} rating={rating} />)}
              </div>
            </div>
          </div>
        );
      }
    } else {
      return false;
    }
  }
}

