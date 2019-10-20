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

  const styles = { textAlign: align, textTransform: transform };

  return (
    <h2
      className={`${style.subtitle} ${
        size === 'small' ? style.subtitle_small : ''
      }`}
      style={styles}
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
