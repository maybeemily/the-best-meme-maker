import styled from 'styled-components';

/*/styles for Display.js/*/

export const IntroP = styled.p`
  text-align: center;
  font-family: 'Noto Sans HK', sans-serif;
  margin-bottom: 1rem;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  
  span {
    font-size: 3em;
    text-transform: uppercase;
    font-family: sans-serif;
    color: white;
    font-weight: 900;
  }

  img {
    max-width: 400px;
  }
`;

export const MemeDiv = styled.div`
  position: relative;
  text-align: center;
  width: 400px;
`;

export const TopText = styled.div`
  position: absolute;
  overflow: auto;
  top: 0;
  left: 0;
  right: 0;
  padding: 5px;
`;

export const BottomText = styled.div`
  position: absolute;
  overflow: auto;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 5px;
`;

/*/styles for TextSelector.js and ImageSelector.js/*/

export const Label = styled.label`
  font-family: 'Noto Sans HK', sans-serif;
`;

export const InputContainer = styled.div`
  text-align: center;
`;

export const Input = styled.input`
  font-family: 'Noto Sans HK', sans-serif;
  margin-bottom: 2rem;
  margin-right: 1rem;
  margin-left: .5rem;
`;
