import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  children: React.ReactChild;
  size: 'small' | 'normal';
  align: 'left' | 'center' | 'right';
}

const Subtext = (props: IProps) => {
  const { children, size, align } = props;

  const sizeClass = () => {
    switch (size) {
      case 'small':
        return style.sub_text_small;
      case 'normal':
        return style.sub_text_normal;
      default:
        return style.sub_text_normal;
    }
  };

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

  return <h1 className={`${sizeClass()} ${alignClass()}`}>{children}</h1>;
};

Subtext.defaultProps = {
  size: 'normal',
  align: 'left'
};

export default Subtext;
