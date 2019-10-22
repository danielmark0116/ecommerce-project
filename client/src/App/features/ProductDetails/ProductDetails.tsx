import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import Image from '../../common/Image/Image';
import Title from '../../common/Title/Title';
import Subtitle from '../../common/Subtitle/Subtitle';
import Subtext from '../../common/Subtext/Subtext';
import Text from '../../common/Text/Text';
import SizeBtns from './SizeBtns';

import { checkAvailableSizes } from '../../helpers/availableSizes';
import { saveToLocalStore } from '../../helpers/cart';

import { stateToProps, dispatchToProps } from './ProductDetailsContainer';

type Props = stateToProps & dispatchToProps;

const ProductDetails = (props: Props) => {
  const { productId, singleProduct, getProductById } = props;
  const { pending, success, error } = props.singleProductRequestData;

  useEffect(() => {
    getProductById(productId);
  }, ['']);

  const addToCart = (productSize: string, quantity: number) => {
    const { singleProduct } = props;

    saveToLocalStore(
      singleProduct ? singleProduct._id : '',
      productSize,
      quantity
    );
  };

  const renderProductDetails = () => {
    return (
      <Row>
        <Col md="12" xl="5">
          <Image
            ribbon={(singleProduct && singleProduct.ribbon) || ''}
            picString={(singleProduct && singleProduct.img) || ''}
          />
        </Col>
        <Col md="12" xl="7">
          <Title>{(singleProduct && singleProduct.name) || ''}</Title>
          <Subtext size="small">
            <Fragment>
              {(singleProduct && singleProduct.sex) || ''}
              {' | '}
              {(singleProduct && singleProduct.category) || ''}
            </Fragment>
          </Subtext>
          <Subtitle>
            <Fragment>
              {(singleProduct && singleProduct.price) || ''} $
            </Fragment>
          </Subtitle>
          <Text>{(singleProduct && singleProduct.desc) || ''}</Text>
          <br />
          <Subtitle size="small">Available sizes:</Subtitle>
          <Text>
            <Fragment>
              {checkAvailableSizes(singleProduct && singleProduct.size).map(
                (size, index) => (
                  <span key={index}>
                    {index !== 0 ? '  |  ' : ''}
                    {size && size.toUpperCase()}
                  </span>
                )
              )}
            </Fragment>
          </Text>
          <br />
          <Subtitle size="small" align="center">
            Choose a size:
          </Subtitle>
          <SizeBtns
            action={addToCart}
            sizes={checkAvailableSizes(singleProduct && singleProduct.size)}
          ></SizeBtns>
        </Col>
      </Row>
    );
  };

  if (pending) return <p>loading</p>;
  if (success && singleProduct !== null) return renderProductDetails();
  if (singleProduct === null && success)
    return <p>No such product available</p>;
  if (error) return <p>sth went wrong</p>;
  return <p>loading</p>;
};

export default ProductDetails;
