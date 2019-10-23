import { connect } from 'react-redux';

import { getCartIds } from '../../helpers/cart';

import Cart from './Cart';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../../actions/actionTypes';
import {
  cartGetThunk,
  cartUpdateThunk,
  cartDeleteItemThunk
} from '../../actions/cartActions';
import { AppState } from '../../reducers';
import {
  selectorCartGetAllItems,
  selectorCartRequestData
} from '../../reducers/cartReducer';
import { cartItemsType } from '../../types/productCartData';

export interface stateToProps {
  cartItems: cartItemsType;
  pending: Boolean;
  success: Boolean;
  error: Boolean;
}

export interface dispatchToProps {
  getCartData: Function;
  updateCart: Function;
  deleteCartItem: Function;
}

const mapStateToProps = (state: AppState) => ({
  cartItems: selectorCartGetAllItems(state),
  pending: selectorCartRequestData(state).pending,
  success: selectorCartRequestData(state).success,
  error: selectorCartRequestData(state).error
});

const mapDispatchToState = (
  dispatch: ThunkDispatch<any, any, ActionTypes>
) => ({
  getCartData: (ids: string[] = getCartIds()) => dispatch(cartGetThunk(ids)),
  updateCart: (id: string, size: string, quantity: number) =>
    dispatch(cartUpdateThunk(id, size, quantity)),
  deleteCartItem: (id: string) => dispatch(cartDeleteItemThunk(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToState
)(Cart);
