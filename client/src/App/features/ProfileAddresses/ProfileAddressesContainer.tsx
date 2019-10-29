import { connect } from 'react-redux';
import ProfileAddresses from './ProfileAddresses';
import { userAddress } from '../../types/userAddress';
import {
  selectorUserAddresses,
  selectorUserAddressesRequestData
} from '../../reducers/userReducer';
import { AppState } from '../../reducers';
import { requestData } from '../../types/requestData';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../../actions/actionTypes';
import { userGetAddressesThunk } from '../../actions/userActions';
import { selectorAuthProfileName } from '../../reducers/authReducer';

export interface stateToProps {
  userAddresses: userAddress[];
  userAddressesRequestData: requestData;
  userName: string;
}

export interface dispatchToProps {
  getAddresses: Function;
}

const mapStateToProps = (state: AppState) => ({
  userAddresses: selectorUserAddresses(state),
  userAddressesRequestData: selectorUserAddressesRequestData(state),
  userName: selectorAuthProfileName(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ActionTypes>
) => ({
  getAddresses: () => dispatch(userGetAddressesThunk())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileAddresses);
