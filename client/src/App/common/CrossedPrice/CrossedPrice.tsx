import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  children: string;
  align: 'left' | 'center' | 'right';
}

const CrossedPrice = (props: IProps) => {
  const { children, align } = props;

  const alignClass = () => {
    switch (align) {
      case 'left':
        return style.text_left;
      case 'center':
        return style.text_center;
      case 'right':
        return style.text_right;
      default:
        return style.text_left;
    }
  };

  return (
    <div>
      <p className={`${style.crossed_price} ${alignClass()}`}>{children}</p>
    </div>
  );
};

CrossedPrice.defaultProps = {
  align: 'left'
};

export default CrossedPrice;
