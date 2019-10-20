import React, { Fragment } from 'react';

import { animateCheckBox } from '../../animations/checkbox';

import Subtitle from '../../common/Subtitle/Subtitle';

import style from '../../styles/main.module.scss';

interface IProps {
  action: Function;
  category: string;
  label: string;
  inputs: string[];
}

const Checkbox = (props: IProps) => {
  const { inputs, action, category, label } = props;

  const nodes: any[] = [];

  const handleCheckBoxClick = (index: number) => {
    animateCheckBox(nodes, index);
  };

  return (
    <Fragment>
      <Subtitle size="small" transform="none" align="center">
        {label}
      </Subtitle>
      <div className={style.checkbox_container}>
        <br />

        {inputs.map((input, index) => (
          <div
            key={index}
            className={style.checkbox}
            onClick={() => {
              action(category, input);
              handleCheckBoxClick(index);
            }}
          >
            <div
              ref={ref => nodes.push(ref)}
              className={style.checkbox_box}
            ></div>
            <div className={style.checkbox_label}>{input}</div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Checkbox;
