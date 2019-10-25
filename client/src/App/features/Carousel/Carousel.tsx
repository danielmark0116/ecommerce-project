import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

import Title from '../../common/Title/Title';
import Subtitle from '../../common/Subtitle/Subtitle';
import Subtext from '../../common/Subtext/Subtext';
import Image from '../../common/Image/Image';

import style from '../../styles/main.module.scss';

import { handleCarousel } from '../../animations/carousel';

const Carousel = () => {
  const [carouselSlide, updateSlide] = useState(0);
  // props

  const carouselRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    handleCarousel(carouselRef.current, carouselSlide);
  }, [carouselSlide]);

  const carouselClick = (value: number) => {
    updateSlide(carouselSlide + value);
  };

  return (
    <div className={style.custom_carousel_container}>
      <span
        onClick={() => carouselSlide > 0 && carouselClick(-1)}
        className={style.carousel_btn_prev}
      ></span>
      <span
        onClick={() => carouselSlide < 1 && carouselClick(1)}
        className={style.carousel_btn_next}
      ></span>
      <div ref={carouselRef} className={style.custom_carousel_box}>
        <div className={style.custom_carousel_item}>
          <img
            src="https://s1.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/X/A/XA075-34X-002.jpg"
            className={style.custom_carousel_item_bg}
            alt=""
          />
          <Container>
            <Row>
              <Col sm="12">
                <Subtext size="small">ecommerce selection</Subtext>
                <Title size="large">Jacket PREMIUM</Title>
                <Subtext size="small">FEMALE | JACKET</Subtext>

                {/* <div className={style.custom_carousel_item_price}>
                  <span>Price:</span> 34 <span>$</span>
                </div> */}
              </Col>
              <Col sm="12">
                <Image
                  size="medium"
                  picString={
                    'https://s1.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/X/A/XA075-34X-002.jpg'
                  }
                />
              </Col>
            </Row>
          </Container>
        </div>
        <div className={style.custom_carousel_item}>
          <img
            src="https://s1.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/X/A/XA075-34X-002.jpg"
            className={style.custom_carousel_item_bg}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
