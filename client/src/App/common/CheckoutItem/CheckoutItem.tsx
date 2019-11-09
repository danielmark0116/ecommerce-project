import React, { Fragment } from 'react';
import { Col, Row } from 'reactstrap';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import Image from '../Image/Image';
import Subtitle from '../Subtitle/Subtitle';
import Subtext from '../Subtext/Subtext';
import Text from '../Text/Text';

import style from '../../styles/main.module.scss';

import { cartItemType } from '../../types/productCartData';

interface IProps {
  cartItem: cartItemType;
}

const CheckoutItem = (props: IProps) => {
  const { name, price, img, category, sex, quantity, _id } = props.cartItem;

  const renderCartItem = (productSize: string, sizeQ: any, index: number) => {
    return (
      <div key={index} className={style.cart_item_container_small}>
        <Row>
          <Col xs="2" md="2" xl="3">
            <Link to={`/products/${_id}`}>
              <Image size="small" picString={img}></Image>
            </Link>
          </Col>
          <Col xs="10" md="10" xl="9">
            <Link to={`/products/${_id}`}>
              <Subtitle size="small">{name}</Subtitle>
            </Link>
            <Subtext size="small">{`Size: ${productSize.toUpperCase()}`}</Subtext>
            <Text>{`${sizeQ} x ${price} $`}</Text>
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

export default CheckoutItem;
