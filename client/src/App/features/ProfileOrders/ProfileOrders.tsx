import React, { useEffect, Fragment, useState } from 'react';

import Title from '../../common/Title/Title';
import Text from '../../common/Text/Text';
import Subtext from '../../common/Subtext/Subtext';
import Loader from '../../common/Loader/Loader';
import Button from '../../common/Button/Button';

import OrderThumb from '../../common/OrderThumb/OrderThumb';

import { stateToProps, dispatchToProps } from './ProfileOrdersContainer';

type Props = stateToProps & dispatchToProps;

const initLimitValue = 2;

const ProfileOrders = (props: Props) => {
  const {
    userOrders,
    getAllUsersOrders,
    userOrdersRequestData,
    userAllOrdersQuantity
  } = props;
  const { pending, error, success } = userOrdersRequestData;
  const [limitValue, setLimitValue] = useState(initLimitValue);

  useEffect(() => {
    getAllUsersOrders(0, limitValue);
  }, [limitValue]);

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
          {limitValue < userAllOrdersQuantity ? (
            <Button
              action={() => setLimitValue(limitValue + initLimitValue)}
              size="small"
              type="transparent"
            >
              Load more
            </Button>
          ) : (
            <Text size="small">No more to load...</Text>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProfileOrders;
