import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  children: React.ReactChild;
  fixedWidth: Boolean;
  horizontalScroll: Boolean;
  scrollOnlyPhones: Boolean;
}

const FlexContainer = (props: IProps) => {
  const { children, fixedWidth, horizontalScroll, scrollOnlyPhones } = props;

  return (
    <div
      className={`${style.flex_container} ${
        fixedWidth ? style.flex_fixed_width : ''
      } ${
        horizontalScroll
          ? scrollOnlyPhones
            ? style.flex_horizontal_scroll_phones
            : style.flex_horizontal_scroll
          : ''
      }`}
    >
      {children}
    </div>
  );
};

FlexContainer.defaultProps = {
  fixedWidth: true,
  horizontalScroll: false,
  scrollOnlyPhones: true
};

export default FlexContainer;
