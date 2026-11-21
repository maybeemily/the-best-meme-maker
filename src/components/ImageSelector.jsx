import PropTypes from 'prop-types';
import { HiddenFileInput, ChangeImage } from '../styling/styles';

// The real file input is visually hidden but stays keyboard-accessible.
// Labels elsewhere (the empty drop box, the "Change image" link) open it.
export default function ImageSelector({ hasImage, handleImage }) {
  return (
    <>
      <HiddenFileInput id="image" name="image" type="file" accept="image/*" onChange={handleImage}/>
      {hasImage && <ChangeImage htmlFor="image">Change image</ChangeImage>}
    </>
  );
}

ImageSelector.propTypes = {
  hasImage: PropTypes.bool.isRequired,
  handleImage: PropTypes.func.isRequired
};
