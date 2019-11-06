import { connect } from 'react-redux';
import ProfileOrders from './ProfileOrders';
import { orderShortData } from '../../types/orderData';
import { requestData } from '../../types/requestData';
import { AppState } from '../../reducers';
import {
  selectorOrderGetAllUsers,
  selectorOrderGetAllUsersRequestData,
  selectorOrderAllQuantity
} from '../../reducers/orderReducer';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../../actions/actionTypes';
import { orderGetAllUsersThunk } from '../../actions/orderActions';

export interface stateToProps {
  userOrders: orderShortData[];
  userOrdersRequestData: requestData;
  userAllOrdersQuantity: number;
}

export interface dispatchToProps {
  getAllUsersOrders: Function;
}

const mapStateToProps = (state: AppState) => ({
  userOrders: selectorOrderGetAllUsers(state),
  userAllOrdersQuantity: selectorOrderAllQuantity(state),
  userOrdersRequestData: selectorOrderGetAllUsersRequestData(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ActionTypes>
) => ({
  getAllUsersOrders: (skip: number = 0, limit: number = 2) =>
    dispatch(orderGetAllUsersThunk(skip, limit))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileOrders);
