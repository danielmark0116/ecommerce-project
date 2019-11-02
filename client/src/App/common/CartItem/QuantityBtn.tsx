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
    action(quantity);
  }, [quantity]);

  return (
    <Fragment>
      <Fragment>
        <Button
          action={() => {
            changeQuantity(quantity > 1 ? quantity - 1 : 1);
          }}
          disabled={false}
          type="transparent"
          size="small"
        >
          -
        </Button>
        <Text>{itemQ}</Text>
        <Button
          action={() => {
            changeQuantity(
              availableQ < 10
                ? quantity < availableQ
                  ? quantity + 1
                  : availableQ
                : quantity < 10
                ? quantity + 1
                : 10
            );
          }}
          disabled={false}
          type="transparent"
          size="small"
        >
          +
        </Button>
      </Fragment>
    </Fragment>
  );
};

export default SizeBtns;
