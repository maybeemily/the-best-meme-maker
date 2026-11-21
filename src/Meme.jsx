import { useRef, useState } from 'react';
import domtoimage from 'dom-to-image';
import TextSelector from './TextSelector';
import { IMAGE_TYPES, IMAGE_TYPES_LABEL, exportSize, memedName } from './image';
import {
  IntroP, ErrorMessage, Layout, Stage, DropBox, UploadPill, MemeDiv, Caption,
  Controls, HiddenFileInput, ChangeImage, Buttons, Button
} from './styles';

const defaultFields = {
  topText: '',
  bottomText: '',
  textColor: '#ff00a1',
  font: 'sans-serif',
  fontSize: '3em'
};

export default function Meme() {
  const [fields, setFields] = useState(defaultFields);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const memeRef = useRef();

  const handleChange = ({ target }) => {
    setFields(current => ({ ...current, [target.name]: target.value }));
  };

  const loadImage = file => {
    if(!file) return;
    if(!IMAGE_TYPES.includes(file.type)) {
      setError(`"${file.name}" isn't a supported image. Please choose a ${IMAGE_TYPES_LABEL} file.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto({ src: reader.result, name: file.name });
      setError('');
    };
    reader.onerror = () => {
      setError(`Sorry, "${file.name}" couldn't be read. Please try another image.`);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = ({ target }) => {
    loadImage(target.files[0]);
    target.value = '';
  };

  const handleDrop = event => {
    event.preventDefault();
    setDragging(false);
    loadImage(event.dataTransfer.files[0]);
  };

  const saveMeme = () => {
    const node = memeRef.current;
    const { naturalWidth, naturalHeight } = node.querySelector('img');
    const size = exportSize(naturalWidth, naturalHeight);
    const width = size.width || node.offsetWidth;
    const height = size.height || node.offsetHeight;
    domtoimage.toBlob(node, {
      width,
      height,
      style: { transform: `scale(${width / node.offsetWidth}, ${height / node.offsetHeight})`, transformOrigin: 'top left' }
    }).then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = memedName(photo.name);
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }).catch(() => {
      setError('Sorry, your meme couldn\'t be saved. Try a smaller image.');
    });
  };

  const startOver = () => {
    setFields(defaultFields);
    setPhoto(null);
    setError('');
  };

  const { topText, bottomText, textColor, font, fontSize } = fields;

  return (
    <>
      <IntroP>Make your own meme, advice animal, picture with text... whatever you want to call it.<br/>
        Upload a photo from your computer, type the words you want, and save!</IntroP>
      {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
      <Layout>
        <Stage
          $dragging={dragging}
          onDragOver={event => { event.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          {photo ? (
            <MemeDiv ref={memeRef} style={{ color: textColor, fontFamily: font, fontSize }}>
              <Caption>{topText}</Caption>
              <img src={photo.src} alt="Your meme"/>
              <Caption $bottom>{bottomText}</Caption>
            </MemeDiv>
          ) : (
            <DropBox htmlFor="image" $dragging={dragging}>
              <span>Drag an image here, or click anywhere in this box</span>
              <UploadPill>Upload image</UploadPill>
            </DropBox>
          )}
        </Stage>
        <Controls>
          <HiddenFileInput id="image" name="image" type="file" accept={IMAGE_TYPES.join(',')} onChange={handleFileInput}/>
          {photo && <ChangeImage htmlFor="image">Change image</ChangeImage>}
          <TextSelector fields={fields} onChange={handleChange}/>
          <Buttons>
            <Button $primary onClick={saveMeme} disabled={!photo}>Save Meme to Computer</Button>
            <Button onClick={startOver}>Start Over</Button>
          </Buttons>
        </Controls>
      </Layout>
    </>
  );
}
