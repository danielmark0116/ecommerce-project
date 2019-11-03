import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import style from '../../styles/main.module.scss';

import { fadeInDown } from '../../animations/fades';

import { AppState } from '../../reducers';
import { selectorGeneralsNewsBarText } from '../../reducers/generalsReducer';

const NewsBar = (props: stateToProps) => {
  const { newsBarText } = props;

  const barRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    fadeInDown(barRef.current);
  }, ['']);

  return (
    <div ref={barRef} className={style.news_bar_container}>
      <div className={style.news_bar_text_container}>
        <p>{newsBarText}</p>
      </div>
    </div>
  );
};

interface stateToProps {
  newsBarText: string;
}

const mapStateToProps = (state: AppState) => ({
  newsBarText: selectorGeneralsNewsBarText(state)
});

export default connect(mapStateToProps)(NewsBar);
