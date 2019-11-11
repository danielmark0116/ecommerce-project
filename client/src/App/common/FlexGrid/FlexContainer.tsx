import React, { useState } from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  children: React.ReactChild;
  fixedWidth: Boolean;
  horizontalScroll: Boolean;
  scrollOnlyPhones: Boolean;
}

const FlexContainer = (props: IProps) => {
  const { children, fixedWidth, horizontalScroll, scrollOnlyPhones } = props;
  const [mouseDown, toggleMouseDown] = useState(false);
  const [initClickPosition, setInitClickPosition] = useState(0);
  const [initScroll, setInitScroll] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [disableChildren, toggleDisableChildren] = useState(false);

  const scrollRef = React.createRef<HTMLDivElement>();

  const handleMouseMove = (e: any) => {
    e.preventDefault();

    if (initClickPosition !== initScroll && mouseDown) {
      toggleDisableChildren(true);
    } else {
      toggleDisableChildren(false);
    }

    if (mouseDown && (horizontalScroll || scrollOnlyPhones)) {
      if (scrollRef.current) {
        let scrollValue = -(scrollX + e.clientX - initScroll) * 1.3;
        const scrollRefWidth = scrollRef.current.offsetWidth;

        if (scrollValue > scrollRefWidth) {
          scrollValue = scrollRefWidth;
        } else if (scrollValue < 0) {
          scrollValue = 0;
        }

        scrollRef.current.scroll({
          left: scrollValue
        });

        scrollValue < scrollRefWidth &&
          scrollValue > 0 &&
          setScrollX(scrollX + e.clientX - initScroll);
        scrollValue < scrollRefWidth &&
          scrollValue > 0 &&
          setInitScroll(e.clientX);
      }
    }
  };

  return (
    <div
      ref={scrollRef}
      onMouseDown={(e: any) => {
        toggleMouseDown(true);
        setInitScroll(e.clientX);
        setInitClickPosition(e.clientX);
      }}
      onMouseLeave={() => {
        toggleMouseDown(false);
        toggleDisableChildren(false);
      }}
      onMouseUp={() => {
        toggleMouseDown(false);
        toggleDisableChildren(false);
      }}
      onMouseMove={(e: any) => {
        handleMouseMove(e);
        if (!mouseDown && disableChildren) {
          toggleDisableChildren(false);
        }
      }}
      className={`${disableChildren ? style.drag_hold_mode : ''} ${
        disableChildren ? style.disable_children : ''
      } ${style.flex_container} ${fixedWidth ? style.flex_fixed_width : ''} ${
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
