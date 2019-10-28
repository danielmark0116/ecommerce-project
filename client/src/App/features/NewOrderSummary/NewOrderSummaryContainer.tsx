import { connect } from 'react-redux';
import NewOrderSummary from './NewOrderSummary';
import { AppState } from '../../reducers';
import {
  selectorOrderNewOrderId,
  selectorOrderNewOrderRequestData,
  selectorOrderGetOne,
  selectorOrderGetOneRequestData
} from '../../reducers/orderReducer';
import { requestData } from '../../types/requestData';
import { orderData } from '../../types/orderData';
import { orderGetOneThunk } from '../../actions/orderActions';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../../actions/actionTypes';

export interface stateToProps {
  newOrderId: string;
  newOrderRequestData: requestData;
  singleOrder: orderData | null;
  singleOrderRequestData: requestData;
}

export interface dispatchToProps {
  getOneOrder: Function;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ActionTypes>
) => ({
  getOneOrder: (id: string) => dispatch(orderGetOneThunk(id))
});

const mapStateToProps = (state: AppState) => ({
  newOrderId: selectorOrderNewOrderId(state),
  newOrderRequestData: selectorOrderNewOrderRequestData(state),
  singleOrder: selectorOrderGetOne(state),
  singleOrderRequestData: selectorOrderGetOneRequestData(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewOrderSummary);
