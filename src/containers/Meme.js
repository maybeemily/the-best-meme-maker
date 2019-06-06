import React, { PureComponent } from 'react';
import Display from '../components/Display';
import TextSelector from '../components/TextSelector';
import ImageSelector from '../components/ImageSelector';
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';
import { InputContainer } from '../styling/styles';
import { postMeme } from '../services/memeApi';


export default class Meme extends PureComponent {
  state ={ 
    topText: '',
    bottomText: '',
    image: '',
    textColor: '#ffffff',
    font: 'sans-serif'
  }

  memeRef = React.createRef();


  handleChange = ({ target }) => {
    this.setState({ [target.name ] : target.value });
  }

  handleImage = ({ target }) => {
    const reader = new FileReader();
    reader.onload = event => {
      this.setState({ image: event.target.result });
    };
    reader.readAsDataURL(target.files[0]);
  }
  
  
  saveMeme = event => {
    event.preventDefault();
    domtoimage.toPng(this.memeRef.current)
      .then(img => {
        saveAs(img);
      });
  }

  saveMemeToDb = event => {
    event.preventDefault();
    domtoimage.toPng(this.memeRef.current)
      .then(img => {
        postMeme(img);
      });
  }

  render() {
    const { topText, bottomText, textColor, image, font } = this.state;
    return (
      <InputContainer>
        <Display topText={topText} bottomText={bottomText} image={image} font={font} textColor={textColor} memeComplete={this.memeRef} handleChange={this.handleChange}/>
        <ImageSelector handleImage={this.handleImage}/>
        <TextSelector topText={topText} bottomText={bottomText} textColor={textColor} font={font} handleChange={this.handleChange}/>
        <button onClick={this.saveMeme}>Save Meme to Computer</button>
        <button onClick={this.saveMemeToDb}>Save to Meme to Database</button>
      </InputContainer>
    );
  }
}
