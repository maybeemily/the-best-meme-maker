import styled from 'styled-components';

/*/styles for Header.js/*/

export const H1 = styled.h1`
  text-align: center;
  letter-spacing: .5em;
  color: white;
  background-color: #ff00a1;
  padding: 5vh;
  margin-bottom: 5vh;
  background-image: url('./src/sparkle-transparent-shine.gif');
  background-repeat: repeat;
  background-size: 135px;
`;

/*/styles for Display.js/*/

export const IntroP = styled.p`
  text-align: center;
  margin-bottom: 5vh;;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;

  img {
    max-width: 400px;
  }
`;

export const MemeSpan = styled.span`
    font-family: ${props => props.font || 'sans-serif' };
    color: ${props => props.textColor || 'white' };
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    font-size: ${props => props.fontSize || '3em' };
    letter-spacing: .06em;
`;

export const MemeDiv = styled.div`
  position: relative;
  text-align: center;
  width: 400px;
  min-height: 100px;
  background-color: white;
  overflow: hidden;

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

export const Select = styled.select`
  font-family: 'Noto Sans HK', sans-serif;
  margin-bottom: 2rem;
  margin-right: 1rem;
  margin-left: .5rem;
`;

/*/styles for Footer.js/*/

export const InfoFooter = styled.footer`
  font-family: 'Noto Sans HK', sans-serif;
  text-align: center;
  font-size: .5em;
  margin: 5vh;
`;
