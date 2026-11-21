import styled, { css } from 'styled-components';
import sparkle from './assets/sparkle-transparent-shine.gif';

const pink = '#ff00a1';

export const H1 = styled.h1`
  text-align: center;
  letter-spacing: .5em;
  color: white;
  background-color: ${pink};
  padding: 5vh;
  margin-bottom: 5vh;
  background-image: url(${sparkle});
  background-size: 135px;
`;

export const IntroP = styled.p`
  text-align: center;
  margin-bottom: 5vh;
`;

export const ErrorMessage = styled.p`
  box-sizing: border-box;
  max-width: 600px;
  margin: -2vh auto 3vh;
  padding: .75rem 1rem;
  text-align: center;
  color: #8a0020;
  background-color: #ffe3e8;
  border: 1px solid #d6002f;
  border-radius: 6px;
`;

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 3rem;
  padding: 0 16px;

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

/*/ left column: the upload box, then the meme once an image is chosen /*/

export const Stage = styled.div`
  box-sizing: border-box;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 375px;
  max-width: 100%;
  height: 400px;
  outline: ${props => props.$dragging ? `3px dashed ${pink}` : 'none'};
  outline-offset: 4px;

  img {
    display: block;
    max-width: 100%;
    max-height: 400px;
  }
`;

export const DropBox = styled.label`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 2px solid ${pink};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  text-align: center;
  color: #666;
  cursor: pointer;
  background-color: ${props => props.$dragging ? 'rgba(255, 0, 161, .08)' : 'transparent'};
`;

export const UploadPill = styled.span`
  font-weight: bold;
  color: white;
  background-color: ${pink};
  padding: .6rem 1.2rem;
  border-radius: 999px;
`;

// Text color, font and size are set on this element, and the captions inherit them.
export const MemeDiv = styled.div`
  position: relative;
  text-align: center;
  width: fit-content;
  max-width: 100%;
  overflow: hidden;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  letter-spacing: .06em;
`;

export const Caption = styled.div`
  position: absolute;
  overflow: auto;
  ${props => props.$bottom ? 'bottom: 0;' : 'top: 0;'}
  left: 0;
  right: 0;
  padding: 5px;
`;

/*/ right column: the controls /*/

export const Controls = styled.div`
  flex: 1 1 auto;
  width: 100%;
  max-width: 420px;
  text-align: left;
`;

export const Fields = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

// One look for every form box: text inputs, the color picker and the dropdowns.
const formBox = css`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  height: 2.5rem;
  padding: 0 .6rem;
  font-size: 1rem;
  color: #222;
  background-color: white;
  border: 1px solid #767676;
  border-radius: 2px;
`;

export const Input = styled.input`
  ${formBox}

  &[type='color'] {
    padding: 3px;
    cursor: pointer;
  }

  &[type='color']::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &[type='color']::-webkit-color-swatch {
    border: none;
    border-radius: 1px;
  }

  &[type='color']::-moz-color-swatch {
    border: none;
    border-radius: 1px;
  }
`;

// The browser draws a select's arrow itself and won't let it be moved, so we
// draw our own chevron and place it 10px from the right edge.
const chevron = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\' viewBox=\'0 0 10 6\'%3E%3Cpath d=\'M1 1l4 4 4-4\' fill=\'none\' stroke=\'%23333\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")';

export const Select = styled.select`
  ${formBox}
  padding-right: 2rem;
  appearance: none;
  background-image: ${chevron};
  background-repeat: no-repeat;
  background-position: right 5px center;
`;

export const HiddenFileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;

  &:focus-visible + * {
    outline: 3px solid ${pink};
    outline-offset: 2px;
  }
`;

export const ChangeImage = styled.label`
  display: inline-block;
  margin-bottom: 1.5rem;
  color: ${pink};
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Button = styled.button`
  flex: 1;
  font-weight: bold;
  padding: .7rem 1rem;
  border-radius: 6px;
  border: 2px solid ${pink};
  cursor: pointer;
  color: ${props => props.$primary ? 'white' : pink};
  background-color: ${props => props.$primary ? pink : 'transparent'};

  &:disabled {
    opacity: .4;
    cursor: not-allowed;
  }
`;

export const InfoFooter = styled.footer`
  text-align: center;
  font-size: .5em;
  margin: 5vh;
`;
