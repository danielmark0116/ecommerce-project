import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  children: React.ReactChild;
  size: 'small' | 'normal';
  align: 'left' | 'center' | 'right';
  uppercase: Boolean;
}

const Subtext = (props: IProps) => {
  const { children, size, align, uppercase } = props;

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

  const transformClass = () => {
    switch (uppercase) {
      case true:
        return style.text_uppercase;
      case false:
        return style.text_nonuppercase;
      default:
        return style.text_uppercase;
    }
  };

  return (
    <h1 className={`${sizeClass()} ${alignClass()} ${transformClass()}`}>
      {children}
    </h1>
  );
};

Subtext.defaultProps = {
  size: 'normal',
  align: 'left',
  uppercase: true
};

export default Subtext;
