import React from 'react';
import { Container } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import Logo from '../../assets/dg_logo.png';

import style from '../../styles/main.module.scss';

interface IProps {
  paths: {
    path: string;
    title: string;
  }[];
}

const Footer = (props: IProps) => {
  const { paths } = props;

  return (
    <div className={style.footer}>
      <Container>
        <div className={style.footer_container}>
          <div className={style.rights}>ECOMMERCE | All right reservered</div>
          <div className={style.links}>
            <ul>
              {paths.map((path, index) => (
                <li key={index}>
                  <NavLink
                    exact
                    to={path.path}
                    activeClassName={style.active_footer_link}
                  >
                    {path.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <a href="https://danielgrychtol.com" target="_blank">
          <div className={style.footer_credits}>
            Coded by <img src={Logo} alt="" />{' '}
          </div>
        </a>
      </Container>
    </div>
  );
};

export default Footer;
