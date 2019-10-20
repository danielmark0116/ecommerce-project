import React, { Fragment, useState, useEffect } from 'react';

import Checkbox from '../../common/Checkbox/Checkbox';
import Subtitle from '../../common/Subtitle/Subtitle';

import { triggerFiltersContainer } from '../../animations/filters';

import style from '../../styles/main.module.scss';

const iniFiltersState = {
  category: '',
  sex: '',
  date: '',
  name: '',
  price: ''
};

const ProductFilters = () => {
  const [filtersState, setFilters] = useState(iniFiltersState);

  const mobileFiltersRef = React.createRef<HTMLDivElement>();

  const changeFilters = (fieldName: string, fieldValue: string) => {
    setFilters({ ...filtersState, [fieldName]: fieldValue });
  };

  const applyFilters = () => {
    console.log(filtersState);
  };

  const filters = () => {
    return (
      <Fragment>
        <Checkbox
          action={changeFilters}
          label="Category"
          category="category"
          inputs={['t-shirt', 'blouse']}
        />
        <Checkbox
          action={changeFilters}
          label="Sex"
          category="sex"
          inputs={['unisex', 'female', 'male']}
        />
        <Checkbox
          action={changeFilters}
          label="Date"
          category="date"
          inputs={['from latest', 'from oldest']}
        />
        <Checkbox
          action={changeFilters}
          label="Name"
          category="name"
          inputs={['a - z', 'z - a']}
        />
        <Checkbox
          action={changeFilters}
          label="Price"
          category="price"
          inputs={['from highest', 'from lowest']}
        />
        <br />
        <br />
        <button
          onClick={() => {
            applyFilters();
          }}
        >
          apply
        </button>
      </Fragment>
    );
  };

  return (
    <div className={style.product_filters_container}>
      <button
        className={style.mobile_only}
        onClick={() => {
          triggerFiltersContainer(mobileFiltersRef.current, true);
          //   setFilters(iniFiltersState);
        }}
      >
        Filters
      </button>
      <div className={style.desktop_filters}>{filters()}</div>
      <div ref={mobileFiltersRef} className={style.mobile_filters}>
        <button
          className={style.mobile_filters_close_button}
          onClick={() => {
            triggerFiltersContainer(mobileFiltersRef.current, false);
            // setFilters(iniFiltersState);
          }}
        >
          CLOSE X
        </button>
        {filters()}
      </div>
    </div>
  );
};

export default ProductFilters;
