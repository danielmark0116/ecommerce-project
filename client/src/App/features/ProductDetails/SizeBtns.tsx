import React, { Fragment, useState, useEffect } from 'react';

import Center from '../../common/Center/Center';
import Button from '../../common/Button/Button';
import Text from '../../common/Text/Text';

import { notify } from '../Notification/Notification';

import _ from 'lodash';
import { getCart } from '../../helpers/cart';

interface IProps {
  sizes: string[];
  action: Function;
  allSizes: any; // available sizes for given item in stock
  productId: string;
  callback: Function;
}

const SizeBtns = (props: IProps) => {
  const { sizes, action, allSizes, productId, callback } = props;
  const [activeSize, toggleActiveSize] = useState('');
  const [quantity, changeQuantity] = useState(1);
  const [canIncrement, toggleIncrement] = useState(true);
  const [isInCart, toggleIsInCart] = useState(false);
  const [presentQInCart, updateQFromCart] = useState(0);

  useEffect(() => {
    callback(presentQInCart);
  }, [presentQInCart]);

  useEffect(() => {
    const alreadyInCart = _.find(getCart(), ['id', productId]);
    const availableQ = _.get(allSizes, activeSize);

    if (alreadyInCart) {
      const presentCartQValue = _.get(alreadyInCart.quantity, activeSize);

      if (presentCartQValue + quantity > availableQ) {
        toggleIncrement(false);
      } else {
        toggleIncrement(true);
      }

      if (presentCartQValue > 0 && activeSize !== '') {
        toggleIsInCart(true);
      }

      if (presentCartQValue === 0) {
        toggleIsInCart(false);
      }

      updateQFromCart(presentCartQValue);
    } else {
      toggleIncrement(true);
      updateQFromCart(0);
    }
  }, [quantity, activeSize]);

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
                  callback(presentQInCart);
                }}
                type={size === activeSize ? 'primary' : 'secondary'}
              >
                {size.toUpperCase()}
              </Button>
            ))}
          </Fragment>
        </Center>
        <Center>
          <Text size="normal" color={canIncrement ? 'success' : 'danger'}>
            {isInCart
              ? `Already in cart. ${
                  canIncrement
                    ? 'You can add more:'
                    : 'We do not have more in stock'
                }`
              : _.get(allSizes, activeSize) === quantity
              ? 'We do not have more in stock for now'
              : ''}
          </Text>
        </Center>
        {activeSize !== '' && (
          <Center>
            <Fragment>
              <Button
                action={() => changeQuantity(quantity > 1 ? quantity - 1 : 1)}
                disabled={
                  quantity === 1 ? true : activeSize === '' ? true : false
                }
                type="transparent"
              >
                -
              </Button>
              <Text>{quantity}</Text>
              <Button
                action={() =>
                  canIncrement &&
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
                disabled={
                  isInCart
                    ? !canIncrement
                      ? true
                      : quantity === 10
                      ? true
                      : activeSize === ''
                      ? true
                      : false
                    : _.get(allSizes, activeSize) === quantity
                }
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
            action={() => {
              const alreadyInCart = _.find(getCart(), ['id', productId]);

              if (alreadyInCart) {
                const presentCartQValue = _.get(
                  alreadyInCart.quantity,
                  activeSize
                );
                const availableQ = _.get(allSizes, activeSize);

                if (presentCartQValue + quantity === availableQ) {
                  toggleIncrement(false);
                }
              }

              action(activeSize, quantity);
              changeQuantity(1);
              toggleIsInCart(true);
              notify(
                `Size ${activeSize.toUpperCase()} (x${quantity}) added to cart`,
                5000
              );
              updateQFromCart(presentQInCart + quantity);
            }}
            disabled={activeSize === '' ? true : canIncrement ? false : true}
            type="primary"
          >
            {activeSize !== ''
              ? canIncrement
                ? 'Add to cart'
                : 'Cannot add that much.'
              : 'Choose size first'}
          </Button>
        </Center>
      </Fragment>
    );
  return null;
};

export default SizeBtns;
