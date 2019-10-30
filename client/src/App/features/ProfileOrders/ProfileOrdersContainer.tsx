import { connect } from 'react-redux';
import ProfileOrders from './ProfileOrders';
import { orderShortData } from '../../types/orderData';
import { requestData } from '../../types/requestData';
import { AppState } from '../../reducers';
import {
  selectorOrderGetAllUsers,
  selectorOrderGetAllUsersRequestData
} from '../../reducers/orderReducer';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../../actions/actionTypes';
import { orderGetAllUsersThunk } from '../../actions/orderActions';

export interface stateToProps {
  userOrders: orderShortData[];
  userOrdersRequestData: requestData;
}

export interface dispatchToProps {
  getAllUsersOrders: Function;
}

const mapStateToProps = (state: AppState) => ({
  userOrders: selectorOrderGetAllUsers(state),
  userOrdersRequestData: selectorOrderGetAllUsersRequestData(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ActionTypes>
) => ({
  getAllUsersOrders: () => dispatch(orderGetAllUsersThunk())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileOrders);
