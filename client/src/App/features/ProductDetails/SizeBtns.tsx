import React, { Fragment, useState } from 'react';

import Center from '../../common/Center/Center';
import Button from '../../common/Button/Button';
import Text from '../../common/Text/Text';

import _ from 'lodash';

interface IProps {
  sizes: string[];
  action: Function;
  allSizes: any;
}

const SizeBtns = (props: IProps) => {
  const { sizes, action, allSizes } = props;
  const [activeSize, toggleActiveSize] = useState('');
  const [quantity, changeQuantity] = useState(1);

  if (sizes && sizes.length > 0)
    return (
      <Fragment>
        <Center>
          <Fragment>
            {sizes.map((size, index) => (
              <Button
                size="small"
                key={index}
                action={() => {
                  toggleActiveSize(size);
                  changeQuantity(1);
                }}
                type={size === activeSize ? 'primary' : 'secondary'}
              >
                {size.toUpperCase()}
              </Button>
            ))}
          </Fragment>
        </Center>
        <br />
        {activeSize !== '' && (
          <Center>
            <Fragment>
              <Button
                action={() => changeQuantity(quantity > 1 ? quantity - 1 : 1)}
                disabled={activeSize === '' ? true : false}
                type="transparent"
              >
                -
              </Button>
              <Text>{quantity}</Text>
              <Button
                action={() =>
                  changeQuantity(
                    _.get(allSizes, activeSize) < 10
                      ? quantity < _.get(allSizes, activeSize)
                        ? quantity + 1
                        : _.get(allSizes, activeSize)
                      : quantity < 10
                      ? quantity + 1
                      : 10
                  )
                }
                disabled={activeSize === '' ? true : false}
                type="transparent"
              >
                +
              </Button>
            </Fragment>
          </Center>
        )}
        <br />
        <Center>
          <Button
            action={() => action(activeSize, quantity)}
            disabled={activeSize === '' ? true : false}
            type="primary"
          >
            {activeSize !== '' ? 'Add to cart' : 'Choose size first'}
          </Button>
        </Center>
      </Fragment>
    );
  return null;
};

export default SizeBtns;
