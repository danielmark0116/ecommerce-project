import React from 'react';
import { Link } from 'react-router-dom';

import ProductImage from '../ProductImage/ProductImage';

import style from '../../styles/main.module.scss';
import { productData } from '../../types/productData';

interface IProps {
  productData: productData;
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
    size
  } = props.productData;

  return (
    <div className={style.product_card_container}>
      <Link to={`/products/${_id}`}>
        <ProductImage
          sizes={size}
          pic={img}
          category={category}
          ribbon={ribbon}
        />
      </Link>
      <br />
      <div className={style.product_title}>
        <Link to={`/products/${_id}`}>
          {`${name}`}
          <span>({sex})</span>
        </Link>
      </div>
      <Link to={`/products/${_id}`}>
        <div className={style.product_more}>Click for details</div>
        <div className={style.product_price}>{price} $</div>
      </Link>
    </div>
  );
};

export default ProductCard;
