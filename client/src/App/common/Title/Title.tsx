import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  children: React.ReactChild;
  align: 'left' | 'center' | 'right';
}

const Title = (props: IProps) => {
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

  return <h1 className={`${style.title} ${alignClass()}`}>{children}</h1>;
};

Title.defaultProps = {
  align: 'left'
};

export default Title;
