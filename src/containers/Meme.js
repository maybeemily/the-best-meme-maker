import React, { PureComponent } from 'react';
import Display from '../components/Display';
import TextSelector from '../components/TextSelector';
import ImageSelector from '../components/ImageSelector';

export default class Meme extends PureComponent {
  state ={ 
    topText: '',
    bottomText: '',
    image: ''
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name ] : target.value });
  }

  render() {
    const { topText, bottomText, image } = this.state;

    return (
      <>
      <Display topText={topText} bottomText={bottomText} image={image} handleChange={this.handleChange}/>
      <ImageSelector image={image} handleChange={this.handleChange}/>
      <TextSelector topText={topText} bottomText={bottomText} handleChange={this.handleChange}/>      </>
    );
  }
}
