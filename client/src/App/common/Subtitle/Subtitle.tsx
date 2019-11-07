import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  children: React.ReactChild;
  align: 'left' | 'right' | 'center';
  transform: 'uppercase' | 'none';
  size: 'large' | 'small';
  color: 'primary' | 'success' | 'danger' | 'warning' | 'white';
}

const Subtitle = (props: IProps) => {
  const { children, align, transform, size, color } = props;

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
      case 'white':
        return style.text_white;
      default:
        return '';
    }
  };

  return (
    <h2
      className={`${style.subtitle} ${
        size === 'small' ? style.subtitle_small : ''
      } ${alignClass()} ${colorClass()}`}
    >
      {children}
    </h2>
  );
};

Subtitle.defaultProps = {
  align: 'left',
  transform: 'none',
  size: 'large',
  color: 'primary'
};

export default Subtitle;
