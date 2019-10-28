import React from 'react';

import style from '../../styles/main.module.scss';

import Text from '../../common/Text/Text';
import { deliveryData } from '../../types/deliveryData';

interface IProps {
  deliveryData: deliveryData;
  deliveryNo: number;
  active: number;
  clickAction: Function;
}

const DeliveryTab = (props: IProps) => {
  const { deliveryData, deliveryNo, active, clickAction } = props;

  return (
    <div
      onClick={() => clickAction()}
      className={`${
        deliveryNo === active
          ? style.delivery_tab_container_active
          : style.delivery_tab_container
      }`}
    >
      <Text>{`${deliveryData.name} | ${deliveryData.cost} $`}</Text>
    </div>
  );
};

export default DeliveryTab;
