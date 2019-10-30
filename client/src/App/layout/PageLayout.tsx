import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';

import Carousel from '../features/Carousel/CarouselContainer';
import Navbar from '../features/Navbar/Navbar';
import Footer from '../features/Footer/Footer';
import NewsBar from '../features/NewsBar/NewsBar';
import UserBar from '../features/UserBar/UserBar';

import style from '../styles/main.module.scss';
import { AppState } from '../reducers';
import { selectorAuthIsLoggedIn } from '../reducers/authReducer';

const paths = [
  { path: '/', title: 'home' },
  { path: '/products', title: 'products' },
  { path: '/cart', title: 'cart' }
];

interface IProps {
  children: React.ReactChild;
}

const PageLayout = (props: IProps & stateToProps) => {
  const { children, isLoggedIn } = props;

  return (
    <Fragment>
      <NewsBar></NewsBar>
      <Navbar paths={paths} />
      {isLoggedIn && <UserBar />}
      <div className={style.page_wrapper}>
        <Switch>
          <Route exact path="/">
            <Carousel></Carousel>
            {children}
          </Route>
          <Route path="*">
            <Container>{children}</Container>
          </Route>
        </Switch>
      </div>

      <Footer paths={paths} />
    </Fragment>
  );
};

interface stateToProps {
  isLoggedIn: Boolean;
}

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: selectorAuthIsLoggedIn(state)
});

export default connect(mapStateToProps)(PageLayout);
