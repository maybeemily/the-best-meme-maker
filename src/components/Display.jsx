import PropTypes from 'prop-types';
import { MemeDiv, TopText, BottomText, MemeSpan } from '../styling/styles';

export default function Display({ topText, image, bottomText, textColor, font, fontSize, memeComplete }) {
  return (
    <MemeDiv ref={memeComplete}>
      <TopText>
        <MemeSpan $textColor={textColor} $fontSize={fontSize} $font={font}>{topText}</MemeSpan>
      </TopText>
      <img src={image} alt="Your meme"/>
      <BottomText>
        <MemeSpan $textColor={textColor} $fontSize={fontSize} $font={font}>{bottomText}</MemeSpan>
      </BottomText>
    </MemeDiv>
  );
}

Display.propTypes = {
  topText: PropTypes.string.isRequired,
  bottomText: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  font: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  memeComplete: PropTypes.object.isRequired
};
