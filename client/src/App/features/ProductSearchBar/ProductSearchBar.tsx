import React, { Fragment } from 'react';

import Form from '../../common/Form/Form';

import style from '../../styles/main.module.scss';

interface IProps {
  submitForm: Function;
}

const ProductSearchBar = (props: IProps) => {
  const { submitForm } = props;

  return (
    <Fragment>
      <form
        onSubmit={e => {
          //
        }}
        className={style.custom_form_container}
      >
        <div className={style.form_field}>{/* input */}</div>
      </form>
      <Form
        onSubmit={(data: any) => {
          submitForm(data.title);
        }}
        cancelBtnText=""
        onCancel={() => null}
        submitBtnText=""
        inputs={[
          {
            errorMsg: '',
            extended: false,
            fieldName: 'title',
            fieldValue: '',
            label: '',
            placeholder: 'Search by name',
            validateRegex: /&*/i,
            onChange: () => null
          }
        ]}
      />
    </Fragment>
  );
};

export default ProductSearchBar;
