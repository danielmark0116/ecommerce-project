import React, { useEffect, Fragment } from 'react';

import Title from '../../common/Title/Title';
import Subtitle from '../../common/Subtitle/Subtitle';
import Subtext from '../../common/Subtext/Subtext';
import Text from '../../common/Text/Text';
import PayBtn from '../../features/PaymentBtn/PaymentBtn';
import Center from '../../common/Center/Center';
import CartItem from '../../common/CartItem/CartItem';
import AddressThumb from '../../common/AddressThumb/AddressThumb';
import Loader from '../../common/Loader/Loader';
import Error from '../../common/Error/Error';
import NotYourOrder from '../../common/NotYourOrder/NotYourOrder';

import _ from 'lodash';

import style from '../../styles/main.module.scss';

import { stateToProps, dispatchToProps } from './OrderDetailsContainer';

type Props = stateToProps & dispatchToProps;

const OrderDetails = (props: Props) => {
  const {
    getOrderById,
    orderId,
    orderData,
    orderRequestData,
    orderUnauthorized
  } = props;
  const { pending, error, success } = orderRequestData;

  useEffect(() => {
    getOrderById(orderId);
  }, ['']);

  if (orderData === null && success)
    return (
      <Fragment>
        <Title size="small" color="warning" align="center">
          No such order
        </Title>
      </Fragment>
    );
  if (error && orderUnauthorized) return <NotYourOrder></NotYourOrder>;
  if (error) return <Error />;
  if (orderData === null || pending) return <Loader></Loader>;

  return (
    <Fragment>
      <Title>Order details</Title>
      <Text>
        <Fragment>
          <b>Order ID:</b> {orderData._id}
        </Fragment>
      </Text>
      <Text>
        <Fragment>
          <b>Order created:</b> {new Date(orderData.createdAt).toLocaleString()}
        </Fragment>
      </Text>
      {['paid', 'processing'].includes(orderData.status) &&
        orderData.paymentDate && (
          <Text>
            <Fragment>
              <b>Order paid:</b>{' '}
              {new Date(orderData.paymentDate).toLocaleString()}
            </Fragment>
          </Text>
        )}
      <Text>
        <Fragment>
          <b>Status:</b>{' '}
          {orderData.status === 'init' && (
            <span className={style.text_warning}>PAYMENT NOT RECEIVED</span>
          )}
          {orderData.status === 'paid' && (
            <span className={style.text_success}>SUCCESSFULLY PAID</span>
          )}
        </Fragment>
      </Text>
      <Text>
        <Fragment>
          <b>Promo code:</b>{' '}
          {orderData.discountName === ''
            ? 'No promo used'
            : `${orderData.discountName} (-${(
                (1 - orderData.discount) *
                100
              ).toFixed(0)}%)`}
        </Fragment>
      </Text>
      <Text>
        <Fragment>
          <b>Delivery:</b> {orderData.deliveryType} ({orderData.deliveryValue}{' '}
          $)
        </Fragment>
      </Text>
      <Text>
        <Fragment>
          <b>Total:</b>{' '}
          {_.round(orderData.totalValue + orderData.deliveryValue, 2)} $
        </Fragment>
      </Text>
      {orderData.status === 'init' && (
        <Fragment>
          <Center>
            <Text>
              We did not receive your payment yet. You can do it below
            </Text>
          </Center>
          <Center>
            <PayBtn newOrderId={orderData._id}></PayBtn>
          </Center>
        </Fragment>
      )}
      <br />
      <Title size="small">Track your delivery here:</Title>
      <Subtext size="small">Your order is not sent yet.</Subtext>
      <br />
      <Title size="small">Picked address:</Title>
      <AddressThumb
        clickAction={() => null}
        addressNo={0}
        active={0}
        addressData={orderData.address}
      ></AddressThumb>
      <br />
      <Title size="small">You ordered:</Title>
      {orderData.cart.map((cartItem, index) => (
        <CartItem key={index} cartItem={cartItem} edit={false}></CartItem>
      ))}
    </Fragment>
  );
};

export default OrderDetails;
