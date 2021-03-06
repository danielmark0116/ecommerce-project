import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import style from '../../styles/main.module.scss';

import { animatePillBg, pillBounce } from '../../animations/cart_pill';

interface IProps {
  quantity: number;
  retrigger: Boolean;
}

const CartPill = (props: IProps) => {
  const { quantity, retrigger } = props;
  const [renderedQuantity, reassignQuantity] = useState(quantity);

  const pillRef = React.createRef<HTMLDivElement>();
  const bgPillRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    pillBounce(pillRef.current);
    animatePillBg(bgPillRef.current, () => {
      reassignQuantity(quantity);
    });
  }, [quantity]);

  useEffect(() => {
    pillBounce(pillRef.current);
  }, [retrigger]);

  return (
    <div ref={pillRef} className={style.cart_pill_container}>
      <Link to="/cart">
        <div
          className={
            quantity === 0
              ? style.cart_pill_icon_disabled
              : style.cart_pill_icon
          }
        >
          <i className="fas fa-shopping-cart"></i>
        </div>
        <div ref={bgPillRef} className={style.pill_bg}></div>
        <div className={style.cart_pill_content}>{renderedQuantity}</div>
      </Link>
    </div>
  );
};

CartPill.defaultProps = {
  quantity: 0
};

export default CartPill;
