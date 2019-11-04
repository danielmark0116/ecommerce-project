import React, { Fragment, useState, useEffect } from 'react';

import Checkbox from '../../common/Checkbox/Checkbox';

import { triggerFiltersContainer } from '../../animations/filters';

import style from '../../styles/main.module.scss';

const iniFiltersState = {
  category: '',
  sex: '',
  sort: ''
};

interface IProps {
  sexValues: string[];
  categoryValues: string[];
  applyFilters: Function;
}

const ProductFilters = (props: IProps) => {
  const [filtersState, setFilters] = useState(iniFiltersState);

  const mobileFiltersRef = React.createRef<HTMLDivElement>();

  const changeFilters = (fieldName: string, fieldValue: string) => {
    setFilters({ ...filtersState, [fieldName]: fieldValue });
  };

  const applyFilters = () => {
    const { applyFilters } = props;
    applyFilters(filtersState);
  };

  useEffect(() => {
    props.applyFilters(filtersState);
  }, [filtersState]);

  const filters = () => {
    const { sexValues, categoryValues } = props;

    return (
      <Fragment>
        <Checkbox
          action={changeFilters}
          label="Sort by"
          category="sort"
          inputs={[
            'latest',
            'oldest',
            'priciest',
            'cheapest',
            'a - z',
            'z - a'
          ]}
        />
        <Checkbox
          action={changeFilters}
          label="Category"
          category="category"
          inputs={['all', ...categoryValues]}
        />
        <Checkbox
          action={changeFilters}
          label="Sex"
          category="sex"
          inputs={['all', ...sexValues]}
        />
      </Fragment>
    );
  };

  return (
    <div className={style.product_filters_container}>
      <button
        className={style.mobile_only}
        onClick={() => {
          triggerFiltersContainer(mobileFiltersRef.current, true);
        }}
      >
        Filters
      </button>
      <div ref={mobileFiltersRef} className={style.filters_box}>
        <button
          className={style.mobile_filters_close_button}
          onClick={() => {
            triggerFiltersContainer(mobileFiltersRef.current, false);
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
