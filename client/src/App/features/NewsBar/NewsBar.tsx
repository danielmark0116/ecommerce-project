import React from 'react';
import { connect } from 'react-redux';

import style from '../../styles/main.module.scss';
import { AppState } from '../../reducers';
import { selectorGeneralsNewsBarText } from '../../reducers/generalsReducer';

const NewsBar = (props: stateToProps) => {
  const { newsBarText } = props;

  return (
    <div className={style.news_bar_container}>
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
