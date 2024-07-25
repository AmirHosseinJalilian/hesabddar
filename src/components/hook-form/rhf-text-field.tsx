import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import moment from 'moment';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  valueGetter?: (params: { value: any }) => string;
};

export default function RHFTextField({ name, helperText, type, valueGetter, ...other }: Props) {
  const { control } = useFormContext();

  const handleChange = (field: any, event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (type === 'number') {
      field.onChange(Number(value));
    } else {
      field.onChange(value);
    }
  };

  return (
<Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        let fieldValue = field.value;
        if (type === 'number' && fieldValue === 0) {
          fieldValue = '';
        }
        if (valueGetter) {
          fieldValue = valueGetter({ value: fieldValue });
        }
        return (
          <TextField
            {...field}
            fullWidth
            type={type}
            value={fieldValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(field, event)}
            error={!!error}
            helperText={error ? error.message : helperText}
            {...other}
          />
        );
      }}
    />
  );
}
