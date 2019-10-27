import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

import { evalCartTotal } from '../../helpers/evalCartTotal';
import Text from '../../common/Text/Text';
import CrossedPrice from '../../common/CrossedPrice/CrossedPrice';

import style from '../../styles/main.module.scss';

type Props = stateToProps & dispatchToProps;

const Checkout = (props: Props) => {
  const [discount, toggleDiscount] = useState(false);
  const [discountValue, toggleDiscountValue] = useState(1);
  const [discountName, toggleDiscountName] = useState('');
  const [activeAddress, toggleActiveAddress] = useState(0);
  const [addNewAddress, toggleaddNewAddress] = useState(false);

  const userLoading = props.userAddressesRequestData.pending;
  const userSuccess = props.userAddressesRequestData.success;
  const userError = props.userAddressesRequestData.error;

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
    userPic
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
          <Title align="right">{`${_.round(
            evalCartTotal(cartItems) * (discount ? discountValue : 1),
            2
          )} $`}</Title>
          <div className="d-flex justify-content-end m-0 p-0">
            <Link to="/checkout">
              <Button
                disabled={!isLoggedIn}
                action={() => createNewOrder()}
                type="primary"
              >
                Place an order
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
    );
  if (pending || userLoading) return <Loader></Loader>;
  if (error || userError) return <p>Upss... Sth went wrong</p>;
  if (success)
    return (
      <Subtitle size="small" align="center">
        Cart is empty
      </Subtitle>
    );
  return null;
};

export default Checkout;
