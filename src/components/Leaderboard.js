import moment from 'moment';
import React, { Component, PropTypes } from 'react';

import './Leaderboard.css';

export default class Leaderboard extends Component {

  static propTypes = {
    games: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        user: PropTypes.shape({
          email: PropTypes.string.isRequired,
          photo: PropTypes.string.isRequired
        }).isRequired,
        turn: PropTypes.number.isRequired,
        created: PropTypes.instanceOf(moment).isRequired
      })
    ).isRequired,
    onMount: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { games } = this.props;

    if (games.length) {
      return (
        <div className="Leaderboard">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th className="left">User</th>
                <th># of turns</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {games.map(({ id, user, turn, created }, index) => (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td className="left">{user.email}</td>
                  <td>{turn}</td>
                  <td>{created.format('MM-DD-YYYY hh:mm')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <div className="Leaderboard Leaderboard__noGames"><div>No games have been played yet</div></div>;
    }
  }
}
