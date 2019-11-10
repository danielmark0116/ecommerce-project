import React from 'react';

import style from '../../styles/main.module.scss';
import { sizeData } from '../../types/sizeData';

import { checkAvailableSizes } from '../../helpers/availableSizes';

interface IProps {
  pic: string;
  category: string;
  ribbon: string;
  sizes: sizeData;
  imageSize: 'small' | 'normal';
}

const ProductImage = (props: IProps) => {
  const { ribbon, category, sizes, imageSize } = props;

  return (
    <div
      className={
        imageSize === 'small' ? style.product_image_small : style.product_image
      }
    >
      <div className={style.product_image_container}>
        <div className={style.product_image_loader}>
          <i className="fas fa-spinner"></i>
        </div>
        <img src={props.pic} alt="" />
      </div>

      <div className={style.product_image_hover_card}>
        <p>
          {imageSize === 'small' ? 'Sizes: ' : 'Available sizes: '}
          {checkAvailableSizes(sizes).length === 0
            ? 'SOLD OUT'
            : checkAvailableSizes(sizes).map((size, index) => (
                <span key={index}>
                  {index !== 0 ? ' | ' : ''}
                  {size && size.toUpperCase()}
                </span>
              ))}
        </p>
      </div>

      <div className={style.product_ribbon}>
        {checkAvailableSizes(sizes).length === 0 ? 'SOLD OUT' : ribbon}
      </div>

      {props.category && (
        <div className={style.product_category}>{category}</div>
      )}
    </div>
  );
};

ProductImage.defaultProps = {
  category: '',
  ribbon: '',
  imageSize: 'normal'
};

export default ProductImage;
