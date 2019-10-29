import React, { useEffect, Fragment, useState } from 'react';
import { stateToProps, dispatchToProps } from './ProfileAddressesContainer';

import Title from '../../common/Title/Title';
import Text from '../../common/Text/Text';
import Button from '../../common/Button/Button';
import Loader from '../../common/Loader/Loader';
import AddressThumb from '../../common/AddressThumb/AddressThumb';
import NewAddressForm from '../../features/NewAddressForm/NewAddressForm';
import { userAddAddress } from '../../actions/userActions';

type Props = stateToProps & dispatchToProps;

const ProfileAddresses = (props: Props) => {
  const {
    getAddresses,
    userAddresses,
    userAddressesRequestData,
    userName
  } = props;
  const { pending, success, error } = userAddressesRequestData;

  const [addNewAddress, toggleAddNewAddress] = useState(false);

  useEffect(() => {
    getAddresses();
  }, ['']);

  if (pending) return <Loader></Loader>;
  if (error)
    return <Text>We could not get your address data. Try again later</Text>;
  if (success)
    return (
      <Fragment>
        <Title size="small">Addresses</Title>

        {userAddresses.length == 0 ? (
          <Text>No address data. Add new one below</Text>
        ) : (
          <Text>List of your addresses</Text>
        )}

        {addNewAddress ? (
          <NewAddressForm
            withCancel={userAddresses.length === 0 ? false : true}
            submitCallback={() => toggleAddNewAddress(false)}
            cancelCallback={() => toggleAddNewAddress(false)}
            userName={userName}
          />
        ) : (
          <Fragment>
            {userAddresses.map((address, index) => (
              <AddressThumb
                clickAction={() => null}
                active={-1}
                addressData={address}
                key={index}
                addressNo={index}
              />
            ))}
          </Fragment>
        )}

        {!addNewAddress && (
          <Button
            action={() => toggleAddNewAddress(true)}
            size="small"
            type="transparent"
          >
            Add new...
          </Button>
        )}
      </Fragment>
    );
  return <Fragment></Fragment>;
};

export default ProfileAddresses;
