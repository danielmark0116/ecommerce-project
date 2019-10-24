import React, { useEffect, Fragment } from 'react';

import style from '../../styles/main.module.scss';

import { toggleLoginBox, toggleOverlay } from '../../animations/login_box';

interface IProps {
  children?: React.ReactChild;
  active: Boolean;
  closeAction: Function;
}

const LoginBox = (props: IProps) => {
  const { children, active, closeAction } = props;
  const loginBoxRef = React.createRef<HTMLDivElement>();
  const overlayRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    toggleLoginBox(loginBoxRef.current, active);
    toggleOverlay(overlayRef.current, active);
  }, [active]);

  return (
    <Fragment>
      <div ref={overlayRef} className={style.login_box_overlay}></div>
      <div ref={loginBoxRef} className={style.login_box}>
        <div onClick={() => closeAction()} className={style.login_box_close} />
        asdsad
      </div>
    </Fragment>
  );
};

export default LoginBox;
