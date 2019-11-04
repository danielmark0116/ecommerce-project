import React, { Fragment, useState } from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  submitForm: Function;
}

const ProductSearchBar = (props: IProps) => {
  const { submitForm } = props;

  const [inputValue, handleInput] = useState('');

  return (
    <Fragment>
      <form
        onSubmit={e => {
          e.preventDefault();
          submitForm(inputValue);
        }}
        className={style.custom_form_container}
      >
        <div className={style.search_bar_container}>
          <div className={style.search_bar_input}>
            <input
              type="text"
              name="search"
              id="search-bar"
              value={inputValue}
              placeholder="Search by name"
              onChange={e => {
                handleInput(e.target.value);
              }}
              autoComplete="off"
            />
            <button type="submit" className={style.search_bar_btn}>
              SEARCH
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default ProductSearchBar;
