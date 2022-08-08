import React, { useState } from "react";
import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css';
import '../../calendar.css'
import moment from "moment";

const mark = [
  "2022-08-08",
  "2022-08-01",
  "2022-08-27",
  "2022-09-28"
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

    <div>
      <p>작업 가능 날짜</p>
      <Calendar 
        onChange={onChange} 
        value={value}
        tileContent={({ date, view }) => {
          if(mark.find((x) => x === moment(date).format("YYYY-MM-DD"))){
            return (
              <>
                <div className="flex justify-center items-center absoluteDiv">
                  <div style={dotStyle}></div>
                </div>
              </>
            )
          }
        }}
      />
    </div>

        {/* 클릭한 날짜 */}
      <div>
        {moment(value).format("YYYY년 MM월 DD일")}
      </div>
    </>
  );
};

export default React.memo(TattooistDetailReservation);
