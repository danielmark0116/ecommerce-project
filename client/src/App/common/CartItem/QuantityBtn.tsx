import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import Center from '../../common/Center/Center';
import Flex from '../../common/FlexGrid/FlexContainer';
import Button from '../../common/Button/Button';
import Text from '../../common/Text/Text';

interface IProps {
  itemQ: number;
  action: Function;
  availableQ: number;
}

const SizeBtns = (props: IProps) => {
  const { itemQ, action, availableQ } = props;
  const [activeSize, toggleActiveSize] = useState('');
  const [quantity, changeQuantity] = useState(itemQ);

  useEffect(() => {
    changeQuantity(itemQ);
  }, [itemQ]);

  useEffect(() => {
    if (quantity !== itemQ) {
      action(quantity);
    }
  }, [quantity]);

  return (
    <Fragment>
      <Text size="normal">Quantity:</Text>
      <Fragment>
        <Button
          action={() => {
            changeQuantity(quantity > 1 ? quantity - 1 : 1);
          }}
          disabled={quantity === 1 ? true : false}
          type="transparent"
          size="small"
        >
          -
        </Button>
        <Text>{itemQ}</Text>
        <Button
          action={() => {
            changeQuantity(itemQ < availableQ ? quantity + 1 : availableQ);
          }}
          disabled={itemQ === availableQ ? true : false}
          type="transparent"
          size="small"
        >
          +
        </Button>
      </Fragment>
      <Text size="small" color="danger">
        {itemQ === availableQ ? 'No more items in stock' : ''}
      </Text>
    </Fragment>
  );
};

export default SizeBtns;
