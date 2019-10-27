import { connect } from 'react-redux';

import { getCartIds } from '../../helpers/cart';

import Checkout from './Checkout';
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
import { selectorCoupons } from '../../reducers/generalsReducer';
import { couponsData } from '../../types/couponsData';
import {
  selectorAuthIsLoggedIn,
  selectorAuthProfileName,
  selectorAuthProfilePic
} from '../../reducers/authReducer';
import { userAddress } from '../../types/userAddress';
import {
  selectorUserAddresses,
  selectorUserAddressesRequestData
} from '../../reducers/userReducer';
import { requestData } from '../../types/requestData';
import { userGetAddressesThunk } from '../../actions/userActions';

export interface stateToProps {
  cartItems: cartItemsType;
  pending: Boolean;
  success: Boolean;
  error: Boolean;
  coupons: couponsData;
  isLoggedIn: Boolean;

  discountCode: string;
  userAddresses: userAddress[];
  userAddressesRequestData: requestData;
  userName: string;
  userPic: string;
}

export interface dispatchToProps {
  getCartData: Function;
  createNewOrder: Function;
  getAddresses: Function;
}

const mapStateToProps = (state: AppState) => ({
  cartItems: selectorCartGetAllItems(state),
  pending: selectorCartRequestData(state).pending,
  success: selectorCartRequestData(state).success,
  error: selectorCartRequestData(state).error,
  coupons: selectorCoupons(state),
  isLoggedIn: selectorAuthIsLoggedIn(state),

  discountCode: sessionStorage.getItem('discountCode')
    ? JSON.parse(sessionStorage.getItem('discountCode') || '')
    : '',
  userAddresses: selectorUserAddresses(state),
  userAddressesRequestData: selectorUserAddressesRequestData(state),
  userName: selectorAuthProfileName(state),
  userPic: selectorAuthProfilePic(state)
});

const mapDispatchToState = (
  dispatch: ThunkDispatch<any, any, ActionTypes>
) => ({
  getCartData: (ids: string[] = getCartIds()) => dispatch(cartGetThunk(ids)),
  getAddresses: () => dispatch(userGetAddressesThunk()),
  createNewOrder: () => console.log('Creating new order')
});

export default connect(
  mapStateToProps,
  mapDispatchToState
)(Checkout);
