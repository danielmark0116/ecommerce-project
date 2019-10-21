import React from 'react';

import ProductImage from '../ProductImage/ProductImage';

import style from '../../styles/main.module.scss';
import { productData } from '../../types/productData';

interface IProps {
  productData: productData;
}

const ProductCard = (props: IProps) => {
  const { name, sex, img, category, price, ribbon } = props.productData;

  return (
    <div className={style.product_card_container}>
      <ProductImage
        pic={img}
        category={category}
        ribbon={ribbon}
      ></ProductImage>
      <br />
      <div className={style.product_title}>
        <a href="">
          {`${name}`}
          <span>({sex})</span>
        </a>
      </div>
      <div className={style.product_more}>Click for details</div>
      <div className={style.product_price}>{price} $</div>
    </div>
  );
};

export default ProductCard;
