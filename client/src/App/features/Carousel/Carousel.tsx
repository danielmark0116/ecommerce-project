import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import Title from '../../common/Title/Title';
import Subtitle from '../../common/Subtitle/Subtitle';
import Subtext from '../../common/Subtext/Subtext';
import Text from '../../common/Text/Text';
import Image from '../../common/Image/Image';
import Button from '../../common/Button/Button';

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
      <div
        onClick={() => carouselSlide > 0 && carouselClick(-1)}
        className={style.carousel_btn_prev}
      >
        <span></span>
        <span></span>
      </div>
      <div
        onClick={() => carouselSlide < 1 && carouselClick(1)}
        className={style.carousel_btn_next}
      >
        <span></span>
        <span></span>
      </div>
      <div ref={carouselRef} className={style.custom_carousel_box}>
        <div className={style.custom_carousel_item}>
          <img
            src="https://image.freepik.com/darmowe-zdjecie/elegancki-mezczyzna-pozuje-na-prostym-tle_23-2148323694.jpg"
            className={style.custom_carousel_item_bg}
            alt=""
          />
          <Container>
            <Row>
              <Col sm="12" xl="6">
                {/* <Subtext size="small">ecommerce selection</Subtext> */}
                <Title size="large">SEASON'S BESTS</Title>

                <Text>Check out this seasons bests!</Text>
                <Text>All the products have a special, new price!</Text>

                <Link to="/products">
                  <Button type="primary">Shop now!</Button>
                </Link>
              </Col>
              <Col sm="12" xl="6">
                <div className={style.carousel_mobile_image}>
                  {/* <Image
                    size="medium"
                    picString={
                      'https://s3.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/W/P/WP544-99X-001.jpg'
                    }
                  /> */}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className={style.custom_carousel_item}>
          <img
            src="https://image.freepik.com/darmowe-zdjecie/wzorcowy-pojecie-z-copyspace-i-dziewczyna-jest-ubranym-okulary-przeciwslonecznych_23-2147811501.jpg"
            className={style.custom_carousel_item_bg}
            alt=""
          />
          <Container>
            <Row>
              <Col sm="12" xl="6">
                {/* <Subtext size="small">ecommerce selection</Subtext> */}
                <Title size="large">SEASON'S BESTS</Title>

                <Text>Check out this seasons bests!</Text>
                <Text>All the products have a special, new price!</Text>

                <Link to="/products">
                  <Button type="primary">Shop now!</Button>
                </Link>
              </Col>
              <Col sm="12" xl="6">
                <div className={style.carousel_mobile_image}>
                  {/* <Image
                    size="medium"
                    picString={
                      'https://images.unsplash.com/photo-1557991666-3dc7eae97614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80'
                    }
                  /> */}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
