import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  pic: string;
  category: string;
  ribbon: string;
}

const ProductImage = (props: IProps) => {
  return (
    <div className={style.product_image}>
      <div className={style.product_image_container}>
        <img src={props.pic} alt="" />
      </div>

      <div className={style.product_image_hover_card}>
        <p>Available sizes: S | M | L | XL</p>
      </div>

      {props.ribbon && (
        <div className={style.product_ribbon}>{props.ribbon}</div>
      )}

      {props.category && (
        <div className={style.product_category}>{props.category}</div>
      )}
    </div>
  );
};

ProductImage.defaultProps = {
  category: '',
  ribbon: ''
};

export default ProductImage;
