import React, { Fragment, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from 'reactstrap';

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

  const Links = (props: IProps) => (
    <ul>
      {props.paths.map((path, index) => {
        return (
          <li key={index}>
            <NavLink
              exact
              to={path.path}
              activeClassName={style.navbar_link_active}
              onClick={toggleMobileMenu}
            >
              {path.title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );

  const toggleMobileMenu = async () => {
    const pageBody = document.querySelector('body');
    toggleMenu(!showMenu);

    if (pageBody) {
      !showMenu
        ? (pageBody.style.overflowY = 'hidden')
        : (pageBody.style.overflowY = 'scroll');
    }
  };

  return (
    <Fragment>
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
