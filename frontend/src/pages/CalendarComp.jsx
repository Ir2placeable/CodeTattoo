import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const CalendarComp = () => {

  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState(new Date());

  return (
    <>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      <Calendar onChange={onChange} value={value} />
    </>
  );
};

export default CalendarComp;