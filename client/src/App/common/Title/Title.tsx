import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  children: React.ReactChild;
  align: 'left' | 'center' | 'right' | 'paragraph';
  size: 'small' | 'large';
  color: 'primary' | 'success' | 'danger' | 'warning' | 'white';
}

const Title = (props: IProps) => {
  const { children, align, size, color } = props;

  const alignClass = () => {
    switch (align) {
      case 'left':
        return style.text_left;
      case 'center':
        return style.text_center;
      case 'right':
        return style.text_right;
      case 'paragraph':
        return style.text_paragraph;
      default:
        return style.text_left;
    }
  };

  const sizeClass = () => {
    switch (size) {
      case 'small':
        return style.title_small;
      case 'large':
        return style.title_large;
      default:
        return style.title_large;
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
    <h1 className={`${sizeClass()} ${alignClass()} ${colorClass()}`}>
      {children}
    </h1>
  );
};

Title.defaultProps = {
  align: 'left',
  size: 'large',
  color: 'primary'
};

export default Title;
