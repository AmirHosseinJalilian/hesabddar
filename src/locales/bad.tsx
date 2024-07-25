// src/components/JalaliCalendarInput.tsx
import React, { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import jalali from '@react-multi-date-picker/calendar-jalali';
import './JalaliCalendarInput.css';

const JalaliCalendarInput: React.FC = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <DatePicker
      value={value}
      onChange={setValue}
      calendar={jalali}
      locale="fa"
      inputClass="custom-input"
      placeholder="Select a date"
    />
  );
};

export default JalaliCalendarInput;