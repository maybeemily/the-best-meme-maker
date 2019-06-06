import React from 'react';
import PropTypes from 'prop-types';

export default function ImageSelector({ handleImage }) {
  return (
    <>
    <label htmlFor="image">Image URL:</label>
    <input name="image" type="file" onChange={handleImage}/>
    </>
  );
}

ImageSelector.propTypes = {
  handleImage: PropTypes.func.isRequired
};
