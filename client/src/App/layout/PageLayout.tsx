import React from 'react';
import Navbar from '../features/Navbar/Navbar';

interface IProps {
  children: React.ReactChild;
}

const PageLayout = (props: IProps) => {
  const { children } = props;

  return (
    <div>
      <Navbar
        paths={[
          { path: '/', title: 'home' },
          { path: '/products', title: 'products' },
          { path: '/cart', title: 'cart' },
          { path: '/login', title: 'login' }
        ]}
      />
      {children}
      <div>footer</div>
    </div>
  );
};

export default PageLayout;
