import React, { useState } from "react";
import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css';
import '../../calendar.css'
import moment from "moment";

import { 
  CalendarDiv, ReservationDiv, 
  DateDiv, TimeDiv, TimeText, Time
} from "../../styledComponents";

const mark = [
  "2022-08-10",
  "2022-08-11",
  "2022-08-27",
  "2022-09-28",
  "2022-08-15",
  "2022-08-17",
  "2022-08-20",
  "2022-08-21",
  "2022-08-22",
  "2022-08-23",
]
const time = [
  "09",
  "11",
  "12",
  "14",
  "16"
]

const dotStyle = {
  height: '8px',
  width: '8px',
  backgroundColor: 'red',
  borderRadius: '50%',
  display: 'flex',
  marginLeft: '1px',
  position: 'absolute',
  bottom: '7px',
  left: '50%',
  marginLeft: '-4px'
}

// reservations : []
// YY-MM-DD-TT : 22-07-18-11
const TattooistDetailReservation = () => {
  const [value, onChange] = useState(new Date());

  return (
    <>

    <CalendarDiv>
      <Calendar 
        onChange={onChange} 
        value={value}
        // tileContent={({ date, view }) => {
        //   if(mark.find((x) => x === moment(date).format("YYYY-MM-DD"))){
            
        //     return (
        //       <>
        //         <div className="flex justify-center items-center absoluteDiv">
        //           <div style={dotStyle}></div>
        //         </div>
        //       </>
        //     )
        //   }
        // }}
        tileClassName={({ date, view }) => {
          if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return "highlight";
          }
        }}
      />

      {/* 클릭한 날짜 */}
      <ReservationDiv>
        <DateDiv>
          {moment(value).format("YYYY년 MM월 DD일")}
        </DateDiv>
        <TimeDiv>
          <TimeText>
            예약 가능 시간
          </TimeText>

          {time.map((t, idx) => (
            <Time key={idx}>
              {t}:00
            </Time>
          ))}
        </TimeDiv>
      </ReservationDiv>

    </CalendarDiv>
    </>
  );
};

export default React.memo(TattooistDetailReservation);
