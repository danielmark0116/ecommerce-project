import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Loader from '../../common/Loader/Loader';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../../actions/actionTypes';
import { orderPaymentFullFillThunk } from '../../actions/orderActions';

interface routeProps {
  paymentSessionId: string;
}

const FullfillPaymentPage = (
  props: RouteComponentProps<routeProps> & dispatchToProps
) => {
  const { match, fullfillPayment } = props;

  const paymentSessionId = match.params.paymentSessionId;

  useEffect(() => {
    fullfillPayment(paymentSessionId);
  }, ['']);

  return (
    <Fragment>
      <Redirect to="/profile"></Redirect>
      <Loader></Loader>
    </Fragment>
  );
};

interface dispatchToProps {
  fullfillPayment: Function;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ActionTypes>
) => ({
  fullfillPayment: (sessionId: string) =>
    dispatch(orderPaymentFullFillThunk(sessionId))
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter(FullfillPaymentPage));
