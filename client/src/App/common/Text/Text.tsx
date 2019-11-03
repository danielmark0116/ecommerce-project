import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  children: React.ReactChild;
  align: 'left' | 'center' | 'right';
  color: 'primary' | 'success' | 'danger' | 'warning';
  size: 'normal' | 'small';
}

const Text = (props: IProps) => {
  const { children, align, color, size } = props;

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

  const colorClass = () => {
    switch (color) {
      case 'primary':
        return '';
      case 'success':
        return style.text_success;
      case 'danger':
        return style.text_danger;
      case 'warning':
        return style.text_warning;
      default:
        return '';
    }
  };

  const sizeClass = () => {
    switch (size) {
      case 'normal':
        return style.text_normal;
      case 'small':
        return style.text_small;
      default:
        return style.text_normal;
    }
  };

  return (
    <p className={`${sizeClass()} ${alignClass()} ${colorClass()}`}>
      {children}
    </p>
  );
};

Text.defaultProps = {
  align: 'left',
  color: 'primary',
  size: 'normal'
};

export default Text;
