import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from 'reactstrap';

import style from '../../styles/main.module.scss';

interface IProps {
  paths: {
    path: string;
    title: string;
  }[];
}

const Links = (props: IProps) => (
  <ul>
    {props.paths.map((path, index) => (
      <li key={index}>
        <NavLink
          exact
          to={path.path}
          activeClassName={style.navbar_link_active}
        >
          {path.title}
        </NavLink>
      </li>
    ))}
  </ul>
);

const Navbar = (props: IProps) => {
  const { paths } = props;

  return (
    <nav className={style.navbar}>
      <Container>
        <div className={style.navbar_container}>
          <div className={style.navbar_brand}>ecommerce</div>
          <div className={style.navbar_btn}></div>
          <div className={style.navbar_menu}>
            <div className={style.navbar_menu_mobile}>
              <Links paths={paths} />
            </div>
            <div className={style.navbar_menu_desktop}>
              <Links paths={paths} />
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
