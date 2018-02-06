import React from 'react';
import {ThumbNail} from '../styledComponents/containers';

export const ImageThumbNail = ({src, alt}) => (
  <div style={{margin: 5, display: 'inline-block'}}>
    <ThumbNail src={src} alt={alt}/>
  </div>
)
