import React from 'react';
import PropTypes from 'prop-types';
import { InputContainer, Label, Input } from '../styling/styles';

export default function TextSelector({ topText, bottomText, textColor, handleChange }) {
  return (
    <InputContainer>
      <Label htmlFor="topText">Top text:</Label>
      <Input name="topText" type="text" value={topText} onChange={handleChange}/>
      <Label htmlFor="bottomText">Bottom text:</Label>
      <Input name="bottomText" type="text" value={bottomText} onChange={handleChange}/>
      <Label htmlFor="textColor">Text color:</Label>
      <Input name="textColor" type="color" value={textColor} onChange={handleChange}/>
      {/* <select>
        <option value={}/>
      </select> */}
    </InputContainer>
  );
}

TextSelector.propTypes = {
  topText: PropTypes.string.isRequired,
  bottomText: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
