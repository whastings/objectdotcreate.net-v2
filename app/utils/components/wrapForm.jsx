import React from 'react';
import { autobindMethods } from '@whastings/js_utils';

const { Component, DOM } = React;

export default function wrapForm({component: FormComponent, fields, initials = {}}) {
  class WrappedForm extends Component  {
    constructor(props) {
      super(props);
      let initVals = initials;

      if (typeof initials === 'function') {
        initVals = initials(props) || {};
      }

      this.state = fields.reduce((state, field) => {
        let initVal = initVals[field];
        state[`${field}Value`] = (initVal === undefined) ? '' : initVal;
        return state;
      }, {});

      this.state.WrappedInput = createWrappedInput(this.getValue, this.updateValue);
    }

    getValue(field) {
      return this.state[`${field}Value`];
    }

    updateValue(field, value) {
      this.setState({[`${field}Value`]: value});
    }

    render() {
      return <FormComponent {...this.props} {...this.state}/>;
    }
  }

  autobindMethods(WrappedForm, 'getValue', 'updateValue');

  return WrappedForm;
}


function createWrappedInput(getValue, updateValue) {
  class WrappedInput extends Component {
    handleChange() {
      let { field } = this.props;
      updateValue(field, this.refs.input.value);
    }

    render() {
      let { inputType, field, ...inputProps } = this.props,
          value = getValue(field);

      let createInput = DOM[inputType] || DOM.input;

      return createInput({
        ref: 'input',
        value,
        onChange: this.handleChange,
        ...inputProps
      });
    }
  }

  autobindMethods(WrappedInput, 'handleChange');

  return WrappedInput;
}
