import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../calendar.css'
// import 'react-calendar/dist/Calendar.css';
// import DatePicker from 'react-datepicker'
// import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { useEffect } from 'react';

const marks = [
  "15-06-2022",
  "05-06-2022",
  "10-06-2022",
  "07-06-2022",
  "21-06-2022"
]

const CalendarComp = ({ apiUrl, cookies }) => {

  // const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState(new Date());
  
  const onClickDay = (value, event) => {
    // value : Sat Jun 18 2022 00:00:00 GMT+0900
    console.log('click: ', value)

    const str = moment(value).format("DD-MM-YYYY");
    console.log(str)
  }

  useEffect(() => {
    console.log('캘린더: ', value)
  }, []);

  return (
    <>
      {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
      <Calendar 
        onChange={onChange} 
        value={value}
        onClickDay={onClickDay}
        tileClassName={({ date, view }) => {
          if(marks.find((x) => x === moment(date).format("DD-MM-YYYY"))){
            return 'highlight'
          }
        }} />
    </>
  );
};

export default CalendarComp;