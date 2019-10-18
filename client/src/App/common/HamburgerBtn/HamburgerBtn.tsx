import React, { useState, useEffect } from 'react';

import { animateHamburger } from '../../animations/hamburger_btn';

import style from '../../styles/main.module.scss';

interface IProps {
  onClick: Function;
  action: Boolean;
}

const HamburgerBtn = (props: IProps) => {
  const [btnActive, toggleBtn] = useState(false);

  const ref1 = React.createRef<HTMLDivElement>();
  const ref2 = React.createRef<HTMLDivElement>();
  const ref3 = React.createRef<HTMLDivElement>();

  useEffect(() => {
    const node1 = ref1.current;
    const node2 = ref2.current;
    const node3 = ref3.current;

    animateHamburger([node1, node2, node3], btnActive);

    props.action ? toggleBtn(true) : toggleBtn(false);
  });

  return (
    <div
      className={style.hamburger_btn_container}
      onClick={() => {
        toggleBtn(!btnActive);
        props.onClick();
      }}
    >
      <div ref={ref1}></div>
      <div ref={ref2}></div>
      <div ref={ref3}></div>
    </div>
  );
};

export default HamburgerBtn;
