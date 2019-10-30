import React, { Fragment } from 'react';
import { Col, Row } from 'reactstrap';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import Image from '../Image/Image';
import Subtitle from '../Subtitle/Subtitle';
import Subtext from '../Subtext/Subtext';
import Text from '../Text/Text';
import Button from '../Button/Button';
import QuantityBtn from './QuantityBtn';
import Flex from '../FlexGrid/FlexContainer';

import style from '../../styles/main.module.scss';

import { cartItemType } from '../../types/productCartData';
import Title from '../Title/Title';

interface IProps {
  cartItem: cartItemType;
  edit: Boolean;
  deleteAction: Function;
  updateAction: Function;
}

const CartItem = (props: IProps) => {
  const { edit, updateAction, deleteAction } = props;
  const { name, price, img, category, sex, quantity, _id } = props.cartItem;

  const renderCartItem = (productSize: string, sizeQ: any, index: number) => {
    return (
      <div key={index} className={style.cart_item_container}>
        <Row>
          <Col xs="12" sm="auto" md="3">
            <Link to={`/products/${_id}`}>
              <Image size="small" picString={img}></Image>
            </Link>
          </Col>
          <Col xs="12" sm="auto" md="9">
            <Link to={`/products/${_id}`}>
              <Title size="small">{name}</Title>
            </Link>
            <Subtext size="small">{`${category}  |  ${sex}`}</Subtext>
            <Subtitle size="small">{`Size: ${productSize.toUpperCase()}`}</Subtitle>
            {edit ? (
              <Flex>
                <Fragment>
                  <Subtitle>{`${price} $`}</Subtitle>
                  <Subtext size="small">for one</Subtext>
                </Fragment>
              </Flex>
            ) : (
              <Flex>
                <Fragment>
                  <Text>
                    <Fragment>
                      {sizeQ} x <b>{price} $</b>
                    </Fragment>
                  </Text>
                </Fragment>
              </Flex>
            )}
            {edit && (
              <Flex>
                <Fragment>
                  <Text>Quantity: </Text>
                  <QuantityBtn
                    itemQ={sizeQ}
                    action={(quantity: number) =>
                      updateAction(_id, productSize, quantity)
                    }
                  />
                  <Button
                    size="small"
                    type="primary"
                    action={() => deleteAction(_id)}
                  >
                    DELETE
                  </Button>
                </Fragment>
              </Flex>
            )}
            <Flex>
              <Fragment>
                <Title size="small">{`${_.round(price * sizeQ, 2)} $`}</Title>
              </Fragment>
            </Flex>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <Fragment>
      {Object.values(quantity).map((size, index) => {
        if (size !== 0)
          return renderCartItem(Object.keys(quantity)[index], size, index);
        return null;
      })}
    </Fragment>
  );
};

CartItem.defaultProps = {
  edit: true,
  deleteAction: () => null,
  updateAction: () => null
};

export default CartItem;
