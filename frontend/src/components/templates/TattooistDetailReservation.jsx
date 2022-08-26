import React, { useState } from "react";
import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css';
import '../../calendar.css'
import moment from "moment";

import { 
  CalendarDiv, ReservationDiv, 
  DateDiv, TimeDiv, TimeText, Time, 
  TimeBox, ReservRequestBtn, TimeActiveDiv, TimeActiveBtn
} from "../../styledComponents";
import { getCookie, setCookie } from "../../config/cookie";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { APIURL } from "../../config/key";
import AvailableTime from "../organisms/reservation/AvailableTime";

const mark = [
  "220810",
  "220811",
  "220827",
  "220820",
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
  const param = useParams();
  const [value, onChange] = useState(new Date());
  const [id, setId] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let _id = getCookie('tattooist_id');

    if(_id === param.tattooist_id){
      setIsAdmin(true);
    } else {
      if(!_id){
        _id = getCookie('user_id')
      }
    }

    setId(_id);
  }, [])

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
          // "YYYY-MM-DD"
          if (mark.find((x) => x === moment(date).format("YYMMDD"))) {
            return "highlight";
          }
        }}
      />

      <AvailableTime  
        value={value}
        isAdmin={isAdmin}
        id={id}
      />

    </CalendarDiv>
    </>
  );
};

export default React.memo(TattooistDetailReservation);
