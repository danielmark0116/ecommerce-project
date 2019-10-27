import React, { Fragment } from 'react';

import Checkout from '../../features/Checkout/CheckoutContainer';
import Title from '../../common/Title/Title';

const CartPage = () => {
  return (
    <Fragment>
      <Title align="center">{`Checkout`.toUpperCase()}</Title>
      <Checkout></Checkout>
    </Fragment>
  );
};

export default CartPage;
