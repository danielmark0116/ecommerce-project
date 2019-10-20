import React from 'react';

import ProductImage from '../ProductImage/ProductImage';

import style from '../../styles/main.module.scss';

interface IProps {}

const ProductCard = () => {
  return (
    <div className={style.product_card_container}>
      <ProductImage
        pic={'https://s0.house.pl/media/catalog/product/W/A/WA960-99X-001.jpg'}
        category="blouse"
        ribbon="new"
      ></ProductImage>
      <br />
      <div className={style.product_title}>
        <a href="">
          Dark Blouse <span>(male)</span>
        </a>
      </div>
      <div className={style.product_more}>Click for details</div>
      <div className={style.product_price}>19.99 $</div>
    </div>
  );
};

export default ProductCard;
