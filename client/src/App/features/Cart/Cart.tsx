import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { dispatchToProps, stateToProps } from './CartContainer';
import _ from 'lodash';

import Title from '../../common/Title/Title';
import Subtitle from '../../common/Subtitle/Subtitle';
import Subtext from '../../common/Subtext/Subtext';
import CartItem from '../../common/CartItem/CartItem';
import Loader from '../../common/Loader/Loader';
import Button from '../../common/Button/Button';

import { evalCartTotal } from '../../helpers/evalCartTotal';
import CouponInput from '../CouponInput/CouponInput';
import Text from '../../common/Text/Text';
import CrossedPrice from '../../common/CrossedPrice/CrossedPrice';

import style from '../../styles/main.module.scss';

type Props = stateToProps & dispatchToProps;

const Cart = (props: Props) => {
  const [discount, toggleDiscount] = useState(false);
  const [discountValue, setDiscountValue] = useState(1);
  const [discountName, setDiscountName] = useState('');

  const {
    getCartData,
    cartItems,
    updateCart,
    deleteCartItem,
    pending,
    success,
    error,
    coupons,
    isLoggedIn,
    createNewOrder
  } = props;

  useEffect(() => {
    getCartData();
  }, ['']);

  const applyCoupon = (name: string, value: number) => {
    toggleDiscount(true);
    setDiscountName(name);
    setDiscountValue(value);
  };

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
        <Row>
          <Col sm="12" xl="8">
            <CouponInput action={applyCoupon} coupons={coupons} />
          </Col>
          <Col sm="12" xl="4">
            {discount && (
              <Text color="success" align="right">
                <Fragment>
                  Active discount: <b>{discountName}</b>
                  {' ('}
                  {_.round((1 - discountValue) * 100, 0)}
                  {'%)'}
                </Fragment>
              </Text>
            )}
            <Subtitle size="small" align="right">
              Total:
            </Subtitle>
            {discount && (
              <CrossedPrice align="right">{`${evalCartTotal(
                cartItems
              )} $`}</CrossedPrice>
            )}
            <Title align="right">{`${_.round(
              evalCartTotal(cartItems) * discountValue,
              2
            )} $`}</Title>
            <div className="d-flex justify-content-end m-0 p-0">
              <Link to="/checkout">
                <Button
                  disabled={!isLoggedIn}
                  action={() => createNewOrder()}
                  type="primary"
                >
                  Go to chekout
                </Button>
              </Link>
            </div>
            {!isLoggedIn && (
              <Subtext align="right" size="small">
                Log in to order
              </Subtext>
            )}
          </Col>
        </Row>
      </Fragment>
    );
  if (pending) return <Loader></Loader>;
  if (error) return <p>Upss... Sth went wrong</p>;
  if (success)
    return (
      <Subtitle size="small" align="center">
        Cart is empty
      </Subtitle>
    );
  return null;
};

export default Cart;
