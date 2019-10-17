import React from 'react';
import { NavLink } from 'react-router-dom';

interface IProps {
  paths: {
    path: string;
    title: string;
  }[];
}

const Navbar = (props: IProps) => {
  const { paths } = props;

  return (
    <nav>
      <ul>
        {paths.map((path, index) => (
          <li key={index}>
            <NavLink exact to={path.path} activeStyle={{ color: 'red' }}>
              {path.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
