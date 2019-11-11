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
  const [scrollValue, setScrollValue] = useState(0);

  const scrollRef = React.createRef<HTMLDivElement>();

  const handleMouseMove = (e: any) => {
    e.preventDefault();

    if (initClickPosition !== initScroll && mouseDown) {
      toggleDisableChildren(true);
    }

    if (mouseDown && (horizontalScroll || scrollOnlyPhones)) {
      if (scrollRef.current) {
        const checkScroll = -(scrollX + e.clientX - initScroll);
        const scrollRefWidth = scrollRef.current.scrollWidth;

        if (checkScroll < scrollRefWidth - window.innerWidth + 100) {
          setScrollValue(-(scrollX + e.clientX - initScroll));

          setScrollX(scrollX + e.clientX - initScroll);
          setInitScroll(e.clientX);
        }

        scrollRef.current.scrollLeft = scrollValue;
      }
    }
  };

  const resetOverflowingScrollValue = () => {
    if (scrollValue < 0) {
      setScrollValue(0);
      setInitScroll(0);
      setScrollX(0);
      setInitClickPosition(0);
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
        resetOverflowingScrollValue();
      }}
      onMouseUp={() => {
        toggleMouseDown(false);
        toggleDisableChildren(false);
        resetOverflowingScrollValue();
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
