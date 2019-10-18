import React from 'react';
import Navbar from '../features/Navbar/Navbar';
import Footer from '../features/Footer/Footer';
import { Container } from 'reactstrap';
import { Route } from 'react-router-dom';

const paths = [
  { path: '/', title: 'home' },
  { path: '/products', title: 'products' },
  { path: '/cart', title: 'cart' },
  { path: '/login', title: 'login' }
];

interface IProps {
  children: React.ReactChild;
}

const PageLayout = (props: IProps) => {
  const { children } = props;

  return (
    <div>
      <Navbar paths={paths} />
      <Route exact path="/">
        <h3 style={{ textAlign: 'center', paddingTop: 100 }}>CAROUSEL</h3>
      </Route>
      <div style={{ padding: 60 }}></div>
      <Container>{children}</Container>
      <div style={{ padding: 40 }}></div>
      <Footer paths={paths} />
    </div>
  );
};

export default PageLayout;
