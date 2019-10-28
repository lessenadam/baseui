/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React, {useState, useEffect} from 'react';
import Input from './input.js';
import type {ValidationInputPropsT} from './types.js';
import {validateEmail} from './utils.js';
import {useStyletron} from '../styles/styled.js';
import Alert from '../icon/alert.js';

const DEFAULT_PLACEHOLDER = 'Enter email';

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

const ValidationInput = ({
  validateInput,
  onIsValidChange,
  onChange,
  onBlur,
  placeholder,
  overrides,
  error, // specifying error here to remove from baseProps
  ...baseProps
}: ValidationInputPropsT) => {
  const internalValidateInput = validateInput || validateEmail;
  const [isVisited, setIsVisited] = useState(false);
  const [isValid, setIsValid] = useState(true);
  useEffect(() => {
    // $FlowFixMe
    onIsValidChange && onIsValidChange(isValid);
  }, [isValid]);

  const internalOnChange = event => {
    // $FlowFixMe
    setIsValid(internalValidateInput(event.target.value));
    onChange && onChange(event);
  };
  const internalOnBlur = event => {
    setIsVisited(true);
    onBlur && onBlur(event);
  };
  const getOverrides = () => {
    if (!isValid && isVisited) {
      return {...overrides, After: Negative};
    }
    return {...overrides};
  };

  return (
    <Input
      placeholder={placeholder || DEFAULT_PLACEHOLDER}
      overrides={getOverrides()}
      error={!isValid}
      onChange={internalOnChange}
      onBlur={internalOnBlur}
      {...baseProps}
    />
  );
};

export default ValidationInput;
