import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import OrderDetails from './OrderDetails';
import { AppState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../../actions/actionTypes';
import { orderGetOne, orderGetOneThunk } from '../../actions/orderActions';
import { RouteComponentProps } from 'react-router';
import { orderData } from '../../types/orderData';
import {
  selectorOrderGetOne,
  selectorOrderGetOneRequestData
} from '../../reducers/orderReducer';
import { requestData } from '../../types/requestData';

interface RouteProps {
  orderId: string;
}

export interface stateToProps {
  orderId: string;
  orderData: orderData | null;
  orderRequestData: requestData;
}

export interface dispatchToProps {
  getOrderById: Function;
}

const mapStateToProps = (
  state: AppState,
  ownProps: RouteComponentProps<RouteProps>
) => ({
  orderId: ownProps.match.params.orderId,
  orderData: selectorOrderGetOne(state),
  orderRequestData: selectorOrderGetOneRequestData(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ActionTypes>
) => ({
  getOrderById: (id: string) => dispatch(orderGetOneThunk(id))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrderDetails)
);
