import React, { Fragment, useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import Loader from '../../common/Loader/Loader';

import Title from '../../common/Title/Title';
import Text from '../../common/Text/Text';
import Button from '../../common/Button/Button';
import Center from '../../common/Center/Center';
import PayBtn from '../../features/PaymentBtn/PaymentBtn';

import { stateToProps, dispatchToProps } from './NewOrderSummaryContainer';

import { injectStripe, Elements } from 'react-stripe-elements';

type Props = stateToProps & dispatchToProps & any;

const NewOrderSummary = (props: Props) => {
  const {
    singleOrder,
    singleOrderRequestData,
    getOneOrder,
    newOrderId
  } = props;
  const { pending, success, error } = singleOrderRequestData;

  useEffect(() => {
    if (newOrderId !== '') {
      getOneOrder(newOrderId);
    }
  }, ['']);

  if (pending) return <Loader></Loader>;
  if (error) return <Redirect to="/"></Redirect>;
  if (singleOrder)
    return (
      <Fragment>
        <Center>
          <Title size="small">Succesfully created new order!</Title>
        </Center>
        <br />
        <Center>
          <Text>Pay for the order</Text>
        </Center>
        <Center>
          <PayBtn newOrderId={newOrderId}></PayBtn>
        </Center>
        <br />
        <Center>
          <Text>Or view the order details below and pay later</Text>
        </Center>
        <Center>
          <Link to="/">
            <Button type="secondary">See you order</Button>
          </Link>
        </Center>
      </Fragment>
    );
  if (singleOrder === null && newOrderId === '')
    return <Redirect to="/"></Redirect>;
  return null;
};

export default injectStripe(NewOrderSummary);
