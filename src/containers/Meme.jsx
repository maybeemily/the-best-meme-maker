import { createRef, PureComponent } from 'react';
import Display from '../components/Display';
import TextSelector from '../components/TextSelector';
import ImageSelector from '../components/ImageSelector';
import domtoimage from 'dom-to-image';
import exportSize from '../exportSize';
import { IntroP, Layout, Stage, DropBox, UploadPill, Controls, Buttons, Button } from '../styling/styles';

const initialState = {
  topText: '',
  bottomText: '',
  image: '',
  fileName: '',
  textColor: '#ffffff',
  fontSize: '3em',
  font: 'sans-serif',
  dragging: false
};

// "cat.photo.jpg" -> "memed-cat.photo.png" (the export is always a PNG)
const memedName = fileName => `memed-${fileName.replace(/\.[^.]*$/, '')}.png`;

export default class Meme extends PureComponent {
  state = { ...initialState };

  memeRef = createRef();

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  loadImage = file => {
    if(!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = event => {
      this.setState({ image: event.target.result, fileName: file.name });
    };
    reader.readAsDataURL(file);
  };

  handleImage = ({ target }) => {
    this.loadImage(target.files[0]);
    target.value = '';
  };

  handleDragOver = event => {
    event.preventDefault();
    if(!this.state.dragging) this.setState({ dragging: true });
  };

  handleDragLeave = () => {
    this.setState({ dragging: false });
  };

  handleDrop = event => {
    event.preventDefault();
    this.setState({ dragging: false });
    this.loadImage(event.dataTransfer.files[0]);
  };

  saveMeme = event => {
    event.preventDefault();
    const { fileName } = this.state;
    const node = this.memeRef.current;
    const img = node.querySelector('img');
    const { width, height } = exportSize(img.naturalWidth, img.naturalHeight)
      || { width: node.offsetWidth, height: node.offsetHeight };
    // Render the meme scaled up (text included) so the file matches the original image size.
    domtoimage.toPng(node, {
      width,
      height,
      style: { transform: `scale(${width / node.offsetWidth}, ${height / node.offsetHeight})`, transformOrigin: 'top left' }
    })
      .then(img => {
        const link = document.createElement('a');
        link.href = img;
        link.download = memedName(fileName);
        link.click();
      });
  };

  startOver = event => {
    event.preventDefault();
    this.setState({ ...initialState });
  };

  render() {
    const { topText, bottomText, textColor, image, font, fontSize, dragging } = this.state;
    return (
      <>
        <IntroP>Make your own meme, advice animal, picture with text... whatever you want to call it.<br/>
          Upload a photo from your computer, type the words you want, and save!</IntroP>
        <Layout>
          <Stage
            $dragging={dragging}
            onDragOver={this.handleDragOver}
            onDragLeave={this.handleDragLeave}
            onDrop={this.handleDrop}
          >
            {image ? (
              <Display topText={topText} bottomText={bottomText} image={image} font={font} fontSize={fontSize} textColor={textColor} memeComplete={this.memeRef}/>
            ) : (
              <DropBox htmlFor="image" $dragging={dragging}>
                <span>Drag an image here, or click anywhere in this box</span>
                <UploadPill>Upload image</UploadPill>
              </DropBox>
            )}
          </Stage>
          <Controls>
            <ImageSelector hasImage={!!image} handleImage={this.handleImage}/>
            <TextSelector topText={topText} bottomText={bottomText} textColor={textColor} fontSize={fontSize} font={font} handleChange={this.handleChange}/>
            <Buttons>
              <Button $primary onClick={this.saveMeme} disabled={!image}>Save Meme to Computer</Button>
              <Button onClick={this.startOver}>Start Over</Button>
            </Buttons>
          </Controls>
        </Layout>
      </>
    );
  }
}
