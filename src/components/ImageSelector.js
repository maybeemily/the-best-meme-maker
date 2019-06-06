import React from 'react';
import PropTypes from 'prop-types';
import { InputContainer, Label, Input } from '../styling/styles';

export default function ImageSelector({ handleImage }) {
  return (
    <InputContainer>
      <Label htmlFor="image">Image URL:</Label>
      <Input name="image" type="file" onChange={handleImage}/>
    </InputContainer>
  );
}

ImageSelector.propTypes = {
  handleImage: PropTypes.func.isRequired
};
