import React, { useState } from "react";
import Calendar from 'react-calendar'
import '../../calendar.css'
import moment from "moment";

import { 
  CalendarDiv, 
} from "../../styledComponents";
import { getCookie } from "../../config/cookie";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import AvailableTime from "../organisms/reservation/AvailableTime";

/** 상위 컴포넌트 === ShowTattooistDetail.jsx
 * 타투이스트 예약 템플릿
 */

const TattooistDetailReservation = () => {
  const param = useParams();
  const [value, onChange] = useState(new Date());
  const [id, setId] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [today, setToday] = useState();

  useEffect(() => {
    let _id = getCookie('tattooist_id');

    if(_id === param.tattooist_id){
      setIsAdmin(true);
    } 
    else {
      if(!_id){
        _id = param.tattooist_id
      }
    }

    setId(_id);
    setToday(Number(moment(value).format('YYMMDD')))
    
  }, [])

  return (
    <>

    <CalendarDiv>
      <Calendar 
        onChange={onChange} 
        value={value}
        tileClassName={({ date, view }) => {
          const _date = Number(moment(date).format("YYMMDD"))
          if(today > _date){
            return 'highlight'
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
