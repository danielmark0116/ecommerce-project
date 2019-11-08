import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { dispatchToProps, stateToProps } from './CheckoutContainer';
import _ from 'lodash';

import Title from '../../common/Title/Title';
import Subtitle from '../../common/Subtitle/Subtitle';
import Subtext from '../../common/Subtext/Subtext';
import CheckoutItem from '../../common/CheckoutItem/CheckoutItem';
import Loader from '../../common/Loader/Loader';
import Button from '../../common/Button/Button';
import NewAddressForm from '../NewAddressForm/NewAddressForm';
import AddressThumb from '../../common/AddressThumb/AddressThumb';
import DeliveryTab from '../../common/DeliveryTab/DeliveryTab';
import Error from '../../common/Error/Error';

import { evalCartTotal } from '../../helpers/evalCartTotal';
import Text from '../../common/Text/Text';
import CrossedPrice from '../../common/CrossedPrice/CrossedPrice';

type Props = stateToProps & dispatchToProps;

const Checkout = (props: Props) => {
  const [discount, toggleDiscount] = useState(false);
  const [discountValue, toggleDiscountValue] = useState(1);
  const [discountName, toggleDiscountName] = useState('');
  const [activeAddress, toggleActiveAddress] = useState(-1);
  const [addNewAddress, toggleaddNewAddress] = useState(false);
  const [activeDelivery, toggleActiveDelivery] = useState(0);

  const userLoading = props.userAddressesRequestData.pending;
  const userSuccess = props.userAddressesRequestData.success;
  const userError = props.userAddressesRequestData.error;

  const newOrderLoading = props.newOrderRequestData.pending;
  const newOrderSuccess = props.newOrderRequestData.success;
  const newOrderFail = props.newOrderRequestData.error;
  const newOrderId = props.newOrderId;

  const {
    getCartData,
    cartItems,
    pending,
    success,
    error,
    coupons,
    isLoggedIn,
    createNewOrder,
    discountCode,
    userAddresses,
    getAddresses,
    userName,
    deliveryTypes,
    getOneLoading,
    getOneSuccess
  } = props;

  useEffect(() => {
    getCartData();
    getAddresses();

    if (_.some(coupons, ['code', discountCode])) {
      toggleDiscount(true);
      const discountData = coupons.find(item => item.code === discountCode);

      if (discountData) {
        toggleDiscountValue(discountData.value);
        toggleDiscountName(discountData.name);
      }
    }
  }, ['']);

  if (newOrderSuccess)
    return <Redirect push to="/new-order-success"></Redirect>;

  if (!pending && !error && success && cartItems.length > 0 && userSuccess)
    return (
      <Row>
        <Col sm="12" xl="8">
          <Title size="small">Address</Title>
          <Text>
            {userAddresses.length === 0 || addNewAddress
              ? `Add new address:`
              : `Choose your address:`}
          </Text>
          {userAddresses.length === 0 || addNewAddress ? (
            <NewAddressForm
              withCancel={userAddresses.length === 0 ? false : true}
              submitCallback={() => toggleaddNewAddress(false)}
              cancelCallback={() => toggleaddNewAddress(false)}
              userName={userName}
            />
          ) : (
            <Fragment>
              {userAddresses.map((address, index) => (
                <AddressThumb
                  clickAction={() => {
                    toggleActiveAddress(index);
                  }}
                  active={activeAddress}
                  addressData={address}
                  key={index}
                  addressNo={index}
                />
              ))}
              <Button
                action={() => toggleaddNewAddress(true)}
                size="small"
                type="transparent"
              >
                Add new...
              </Button>
            </Fragment>
          )}
          <Title size="small">Delivery type</Title>
          {deliveryTypes.map((type, index) => (
            <DeliveryTab
              active={activeDelivery}
              deliveryNo={index}
              clickAction={() => toggleActiveDelivery(index)}
              deliveryData={type}
              key={index}
            />
          ))}
          <br />
          <Button
            disabled={
              !isLoggedIn ||
              newOrderLoading ||
              activeAddress === -1 ||
              userAddresses.length === 0
            }
            action={() => {
              createNewOrder(
                userAddresses[activeAddress],
                deliveryTypes[activeDelivery].name,
                deliveryTypes[activeDelivery].cost,
                cartItems,
                _.round(evalCartTotal(cartItems), 2),
                discount ? discountValue : 1,
                discountName,
                1
              );
            }}
            type="primary"
          >
            {userAddresses.length === 0
              ? 'Add you address first'
              : activeAddress === -1
              ? 'Choose address'
              : newOrderLoading
              ? 'Creating new order'
              : 'Order'}
          </Button>
        </Col>
        <Col sm="12" xl="4">
          {cartItems.map((item, index) => (
            <CheckoutItem key={index} cartItem={item}></CheckoutItem>
          ))}

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
          <Title size="small" align="right">{`${_.round(
            evalCartTotal(cartItems) * (discount ? discountValue : 1),
            2
          )} $`}</Title>
          <Text align="right">{`+ ${deliveryTypes[activeDelivery].cost} $ for delivery`}</Text>
          <Title size="large" align="right">{`${_.round(
            evalCartTotal(cartItems) * (discount ? discountValue : 1) +
              deliveryTypes[activeDelivery].cost,
            2
          )} $`}</Title>
        </Col>
      </Row>
    );
  if (pending || userLoading) return <Loader></Loader>;
  if (error || userError) return <Error />;
  if (cartItems.length === 0) return <Redirect push to="/cart"></Redirect>;
  return null;
};

export default Checkout;
