import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import Image from '../../common/Image/Image';
import Title from '../../common/Title/Title';
import CartPill from '../CartPill/CartPill';
import Subtitle from '../../common/Subtitle/Subtitle';
import Subtext from '../../common/Subtext/Subtext';
import Text from '../../common/Text/Text';
import Flex from '../../common/FlexGrid/FlexContainer';
import SizeBtns from './SizeBtns';
import Loader from '../../common/Loader/Loader';
import SizedBox from '../../common/SizedBox/SizedBox';
import Error from '../../common/Error/Error';
import CrossedPrice from '../../common/CrossedPrice/CrossedPrice';

import ProductsList from '../ProductsList/ProductsListContainer';

import _ from 'lodash';

import { fadeInUp } from '../../animations/fades';

import { checkAvailableSizes } from '../../helpers/availableSizes';
import { saveToLocalStore } from '../../helpers/cart';

import { stateToProps, dispatchToProps } from './ProductDetailsContainer';
import { RouteComponentProps } from 'react-router';

interface RouteProps {
  id: string;
}

type Props = stateToProps & dispatchToProps & RouteComponentProps<RouteProps>;

const ProductDetails = (props: Props) => {
  const { productId, singleProduct, getProductById, match } = props;
  const { pending, success, error } = props.singleProductRequestData;

  const [valueInCart, updateValueInCart] = useState(0);
  const [valueInCartRetrigger, updateValueInCartRetrigger] = useState(false);

  const imageRef = React.createRef<HTMLElement>();
  const descRef = React.createRef<HTMLElement>();

  const actualPrice = singleProduct
    ? singleProduct.salePrice > 0
      ? singleProduct.salePrice
      : singleProduct.price
    : 0;

  useEffect(() => {
    getProductById(productId);
  }, [match.params.id]);

  useEffect(() => {
    if (singleProduct && success && singleProduct.published) {
      fadeInUp(imageRef.current, 1);
      fadeInUp(descRef.current, 3);
    }
  }, [singleProduct, success]);

  const addToCart = (productSize: string, quantity: number) => {
    const { singleProduct } = props;

    saveToLocalStore(
      singleProduct ? singleProduct._id : '',
      productSize,
      quantity
    );
  };

  const renderNoSuchProduct = () => {
    return (
      <Text color="warning" align="center">
        No such product available
      </Text>
    );
  };

  const renderProductDetails = () => {
    if (singleProduct && singleProduct.published) {
      return (
        <Fragment>
          <Row>
            <Col md="12" xl="5">
              <section ref={imageRef}>
                <Image
                  ribbon={(singleProduct && singleProduct.ribbon) || ''}
                  picString={(singleProduct && singleProduct.img) || ''}
                />
              </section>
            </Col>
            <Col md="12" xl="7">
              <section ref={descRef}>
                <Title size="small">
                  {(singleProduct && singleProduct.name) || ''}
                </Title>
                <Subtext size="small">
                  <Fragment>
                    {(singleProduct && singleProduct.sex) || ''}
                    {' | '}
                    {(singleProduct && singleProduct.category) || ''}
                  </Fragment>
                </Subtext>
                <Flex>
                  <Fragment>
                    <Title size="small">
                      <Fragment>{actualPrice} $</Fragment>
                    </Title>
                    {singleProduct && singleProduct.salePrice > 0 && (
                      <CrossedPrice>
                        {(singleProduct &&
                          singleProduct.price.toString() + ' $') ||
                          ''}
                      </CrossedPrice>
                    )}
                  </Fragment>
                </Flex>
                <Text>{(singleProduct && singleProduct.desc) || ''}</Text>
                <br />
                <Row>
                  <Col xl="6" sm="12">
                    <Subtitle size="small">Available sizes:</Subtitle>
                    <Text>
                      <Fragment>
                        {checkAvailableSizes(
                          singleProduct && singleProduct.size
                        ).length === 0
                          ? 'SOLD OUT'
                          : checkAvailableSizes(
                              singleProduct && singleProduct.size
                            ).map((size, index) => (
                              <span key={index}>
                                {index !== 0 ? '  |  ' : ''}
                                {size && size.toUpperCase()}
                              </span>
                            ))}
                      </Fragment>
                    </Text>
                  </Col>
                  <Col xl="6" sm="12">
                    <CartPill
                      retrigger={valueInCartRetrigger}
                      quantity={valueInCart}
                    ></CartPill>
                  </Col>
                </Row>
                <br />
                <Subtitle size="small" align="center">
                  Choose a size:
                </Subtitle>
                {checkAvailableSizes(singleProduct && singleProduct.size)
                  .length === 0 ? (
                  <Fragment>
                    <Text align="center" color="danger">
                      SOLD OUT
                    </Text>
                    <Text align="center" color="primary">
                      We will re-stock shortly. Give us a week or two
                    </Text>
                  </Fragment>
                ) : (
                  <SizeBtns
                    callback={(data: number) => {
                      updateValueInCart(data);

                      if (valueInCart === data) {
                        updateValueInCartRetrigger(!valueInCartRetrigger);
                      }
                    }}
                    productId={singleProduct ? singleProduct._id : ''}
                    action={addToCart}
                    allSizes={singleProduct && singleProduct.size}
                    sizes={checkAvailableSizes(
                      singleProduct && singleProduct.size
                    )}
                  />
                )}
              </section>
            </Col>
          </Row>
          <SizedBox></SizedBox>
          <Title align="paragraph" size="small">
            Similar products
          </Title>
          <ProductsList
            productCardsSize="small"
            fixedWidth={true}
            horizontalScroll={true}
            scrollOnlyPhones={false}
            withFilters={false}
            pagination={false}
            itemsPerPage={5}
            initFiltrString={`sort=sold-1&category=${singleProduct &&
              singleProduct.category}`}
            fetchAll={false}
            productsState="similar"
          />

          <Title align="paragraph" size="small">
            Our bestsellers
          </Title>
          <ProductsList
            productCardsSize="small"
            fixedWidth={true}
            horizontalScroll={true}
            scrollOnlyPhones={false}
            withFilters={false}
            pagination={false}
            itemsPerPage={5}
            initFiltrString="sort=sold-1"
            fetchAll={false}
            productsState="bestsellers"
          />
        </Fragment>
      );
    } else {
      return renderNoSuchProduct();
    }
  };

  if (pending) return <Loader></Loader>;
  if (success && singleProduct !== null) return renderProductDetails();
  if (singleProduct === null && success) return renderNoSuchProduct();
  if (error) return <Error />;
  return <Loader />;
};

export default withRouter(ProductDetails);
