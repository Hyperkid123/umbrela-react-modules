import React from 'react';
import {Flex} from '../../../common/styledComponents/containers';
import {ImageThumbNail} from '../../../common/components/imageThumbNail';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LazyLoad from 'react-lazyload';

const StimulPreview = ({images}) => (
  <Flex column>
    <h2>Náhled</h2>
    <div>
      {images.map((image, i) => (
        <LazyLoad key={image.name + i}>
          <ImageThumbNail src={image.preview} alt={image.name}/>
        </LazyLoad>
      ))}
    </div>
  </Flex>
)

export default StimulPreview;
