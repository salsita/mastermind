import React, { PropTypes } from 'react';

const COLORS = [
  'transparent',
  'gray',
  'black'
];

const Rating = ({ rating }) => (
  <ul>
    {rating.map((value, index) => (
      <li
        key={index}
        style={{
          cursor: 'pointer',
          backgroundColor: COLORS[value]
        }}
      />
    ))}
  </ul>
);

Rating.propTypes = {
  rating: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
};

export default Rating;
