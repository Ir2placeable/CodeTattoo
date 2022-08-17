import React, { useState } from "react";
import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css';
import '../../calendar.css'
import moment from "moment";

import { 
  CalendarDiv, ReservationDiv, 
  DateDiv, TimeDiv, TimeText, Time, 
  TimeBox, ReservRequestBtn
} from "../../styledComponents";
import { getCookie } from "../../config/cookie";

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
  "10", "11", "12", "13",
  "14", "15", "16", "17",
  "18", "19", "20", "21"
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

const disabledStyle = {
  backgroundColor: '#ccc',
  cursor: 'default'
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

          <TimeBox>
          {time.map((t, idx) => (
            <Time key={idx}>
              {t}:00
            </Time>
          ))}
          </TimeBox>
        </TimeDiv>

        {getCookie('user_id') && (
          <ReservRequestBtn>
            작업 요청
          </ReservRequestBtn>
        )}
        
      </ReservationDiv>

    </CalendarDiv>
    </>
  );
};

export default React.memo(TattooistDetailReservation);
