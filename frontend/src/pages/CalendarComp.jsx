import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../calendar.css'
// import 'react-calendar/dist/Calendar.css';
// import DatePicker from 'react-datepicker'
// import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { useEffect } from 'react';

import { BookingDescriptionDiv } from '../styledComponents'

const CalendarComp = ({ apiUrl, cookies }) => {
  const [value, onChange] = useState(new Date());

  // 예약 불가능한 날짜
  const [marks, setMarks] = useState([
    '13-06-2022',
    '11-06-2022',
    '30-06-2022',
    '21-06-2022'
  ]);

  // 예약 있는 날짜
  const [booking, setBooking] = useState([
    '24-06-2022',
    '20-06-2022',
    '28-06-2022'
  ])
  
  // 예약 불가능한 날짜 세팅
  const onClickDay = (value, event) => {
    // value : Sat Jun 18 2022 00:00:00 GMT+0900

    const str = moment(value).format("DD-MM-YYYY");

    let clickedButton = event.target;

    if(event.target.tagName === 'ABBR'){
      clickedButton = event.target.parentNode;
    }

    if(clickedButton.classList.contains('highlight')){
      const tempMarks = marks.filter(mark => mark !== str);
      setMarks(tempMarks)
      clickedButton.classList.remove('highlight');
    } else {
      const tempMarks = marks;
      tempMarks.push(str);
      setMarks(tempMarks)
      clickedButton.classList.add('highlight')
    }
  }

  useEffect(() => {

  }, []);

  return (
    <>
      <Calendar 
        onChange={onChange} 
        value={value}
        onClickDay={onClickDay}
        tileClassName={({ date, view }) => {
          if(marks.find((x) => x === moment(date).format("DD-MM-YYYY"))){
            return 'highlight'
          }
        }} 
        tileContent={({ activeStartDate, date, view}) => {
          if(booking.find((x) => x === moment(date).format("DD-MM-YYYY"))){
            return (
              <div className='booking'></div>
            )
          }
        }}
        />

        <BookingDescriptionDiv>
          * 예약 불가능한 날짜를 클릭해주세요<br/>
          * 예약이 확정된 날짜는 <span style={{color: 'rgb(60, 187, 60)', fontWeight: 'bold'}}>초록색</span> 원이 표시됩니다.
        </BookingDescriptionDiv>
    </>
  );
};

export default CalendarComp;