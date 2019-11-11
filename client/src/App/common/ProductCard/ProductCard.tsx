import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import ProductImage from '../ProductImage/ProductImage';
import CrossedPrice from '../../common/CrossedPrice/CrossedPrice';
import Flex from '../../common/FlexGrid/FlexContainer';

import style from '../../styles/main.module.scss';

import { fadeInUp } from '../../animations/fades';

import { productData } from '../../types/productData';

interface IProps {
  productData: productData;
  cardSize: 'small' | 'normal';
  cardIndex: number;
}

const ProductCard = (props: IProps) => {
  const {
    name,
    sex,
    img,
    category,
    price,
    ribbon,
    _id,
    size,
    salePrice
  } = props.productData;

  const cardRef = React.createRef<HTMLDivElement>();

  const { cardSize, cardIndex } = props;

  useEffect(() => {
    fadeInUp(cardRef.current, cardIndex);
  }, ['']);

  return (
    <div
      draggable={false}
      ref={cardRef}
      className={style.product_card_container}
    >
      <Link to={`/products/${_id}`}>
        <ProductImage
          imageSize={cardSize}
          sizes={size}
          pic={img}
          category={category}
          ribbon={ribbon}
          sale={salePrice !== 0 ? true : false}
        />
      </Link>
      <br />
      <div className={style.product_title}>
        <Link to={`/products/${_id}`}>
          {`${name}`}
          <br />
          <span>({sex})</span>
        </Link>
      </div>
      <Link to={`/products/${_id}`}>
        <Flex>
          <Fragment>
            <div className={style.product_price}>
              {salePrice !== 0 ? salePrice : price} $
            </div>
            {salePrice !== 0 && <CrossedPrice>{`${price} $`}</CrossedPrice>}
          </Fragment>
        </Flex>
      </Link>
    </div>
  );
};

ProductCard.defaultProps = {
  cardSize: 'normal',
  cardIndex: 0
};

export default ProductCard;
