import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import Title from '../../common/Title/Title';
import Subtitle from '../../common/Subtitle/Subtitle';
import Subtext from '../../common/Subtext/Subtext';
import Text from '../../common/Text/Text';
import Image from '../../common/Image/Image';
import Button from '../../common/Button/Button';
import Center from '../../common/Center/Center';

import style from '../../styles/main.module.scss';

import { fadeInDown } from '../../animations/fades';

import { handleCarousel } from '../../animations/carousel';

const Carousel = () => {
  const [carouselSlide, updateSlide] = useState(0);
  // props

  const carouselRef = React.createRef<HTMLDivElement>();
  const carouselContainerRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    fadeInDown(carouselContainerRef.current, 3);
  }, ['']);

  useEffect(() => {
    handleCarousel(carouselRef.current, carouselSlide);
  }, [carouselSlide]);

  const carouselClick = (value: number) => {
    updateSlide(carouselSlide + value);
  };

  return (
    <div ref={carouselContainerRef} className={style.custom_carousel_container}>
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
          <Container>
            <Row>
              <Col sm="12" xl="6">
                <br />
                <br />
                <Title align="center" size="large">
                  SEASON'S BESTS
                </Title>

                <Text align="center">Check out this seasons bests!</Text>
                <Text align="center">
                  All the products have a special, new price!
                </Text>
                <br />

                <div className={style.carousel_mobile_image}>
                  <Image
                    size="small"
                    picString={
                      'https://s3.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/W/P/WP544-99X-001.jpg'
                    }
                  />
                </div>

                <Center>
                  <Link to="/products">
                    <Button type="primary">Shop now!</Button>
                  </Link>
                </Center>
              </Col>
              <Col sm="12" xl="6">
                <div className={style.carousel_desktop_image}>
                  <Image
                    size="medium"
                    picString={
                      'https://s3.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/W/P/WP544-99X-001.jpg'
                    }
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className={style.custom_carousel_item}>
          <Container>
            <Row>
              <Col sm="12" xl="6">
                <br />
                <br />
                <Title align="center" size="large">
                  SEASON'S BESTS
                </Title>

                <Text align="center">Check out this seasons bests!</Text>
                <Text align="center">
                  All the products have a special, new price!
                </Text>
                <br />

                <div className={style.carousel_mobile_image}>
                  <Image
                    size="small"
                    picString={
                      'https://s3.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/W/P/WP544-99X-001.jpg'
                    }
                  />
                </div>

                <Center>
                  <Link to="/products">
                    <Button type="primary">Shop now!</Button>
                  </Link>
                </Center>
              </Col>
              <Col sm="12" xl="6">
                <div className={style.carousel_desktop_image}>
                  <Image
                    size="medium"
                    picString={
                      'https://s3.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/W/P/WP544-99X-001.jpg'
                    }
                  />
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
