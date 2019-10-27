import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Form from '../../common/Form/Form';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../../actions/actionTypes';
import { userAddress } from '../../types/userAddress';
import { userAddAddressThunk } from '../../actions/userActions';
import { object } from 'prop-types';

interface IProps {
  userName: string;
  submitCallback: Function;
  cancelCallback: Function;
  withCancel: Boolean;
}

const NewAddressField = (props: IProps & dispatchToProps) => {
  const {
    userName,
    addNewAddress,
    submitCallback,
    cancelCallback,
    withCancel
  } = props;

  return (
    <Form
      onSubmit={(data: any) => {
        addNewAddress(data);
        submitCallback();
      }}
      cancelBtnText={withCancel ? 'Cancel' : ''}
      onCancel={() => cancelCallback()}
      submitBtnText="Add address"
      inputs={[
        {
          errorMsg: 'Name should contain only A - Z letters and no space',
          extended: false,
          fieldName: 'name',
          fieldValue: `${userName.split(' ')[0]}`,
          label: 'First name',
          placeholder: 'Your first name',
          validateRegex: /^[a-ząśźżćńółę]*$/i,
          onChange: () => null
        },
        {
          errorMsg: 'Surname should contain only A - Z letters',
          extended: false,
          fieldName: 'surname',
          fieldValue: `${userName.split(' ')[1]}`,
          label: 'Last name',
          placeholder: 'Your last name',
          validateRegex: /^[a-ząśźżćńółę ]*$/i,
          onChange: () => null
        },
        {
          errorMsg: 'Street should not contain any special characters',
          extended: false,
          fieldName: 'streetName',
          fieldValue: '',
          label: 'Street',
          placeholder: 'Your street name',
          validateRegex: /^[a-ząśźżćńółę0-9- ]*$/i,
          onChange: () => null
        },
        {
          errorMsg: 'Invalid input',
          extended: false,
          fieldName: 'streetNumber',
          fieldValue: '',
          label: 'Street Number',
          placeholder: 'Your street number',
          validateRegex: /^[0-9a-z/ ]*$/i,
          onChange: () => null
        },
        {
          errorMsg:
            'City name should not contain any numbers or special characters',
          extended: false,
          fieldName: 'city',
          fieldValue: '',
          label: 'City',
          placeholder: 'Your city',
          validateRegex: /^[a-ząśźżćńółę ]*$/i,
          onChange: () => null
        },
        {
          errorMsg: 'Post code should have XX-XXX form',
          extended: false,
          fieldName: 'postCode',
          fieldValue: '',
          label: 'Postcode',
          placeholder: 'Your postcode',
          validateRegex: /^[0-9-]*$/i,
          onChange: () => null
        },
        {
          errorMsg: 'Phone should contain only numbers',
          extended: false,
          fieldName: 'phone',
          fieldValue: '',
          label: 'Phone number',
          placeholder: 'Your phone number',
          validateRegex: /^[0-9-]*$/i,
          onChange: () => null
        }
      ]}
    />
  );
};

interface dispatchToProps {
  addNewAddress: Function;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ActionTypes>
) => ({
  addNewAddress: (userAddress: userAddress) =>
    dispatch(userAddAddressThunk(userAddress))
});

export default connect(
  null,
  mapDispatchToProps
)(NewAddressField);
