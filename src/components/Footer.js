import React from 'react';
import { InfoFooter } from '../styling/styles';

export default function Footer() {
  return (
    <InfoFooter>
      the best meme maker is a fullstack app by <a href="https://github.com/maybeemily">emily baier</a> (front end) and <a href="https://github.com/chrislupdx">chris lu</a> (back end).<br/>
      made using react, styled-components, nodejs, mongoose, express, mongodb.
    </InfoFooter>
  );
}
