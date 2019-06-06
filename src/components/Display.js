import React from 'react';
import PropTypes from 'prop-types';
import styles from './Display.css';

export default function Display({ topText, image, bottomText, memeComplete }) {
  return (
    <>
    <p className={styles.introP}>Make your own meme, advice animal, picture with text... whatever you want to call it. 
      Paste the URL of the image you&apos;d like to use, type the words you want, and save! 
      You can download your creation, or add it to our gallery.</p>
    <div className={styles.container}>
      <div className={styles.memeDiv} ref={memeComplete}>
        <div className={styles.top}>
          <span>{topText}</span>
        </div>
        <img src={image}/>
        <div className={styles.bottom}>
          <span>{bottomText}</span>
        </div>
      </div>
    </div>
    </>
  );
}

Display.propTypes = {
  topText: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  bottomText: PropTypes.string.isRequired,
  memeComplete: PropTypes.object.isRequired
};
