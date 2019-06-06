import React from 'react';
import PropTypes from 'prop-types';
import { IntroP, Container, MemeDiv, TopText, BottomText, MemeSpan } from '../styling/styles';
export default function Display({ topText, image, bottomText, textColor, memeComplete }) {
  return (
    <>
    <IntroP>Make your own meme, advice animal, picture with text... whatever you want to call it.<br/> 
      Upload a photo from your computer, type the words you want, and save!<br/> 
      Also, you can add your creation to our gallery!</IntroP>
    <Container>
      <MemeDiv ref={memeComplete}>
        <TopText>
          <MemeSpan textColor={textColor}>{topText}</MemeSpan>
        </TopText>
        <img src={image}/>
        <BottomText>
          <MemeSpan>{bottomText}</MemeSpan>
        </BottomText>
      </MemeDiv>
    </Container>
    </>
  );
}

Display.propTypes = {
  topText: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  bottomText: PropTypes.string.isRequired,
  memeComplete: PropTypes.object.isRequired
};
