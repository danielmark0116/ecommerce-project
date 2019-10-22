import React from 'react';

import style from '../../styles/main.module.scss';
import { sizeData } from '../../types/sizeData';

import { checkAvailableSizes } from '../../helpers/availableSizes';

interface IProps {
  pic: string;
  category: string;
  ribbon: string;
  sizes: sizeData;
}

const ProductImage = (props: IProps) => {
  const { ribbon, category, sizes } = props;

  return (
    <div className={style.product_image}>
      <div className={style.product_image_container}>
        <img src={props.pic} alt="" />
      </div>

      <div className={style.product_image_hover_card}>
        <p>
          Available sizes:{' '}
          {checkAvailableSizes(sizes).map((size, index) => (
            <span key={index}>
              {index !== 0 ? ' | ' : ''}
              {size && size.toUpperCase()}
            </span>
          ))}
        </p>
      </div>

      {props.ribbon && <div className={style.product_ribbon}>{ribbon}</div>}

      {props.category && (
        <div className={style.product_category}>{category}</div>
      )}
    </div>
  );
};

ProductImage.defaultProps = {
  category: '',
  ribbon: ''
};

export default ProductImage;
