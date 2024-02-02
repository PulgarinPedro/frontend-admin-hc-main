import React from 'react';
import { Carousel } from 'antd';
import './Carousel.css';
const AntCarousel: React.FC = () => {
  return (
    <Carousel autoplay className="custom-carousel">
      <div>
        <img
          style={{ width: '100%', height: '160px', objectFit: 'cover' }}
          src="https://www.xtrafondos.com/wallpapers/resized/casas-junto-a-lago-y-montanas-11238.jpg?s=large"
          alt="Image One"
        />
      </div>
      <div>
        <img
          style={{ width: '100%', height: '160px', objectFit: 'cover' }}
          src="https://www.xtrafondos.com/wallpapers/resized/cabanas-en-el-bosque-durante-el-invierno-10778.jpg?s=large"
          alt="Image Two"
        />
      </div>
      <div>
        <img
          style={{ width: '100%', height: '160px', objectFit: 'cover' }}
          src="https://www.xtrafondos.com/wallpapers/resized/muelle-en-la-playa-10702.jpg?s=large"
          alt="Image Three"
        />
      </div>
      <div>
        <img
          style={{ width: '100%', height: '160px', objectFit: 'cover' }}
          src="https://www.xtrafondos.com/wallpapers/resized/templo-kinkakuji-pabellon-dorado-10612.jpg?s=large"
          alt="Image Four"
        />
      </div>
    </Carousel>
  );
};

export default AntCarousel;
