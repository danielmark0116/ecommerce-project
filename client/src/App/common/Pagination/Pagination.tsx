import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  numberOfPages: number;
  activePage: number;
  action: Function;
}

const Pagination = (props: IProps) => {
  const { numberOfPages, activePage, action } = props;

  return (
    <div className={style.pagination_container}>
      {activePage > 1 && (
        <button
          onClick={() => action(activePage - 1)}
          className={`${style.pagination_button} `}
        >
          &#x2190;
        </button>
      )}
      {[...Array(numberOfPages)].map((page, index) => (
        <button
          key={index}
          onClick={() => action(index + 1)}
          className={`${style.pagination_button} ${
            activePage === index + 1 ? style.pagination_button_active : ''
          }`}
        >
          {index + 1}
        </button>
      ))}
      {activePage < numberOfPages && (
        <button
          onClick={() => action(activePage + 1)}
          className={`${style.pagination_button} `}
        >
          &#x2192;
        </button>
      )}
    </div>
  );
};

export default Pagination;
