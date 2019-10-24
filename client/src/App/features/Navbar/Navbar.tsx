import React, { Fragment, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from 'reactstrap';
import LoginBox from '../LoginBox/LoginBox';

import HamburgerBtn from '../../common/HamburgerBtn/HamburgerBtn';

import { animateLink } from '../../animations/mobile_menu';

import style from '../../styles/main.module.scss';

interface IProps {
  paths: {
    path: string;
    title: string;
  }[];
}

const Navbar = (props: IProps) => {
  const { paths } = props;
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
        <a onClick={openLoginBox}>Login2</a>
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

  useEffect(() => {
    //
  }, [showLoginBox]);

  const openLoginBox = () => {
    toggleLoginBox(true);
  };

  const closeLoginBox = () => {
    toggleLoginBox(false);
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

export default Navbar;
