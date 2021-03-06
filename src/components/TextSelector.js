import React from 'react';
import PropTypes from 'prop-types';
import { InputContainer, Label, Input, Select } from '../styling/styles';

export default function TextSelector({ topText, bottomText, textColor, font, fontSize, handleChange }) {
  return (
    <InputContainer>
      <Label htmlFor="topText">Top text:</Label>
      <Input name="topText" type="text" value={topText} onChange={handleChange}/>
      <Label htmlFor="bottomText">Bottom text:</Label>
      <Input name="bottomText" type="text" value={bottomText} onChange={handleChange}/>
      <br/>
      <Label htmlFor="textColor">Text color:</Label>
      <Input name="textColor" type="color" value={textColor} onChange={handleChange}/>
      <Label htmlFor="font">Font:</Label>
      <Select name="font" value={font} onChange={handleChange}>
        <option value="Impact">*select one*</option>
        <option value="Open Sans">Sans Serif</option>
        <option value="Martel">Serif</option>
        <option value="Berkshire Swash">Fancy</option>
        <option value="Source Code Pro">Monospace</option>
      </Select>
      <Label htmlFor="fontSize">Text Size:</Label>
      <Select name="fontSize" value={fontSize} onChange={handleChange}>
        <option value="3em">*select one*</option>
        <option value="1em">small</option>
        <option value="3em">medium</option>
        <option value="6em">big</option>
        <option value="9em">too big</option>
      </Select>
    </InputContainer>
  );
}

TextSelector.propTypes = {
  topText: PropTypes.string.isRequired,
  bottomText: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  font: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
