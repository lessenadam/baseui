import * as React from 'react';
import {ValidationFormControl} from 'baseui/form-control';

export default () => {
  const [value, setValue] = React.useState('');
  return (
    <div>
      <ValidationFormControl
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
};
