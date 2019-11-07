import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Text from '../Text/Text';
import Subtitle from '../Subtitle/Subtitle';

const EmptyCart = () => {
  return (
    <Fragment>
      <Subtitle align="center">Your cart is empty.</Subtitle>
      <Text align="center">
        <Fragment>
          <Link to="/products">
            <b>Shop now!</b>
          </Link>
        </Fragment>
      </Text>
    </Fragment>
  );
};

export default EmptyCart;
