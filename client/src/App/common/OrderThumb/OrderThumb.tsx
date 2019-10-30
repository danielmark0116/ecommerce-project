import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Text from '../../common/Text/Text';
import Subtext from '../../common/Subtext/Subtext';

import style from '../../styles/main.module.scss';
import { orderShortData } from '../../types/orderData';

interface IProps {
  orderData: orderShortData;
}

const OrderThumb = (props: IProps) => {
  const { orderData } = props;

  return (
    <Link to={`/order/${orderData._id}`}>
      <div className={style.order_thumb_container}>
        <Text>
          <Fragment>
            <b>Order ID: </b>
            {orderData._id}
          </Fragment>
        </Text>
        <Text>
          <Fragment>
            <b>
              {' '}
              {_.round(orderData.totalValue + orderData.deliveryValue, 2)} $
            </b>{' '}
            (with shipping)
          </Fragment>
        </Text>
        <Subtext size="small">{`Click for details`}</Subtext>
      </div>
    </Link>
  );
};

export default OrderThumb;
