import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container } from 'reactstrap';
import LoginBox from '../LoginBox/LoginBox';

import HamburgerBtn from '../../common/HamburgerBtn/HamburgerBtn';
import ProfileThumb from '../../common/ProfileThumb/ProfileThumb';

import style from '../../styles/main.module.scss';

import { fadeInDown } from '../../animations/fades';

import { AppState } from '../../reducers';
import {
  selectorAuthIsLoggedIn,
  selectorAuthProfilePic
} from '../../reducers/authReducer';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../../actions/actionTypes';
import { authLogOutThunk } from '../../actions/authActions';

interface IProps {
  paths: {
    path: string;
    title: string;
  }[];
}

const Navbar = (props: IProps & stateToProps & dispatchToProps) => {
  const { paths, isLoggedIn, logOutUser, profilePic } = props;
  const mobileMenuRef = React.createRef<HTMLDivElement>();
  const [showMenu, toggleMenu] = useState(false);
  const [showLoginBox, toggleLoginBox] = useState(false);

  const navbarRef = React.createRef<HTMLElement>();

  useEffect(() => {
    fadeInDown(navbarRef.current);
  }, ['']);

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

      {isLoggedIn ? (
        <Fragment>
          <li>
            <NavLink
              exact
              to={'/profile'}
              activeClassName={style.navbar_link_active}
              onClick={closeMobileMenu}
            >
              Profile
              <ProfileThumb picString={profilePic}></ProfileThumb>
            </NavLink>
          </li>

          <li>
            <a
              href="#"
              onClick={() => {
                logOutUser();
                closeMobileMenu();
              }}
            >
              Log out
            </a>
          </li>
        </Fragment>
      ) : (
        <li>
          <a href="#" onClick={openLoginBox}>
            Login
          </a>
        </li>
      )}
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
      <nav ref={navbarRef} className={style.navbar}>
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
            <div className={style.navbar_brand}>
              <span>e</span>commerce
            </div>
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
  profilePic: string;
}

interface dispatchToProps {
  logOutUser: Function;
}

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: selectorAuthIsLoggedIn(state),
  profilePic: selectorAuthProfilePic(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ActionTypes>
) => ({
  logOutUser: () => dispatch(authLogOutThunk())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
