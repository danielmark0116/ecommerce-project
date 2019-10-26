import React, { Fragment } from 'react';
import { Container } from 'reactstrap';
import { Route } from 'react-router-dom';

import Carousel from '../features/Carousel/CarouselContainer';
import Navbar from '../features/Navbar/Navbar';
import Footer from '../features/Footer/Footer';
import NewsBar from '../features/NewsBar/NewsBar';

import style from '../styles/main.module.scss';

const paths = [
  { path: '/', title: 'home' },
  { path: '/products', title: 'products' },
  { path: '/cart', title: 'cart' }
];

interface IProps {
  children: React.ReactChild;
}

const PageLayout = (props: IProps) => {
  const { children } = props;

  return (
    <Fragment>
      <NewsBar></NewsBar>
      <Navbar paths={paths} />
      <Route exact path="/">
        <Carousel></Carousel>
        {/* <SizedBox></SizedBox> */}
      </Route>
      <div className={style.page_wrapper}>
        <Container>{children}</Container>
      </div>

      <Footer paths={paths} />
    </Fragment>
  );
};

export default PageLayout;
