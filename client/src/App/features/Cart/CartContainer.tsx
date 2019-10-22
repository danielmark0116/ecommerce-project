import { connect } from 'react-redux';

import { getCartIds } from '../../helpers/cart';

import Cart from './Cart';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../../actions/actionTypes';
import { cartGetThunk } from '../../actions/cartActions';

export interface dispatchToProps {
  getCartData: Function;
}

const mapDispatchToState = (
  dispatch: ThunkDispatch<any, any, ActionTypes>
) => ({
  getCartData: (ids: string[] = getCartIds()) => dispatch(cartGetThunk(ids))
});

export default connect(
  null,
  mapDispatchToState
)(Cart);
