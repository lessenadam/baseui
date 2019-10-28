// @flow
import * as React from 'react';
// import {FormControl} from 'baseui/form-control';
import {ValidationInput} from 'baseui/input';

export default () => {
  const [value, setValue] = React.useState('');
  return (
    <ValidationInput
      value={value}
      onChange={event => setValue(event.currentTarget.value)}
    />
  );
};
