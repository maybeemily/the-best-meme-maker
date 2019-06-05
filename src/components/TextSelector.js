import React from 'react';
import PropTypes from 'prop-types';

export default function TextSelector({ topText, bottomText, handleChange }) {
  return (
    <>
    <label htmlFor="topText">Top text:</label>
    <input name="topText" type="text" value={topText} onChange={handleChange}/>

    <label htmlFor="bottomText">Bottom text:</label>
    <input name="bottomText" type="text" value={bottomText} onChange={handleChange}/>

    </>
  );
}

TextSelector.propTypes = {
  topText: PropTypes.string.isRequired,
  bottomText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
