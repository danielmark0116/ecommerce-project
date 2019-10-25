import React, { Fragment } from 'react';
import { Container } from 'reactstrap';
import { Route } from 'react-router-dom';

import Carousel from '../features/Carousel/CarouselContainer';
import Navbar from '../features/Navbar/Navbar';
import Footer from '../features/Footer/Footer';
import SizedBox from '../common/SizedBox/SizedBox';

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
      <Navbar paths={paths} />
      <Route exact path="/">
        <Carousel></Carousel>
      </Route>
      <SizedBox></SizedBox>
      <Container>{children}</Container>
      <div style={{ padding: 20 }}></div>
      <Footer paths={paths} />
    </Fragment>
  );
};

export default PageLayout;
