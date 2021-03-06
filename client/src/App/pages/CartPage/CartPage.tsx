import React, { Fragment } from 'react';

import Cart from '../../features/Cart/CartContainer';
import Title from '../../common/Title/Title';

const CartPage = () => {
  return (
    <Fragment>
      <Title align="center">{`Your cart`.toUpperCase()}</Title>
      <Cart></Cart>
    </Fragment>
  );
};

export default CartPage;
