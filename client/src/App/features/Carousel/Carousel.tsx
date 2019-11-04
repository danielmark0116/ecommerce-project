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
                      'https://images.pexels.com/photos/2146756/pexels-photo-2146756.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
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
                      'https://images.pexels.com/photos/2146756/pexels-photo-2146756.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
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
                      'https://images.pexels.com/photos/1879671/pexels-photo-1879671.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
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
                      'https://images.pexels.com/photos/1879671/pexels-photo-1879671.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
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
