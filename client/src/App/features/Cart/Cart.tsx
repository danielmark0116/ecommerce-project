import React, { Fragment, useEffect } from 'react';
import { dispatchToProps, stateToProps } from './CartContainer';

import Title from '../../common/Title/Title';
import Subtitle from '../../common/Subtitle/Subtitle';
import CartItem from '../../common/CartItem/CartItem';
import Loader from '../../common/Loader/Loader';

import { evalCartTotal } from '../../helpers/evalCartTotal';

type Props = stateToProps & dispatchToProps;

const Cart = (props: Props) => {
  const {
    getCartData,
    cartItems,
    updateCart,
    deleteCartItem,
    pending,
    success,
    error
  } = props;

  useEffect(() => {
    getCartData();
  }, ['']);

  if (!pending && !error && success && cartItems.length > 0)
    return (
      <Fragment>
        {cartItems.map((item, index) => (
          <CartItem
            updateAction={updateCart}
            deleteAction={deleteCartItem}
            key={index}
            cartItem={item}
          />
        ))}
        <Subtitle size="small" align="right">
          Total:
        </Subtitle>
        <Title align="right">{`${evalCartTotal(cartItems)} $`}</Title>
      </Fragment>
    );
  if (pending) return <Loader></Loader>;
  if (error) return <p>Upss... Sth went wrong</p>;
  if (success) return <p>Cart is empty</p>;
  return null;
};

export default Cart;
