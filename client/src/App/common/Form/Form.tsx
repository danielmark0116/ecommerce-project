import React, { Component, Fragment } from 'react';
import _ from 'lodash';

import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';

import style from '../../styles/main.module.scss';

interface IProps {
  inputs: {
    extended: Boolean;
    label: string;
    placeholder: string;
    fieldName: string;
    fieldValue: string;
    onChange: Function;
    validateRegex: RegExp;
    errorMsg: string;
  }[];
  onSubmit: Function;
  submitBtnText: string;
}

interface IState {
  inputsData: {
    extended: Boolean;
    label: string;
    placeholder: string;
    fieldName: string;
    fieldValue: string;
    onChange: Function;
    validateRegex: RegExp;
    fieldError?: Boolean;
    errorMsg: string;
  }[];
  submitTrigger: Boolean;
}

export default class Form extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      inputsData: props.inputs,
      submitTrigger: false
    };
  }

  handleInputs = (
    e: React.FocusEvent<HTMLInputElement>,
    index: number,
    regex: RegExp
  ) => {
    const { inputsData, submitTrigger } = this.state;

    submitTrigger && this.setState({ submitTrigger: false });

    this.setState({
      inputsData: inputsData.map((input, inputIndex) => {
        if (inputIndex === index)
          return {
            ...input,
            fieldValue: e.target.value,
            fieldError: regex.test(e.target.value) ? false : true
          };
        return {
          ...input
        };
      })
    });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { inputsData } = this.state;

    const formOutput = inputsData.map(input => ({
      value: _.get(input, 'fieldValue'),
      name: _.get(input, 'fieldName'),
      error: _.get(input, 'fieldError')
    }));

    this.setState({
      submitTrigger: true
    });

    if (
      !_.some(formOutput, ['error', true]) &&
      !_.some(formOutput, ['value', ''])
    ) {
      const formToSubmit = inputsData.map(input => ({
        [_.get(input, 'fieldName')]: _.get(input, 'fieldValue')
      }));
      this.props.onSubmit(formToSubmit);
    }
  };

  render() {
    const { inputs, submitBtnText } = this.props;
    const { inputsData, submitTrigger } = this.state;

    return (
      <Fragment>
        <form
          onSubmit={e => this.handleSubmit(e)}
          className={style.custom_form_container}
        >
          {inputs.map((input, index) => (
            <div key={index} className={style.form_field}>
              <TextInput
                error={
                  submitTrigger &&
                  (inputsData[index].fieldValue.length === 0 ||
                    !input.validateRegex.test(inputsData[index].fieldValue)) &&
                  true
                }
                key={index}
                placeholder={input.placeholder}
                fieldName={input.fieldName}
                fieldValue={inputsData[index].fieldValue}
                onChange={(e: any) =>
                  this.handleInputs(e, index, input.validateRegex)
                }
                label={input.label}
                extended={input.extended}
                errorMsg={input.errorMsg}
              />
            </div>
          ))}
          <Button type="primary" submitType={true}>
            {submitBtnText}
          </Button>
        </form>
      </Fragment>
    );
  }
}
