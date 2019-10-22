import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  children: React.ReactChild;
  align: 'left' | 'right' | 'center';
  transform: 'uppercase' | 'none';
  size: 'large' | 'small';
}

const Subtitle = (props: IProps) => {
  const { children, align, transform, size } = props;

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
    <h2
      className={`${style.subtitle} ${
        size === 'small' ? style.subtitle_small : ''
      } ${alignClass()}`}
    >
      {children}
    </h2>
  );
};

Subtitle.defaultProps = {
  align: 'left',
  transform: 'none',
  size: 'large'
};

export default Subtitle;
