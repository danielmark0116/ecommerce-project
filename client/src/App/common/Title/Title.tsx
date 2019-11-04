import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  children: React.ReactChild;
  align: 'left' | 'center' | 'right' | 'paragraph';
  size: 'small' | 'large';
}

const Title = (props: IProps) => {
  const { children, align, size } = props;

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

  return <h1 className={`${sizeClass()} ${alignClass()}`}>{children}</h1>;
};

Title.defaultProps = {
  align: 'left',
  size: 'large'
};

export default Title;
