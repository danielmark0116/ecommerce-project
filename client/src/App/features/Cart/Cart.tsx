import React, { Fragment, useEffect } from 'react';
import { dispatchToProps } from './CartContainer';

type Props = dispatchToProps;

const Cart = (props: Props) => {
  const { getCartData } = props;

  useEffect(() => {
    getCartData();
  }, ['']);

  return <Fragment>cart component</Fragment>;
};

export default Cart;
