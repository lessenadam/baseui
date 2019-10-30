/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React, {useState, useEffect} from 'react';
import FormControl from './form-control.js';
import Input from '../input/input.js';
import type {ValidationFormControlPropsT} from './types.js';
import {validateEmail} from '../input/utils.js';
import {useStyletron} from '../styles/styled.js';
import Alert from '../icon/alert.js';

const DEFAULT_PLACEHOLDER = 'Enter email';
const DEFAULT_ERROR = 'Please input a valid email address';
const DEFAULT_LABEL = 'Your email';

function Negative() {
  const [useCss, theme] = useStyletron();
  return (
    <div
      className={useCss({
        display: 'flex',
        alignItems: 'center',
        paddingRight: theme.sizing.scale500,
        color: theme.colors.negative400,
      })}
    >
      <Alert size="18px" />
    </div>
  );
}

const ValidationFormControl = ({
  // required props
  value,
  onChange,
  // helpful function to let parent track isValid state (initial isValid is true)
  updateIsValid,
  // option to override how the input is validated
  validateInput = validateEmail,
  // options to override
  overrides, // needs to be individual overrides for form control and input
  placeholder = DEFAULT_PLACEHOLDER, // input
  // $FlowFixMe=
  label = DEFAULT_LABEL, // form control
  // $FlowFixMe
  error = DEFAULT_ERROR, // form control
  // formControl Props
  caption,
  // $FlowFixMe
  ...baseProps
}: ValidationFormControlPropsT) => {
  const [isVisited, setIsVisited] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const internalOnChange = event => {
    const isUpdatedValid = validateInput(event.target.value);
    // $FlowFixMe
    setIsValid(isUpdatedValid);
    updateIsValid && updateIsValid(isUpdatedValid);
    onChange && onChange(event);
  };

  const internalOnBlur = event => {
    setIsVisited(true);
    baseProps.onBlur && baseProps.onBlur(event);
  };

  const shouldShowError = () => !isValid && isVisited;

  const getOverrides = () => {
    if (shouldShowError()) {
      return {...overrides, After: Negative};
    }
    return {...overrides};
  };

  return (
    <FormControl error={shouldShowError() ? error : null} label={label}>
      <Input
        {...baseProps}
        value={value}
        onChange={internalOnChange}
        onBlur={internalOnBlur}
        overrides={getOverrides()}
        placeholder={placeholder}
        error={!isValid}
      />
    </FormControl>
  );
};

export default ValidationFormControl;
