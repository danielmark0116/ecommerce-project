import React, { Fragment, useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import Loader from '../../common/Loader/Loader';

import Title from '../../common/Title/Title';
import Text from '../../common/Text/Text';
import Button from '../../common/Button/Button';
import Center from '../../common/Center/Center';
import PayBtn from '../../features/PaymentBtn/PaymentBtn';

import { stateToProps, dispatchToProps } from './NewOrderSummaryContainer';
import Axios from 'axios';

import StripeCheckout, { StripeCheckoutProps } from 'react-stripe-checkout';

// import Stripe from 'stripe';

// const stripe = stripe.redi;

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
        <PayBtn></PayBtn>
        <Center>
          <Text>You can view the order below</Text>
        </Center>
        <Center>
          <Link to="/">
            <Button type="secondary">See you order</Button>
          </Link>
        </Center>
        <br />
        {(singleOrder.status === 'init' && (
          <Fragment>
            <Center>
              <Text>Order is not paid yet.</Text>
            </Center>
            <Center>
              <Button
                action={() => {
                  Axios.post('/stripe/startpayment');
                }}
                type="primary"
              >
                PAY NOW
              </Button>
            </Center>
            <Center>
              <Button
                action={async () => {
                  const resp = await props.stripe
                    .redirectToCheckout({
                      // Make the id field from the Checkout Session creation API response
                      // available to this file, so you can provide it as parameter here
                      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
                      sessionId:
                        'cs_test_TevtzKG2wcQ797ijoCH2cZSkAg2U8m2ELlx1GPcuKnTikyw5UvPQiD7Q'
                    })
                    .then((x: any) => console.log(x));

                  console.log(resp);
                }}
                type="primary"
              >
                TO STRIPE
              </Button>
            </Center>

            {/* <button
              onClick={async () => {
                const resp = await props.stripe
                  .redirectToCheckout({
                    // Make the id field from the Checkout Session creation API response
                    // available to this file, so you can provide it as parameter here
                    // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
                    sessionId:
                      'cs_test_TevtzKG2wcQ797ijoCH2cZSkAg2U8m2ELlx1GPcuKnTikyw5UvPQiD7Q'
                  })
                  .then((x: any) => console.log(x));

                console.log(resp);
              }}
            >
              redirect to checkout
            </button> */}

            {/* <StripeCheckout
              token={handleStripe}
              stripeKey="pk_test_HBTW6la7zZutZIwh4zGKfTd000wGTdmhuf"
            /> */}
          </Fragment>
        )) ||
          ''}
      </Fragment>
    );
  if (singleOrder === null && newOrderId === '')
    return <Redirect to="/"></Redirect>;
  return null;
};

export default injectStripe(NewOrderSummary);

// cs_test_TevtzKG2wcQ797ijoCH2cZSkAg2U8m2ELlx1GPcuKnTikyw5UvPQiD7Q

// publi  key
// pk_test_HBTW6la7zZutZIwh4zGKfTd000wGTdmhuf
