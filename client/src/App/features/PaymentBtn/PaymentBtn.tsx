import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../common/Button/Button';
import { AppState } from '../../reducers';
import { selectorAuthIsLoggedIn } from '../../reducers/authReducer';
import {
  selectorOrderGetOne,
  selectorOrderPaymentRedirect,
  selectorOrderPaymentId
} from '../../reducers/orderReducer';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../../actions/actionTypes';
import { orderPaymentThunk } from '../../actions/orderActions';
import { orderData } from '../../types/orderData';

import { injectStripe } from 'react-stripe-elements';

type Props = stateToProps & dispatchToProps;

const PaymentBtn = (props: Props | any) => {
  const [paymentTriggered, triggerPayment] = useState(false);

  const {
    isLoggedIn,
    newOrderId,
    orderPayment,
    singleOrder,
    paymentRedirect,
    paymentId
  } = props;

  useEffect(() => {
    if (paymentRedirect && paymentId) {
      props.stripe.redirectToCheckout({
        sessionId: paymentId
      });
    }
  }, [paymentRedirect]);

  return (
    <Fragment>
      <Button
        action={() => {
          if (singleOrder) {
            orderPayment(
              newOrderId,
              singleOrder.totalValue + singleOrder.deliveryValue
            );
            triggerPayment(true);
          }
        }}
        disabled={!isLoggedIn || singleOrder === null || paymentTriggered}
        type="primary"
      >
        {paymentTriggered ? 'Loading' : isLoggedIn ? 'Pay now' : 'Log in first'}
      </Button>
    </Fragment>
  );
};

interface stateToProps {
  isLoggedIn: Boolean;
  newOrderId: string;
  singleOrder: orderData | null;
  paymentRedirect: Boolean;
  paymentId: string | null;
}

interface dispatchToProps {
  orderPayment: Function;
}

interface ownProps {
  newOrderId: string;
}

const mapStateToProps = (state: AppState, ownProps: ownProps) => ({
  isLoggedIn: selectorAuthIsLoggedIn(state),
  newOrderId: ownProps.newOrderId,
  singleOrder: selectorOrderGetOne(state),
  paymentRedirect: selectorOrderPaymentRedirect(state),
  paymentId: selectorOrderPaymentId(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ActionTypes>
) => ({
  orderPayment: (orderId: string, amount: number) =>
    dispatch(orderPaymentThunk(orderId, amount))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectStripe(PaymentBtn));
