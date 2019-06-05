import React from 'react';
import PropTypes from 'prop-types';

export default function ImageSelector({ image, handleChange }) {
  return (
    <>
    <label htmlFor="image">Image URL:</label>
    <input name="image" type="text" value={image} onChange={handleChange}/>
    </>
  );
}

ImageSelector.propTypes = {
  image: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
