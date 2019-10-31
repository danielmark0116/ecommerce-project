import React, { Fragment } from 'react';
import _ from 'lodash';

import Form from '../../common/Form/Form';
import { couponsData } from '../../types/couponsData';

interface IProps {
  coupons: couponsData;
  action: Function;
}

const CouponInput = (props: IProps) => {
  const { coupons, action } = props;

  return (
    <Fragment>
      <Form
        buttonType="secondary"
        submitBtnText="Apply"
        onSubmit={(data: any) => {
          const appliedCoupon = _.find(coupons, o => o.code === data.code);
          const couponName = _.get(appliedCoupon, 'name');
          const couponValue = _.get(appliedCoupon, 'value');
          const couponCode = _.get(appliedCoupon, 'code');

          action(couponName, couponValue);
          sessionStorage.setItem('discountCode', JSON.stringify(couponCode));
        }}
        inputs={[
          {
            extended: false,
            label: '',
            placeholder: 'Enter code',
            fieldName: 'code',
            fieldValue: '',
            onChange: () => null,
            validateRegex: new RegExp(
              ['^', ..._.map(coupons, 'code'), '&'].join('$|^'),
              'g'
            ),
            errorMsg: 'Invalid code'
          }
        ]}
      />
    </Fragment>
  );
};

export default CouponInput;
