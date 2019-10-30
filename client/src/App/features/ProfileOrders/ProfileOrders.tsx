import React, { useEffect, Fragment } from 'react';

import Title from '../../common/Title/Title';
import Text from '../../common/Text/Text';
import Subtitle from '../../common/Subtitle/Subtitle';
import Subtext from '../../common/Subtext/Subtext';
import Loader from '../../common/Loader/Loader';

import OrderThumb from '../../common/OrderThumb/OrderThumb';

import { stateToProps, dispatchToProps } from './ProfileOrdersContainer';

type Props = stateToProps & dispatchToProps;

const ProfileOrders = (props: Props) => {
  const { userOrders, getAllUsersOrders, userOrdersRequestData } = props;
  const { pending, error, success } = userOrdersRequestData;

  useEffect(() => {
    getAllUsersOrders();
  }, ['']);

  return (
    <Fragment>
      <Title size="small">Your orders</Title>
      <Text>Your orders history:</Text>
      {userOrders.length === 0 && (
        <Subtext align="center" size="small">
          No orders yet...
        </Subtext>
      )}
      {pending && <Loader></Loader>}
      {userOrders && userOrders.length > 0 && (
        <Fragment>
          {userOrders.map((order, index) => (
            <OrderThumb key={index} orderData={order} />
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProfileOrders;
