import React, { Component, Fragment } from 'react';
import _ from 'lodash';

import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';

import style from '../../styles/main.module.scss';
import { Input } from 'reactstrap';

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
  onCancel: Function;
  submitBtnText: string;
  cancelBtnText: string;
  buttonType: 'primary' | 'secondary' | 'transparent';
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
    fieldError: Boolean;
    errorMsg: string;
  }[];
  submitTrigger: Boolean;
}

export default class Form extends Component<IProps, IState> {
  static defaultProps = {
    buttonType: 'primary',
    onCancel: () => null,
    cancelBtnText: ''
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      inputsData: props.inputs.map(input => ({
        ...input,
        fieldError: input.validateRegex.test(input.fieldValue) ? false : true
      })),
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

      this.props.onSubmit(
        formToSubmit.reduce((obj: any, item: any, index: number) => ({
          ...obj,
          [Object.keys(item)[0]]: Object.values(item)[0]
        }))
      );
    }
  };

  render() {
    const {
      inputs,
      submitBtnText,
      buttonType,
      cancelBtnText,
      onCancel
    } = this.props;
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
                  (inputsData[index].fieldError ||
                    inputsData[index].fieldValue.length === 0) &&
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
          <Button type={buttonType} submitType={true}>
            {submitBtnText}
          </Button>
          {cancelBtnText.length > 0 && (
            <Button
              action={() => onCancel()}
              type="transparent"
              submitType={true}
            >
              {cancelBtnText}
            </Button>
          )}
        </form>
      </Fragment>
    );
  }
}
