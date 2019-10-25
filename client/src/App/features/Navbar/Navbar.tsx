import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container } from 'reactstrap';
import LoginBox from '../LoginBox/LoginBox';

import HamburgerBtn from '../../common/HamburgerBtn/HamburgerBtn';

import { animateLink } from '../../animations/mobile_menu';

import style from '../../styles/main.module.scss';
import { AppState } from '../../reducers';
import { selectorAuthIsLoggedIn } from '../../reducers/authReducer';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../../actions/actionTypes';
import { authLogout } from '../../actions/authActions';

interface IProps {
  paths: {
    path: string;
    title: string;
  }[];
}

const Navbar = (props: IProps & stateToProps & dispatchToProps) => {
  const { paths, isLoggedIn, logOutUser } = props;
  const mobileMenuRef = React.createRef<HTMLDivElement>();
  const [showMenu, toggleMenu] = useState(false);
  const [showLoginBox, toggleLoginBox] = useState(false);

  const Links = (props: IProps) => (
    <ul>
      {props.paths.map((path, index) => {
        return (
          <li key={index}>
            <NavLink
              exact
              to={path.path}
              activeClassName={style.navbar_link_active}
              onClick={closeMobileMenu}
            >
              {path.title}
            </NavLink>
          </li>
        );
      })}
      <li>
        {isLoggedIn ? (
          <a
            href="#"
            onClick={() => {
              logOutUser();
              closeMobileMenu();
            }}
          >
            Log out
          </a>
        ) : (
          <a href="#" onClick={openLoginBox}>
            Login
          </a>
        )}
      </li>
    </ul>
  );

  useEffect(() => {
    const pageBody = document.querySelector('body');
    if (pageBody) {
      showMenu
        ? (pageBody.style.overflowY = 'hidden')
        : (pageBody.style.overflowY = 'scroll');
    }
  }, [showMenu]);

  const openLoginBox = () => {
    toggleLoginBox(true);
  };

  const closeLoginBox = () => {
    toggleLoginBox(false);
    closeMobileMenu();
  };

  const toggleMobileMenu = () => {
    toggleMenu(!showMenu);
  };

  const closeMobileMenu = () => {
    toggleMenu(false);
  };

  return (
    <Fragment>
      <LoginBox closeAction={closeLoginBox} active={showLoginBox}></LoginBox>
      <nav className={style.navbar}>
        <div
          ref={mobileMenuRef}
          className={`${style.navbar_menu_mobile} ${
            showMenu ? style.navbar_menu_mobile_active : ''
          }`}
        >
          <Links paths={paths} />
        </div>
        <Container>
          <div className={style.navbar_container}>
            <div className={style.navbar_brand}>ecommerce</div>
            <div className={style.navbar_btn}>
              <HamburgerBtn
                onClick={toggleMobileMenu}
                action={showMenu}
              ></HamburgerBtn>
            </div>
            <div className={style.navbar_menu}>
              <div className={style.navbar_menu_desktop}>
                <Links paths={paths} />
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </Fragment>
  );
};

interface stateToProps {
  isLoggedIn: Boolean;
}

interface dispatchToProps {
  logOutUser: Function;
}

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: selectorAuthIsLoggedIn(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ActionTypes>
) => ({
  logOutUser: () => dispatch(authLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
