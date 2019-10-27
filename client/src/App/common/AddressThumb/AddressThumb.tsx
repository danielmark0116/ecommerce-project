import React from 'react';

import style from '../../styles/main.module.scss';
import { userAddress } from '../../types/userAddress';

import Text from '../../common/Text/Text';

interface IProps {
  addressData: userAddress;
  addressNo: number;
  active: number;
  clickAction: Function;
}

const AddressThumb = (props: IProps) => {
  const { addressData, addressNo, active, clickAction } = props;

  return (
    <div
      onClick={() => clickAction()}
      className={`${
        addressNo === active
          ? style.address_thumb_container_active
          : style.address_thumb_container
      }`}
    >
      <Text>{`${addressData.streetName} ${addressData.streetNumber}, ${addressData.postCode} ${addressData.city} | ${addressData.name} ${addressData.surname}`}</Text>
    </div>
  );
};

export default AddressThumb;
