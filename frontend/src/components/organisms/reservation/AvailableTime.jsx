import React, { memo } from 'react';
import { getCookie } from '../../../config/cookie';
import axios from 'axios';
import { APIURL } from '../../../config/key';
import {
  ReservationDiv, DateDiv, TimeDiv,
  TimeText, TimeBox, Time, ReservRequestBtn,
  TimeActiveBtn, TimeActiveDiv
} from '../../../styledComponents';
import { useState } from 'react';
import moment from 'moment';
import { useEffect } from 'react';
import useCreateReservation from '../../../hooks/useCreateReservation';

const AvailableTime = ({ value, isAdmin, id }) => {
  const time = [
    "10:00", "10:30", "11:00", "11:30", 
    "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", 
    "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", 
  ]

  const [unavailable, setUnavailable] = useState([]);
  const [prev, setPrev] = useState([]);

  useEffect(() => {
    for(let i=0; i<prev.length; i++){
      prev[i].style.backgroundColor = 'rgba(72, 72, 72)'
    }
    
    setUnavailable([]);
    setPrev([])

  }, [value])

  const onClick = (e) => {

    const date = moment(value).format('YYMMDD');
    const [t, m] = e.target.innerText.split(':');
    const time_slot = t + m;

    if(isAdmin){
      const temp = unavailable;
      temp.push({date, time_slot});
      setUnavailable(temp);
      const temp2 = prev;
      temp2.push(e.target);
      setPrev(temp2);

      e.target.style.backgroundColor = '#2370DF';
    } else {
      if(prev[0]){
        prev[0].style.backgroundColor = '#484848';
      }

      setPrev([e.target]);
      setUnavailable({ date, time_slot })
      e.target.style.backgroundColor = '#2370DF';
    }
  }

  const timeActive = async() => {
    //console.log(unavailable)
    const res = await axios.post(`${APIURL}/remove/unavailable/${id}`, {
      unavailable
    })

    if(res.data.success){
      console.log('time active success')
      window.location.replace('')
    } else {
      console.log('time active fail')
    }
  }

  const timeDeActive = async() => {
    //console.log(unavailable)
    const res = await axios.post(`${APIURL}/create/unavailable/${id}`, {
      unavailable
    })

    if(res.data.success){
      console.log('time deactive success')
      window.location.replace('')
    } else {
      console.log('time deactive fail')
    }
  }

  const createReservation = useCreateReservation();

  const onCreateReservation = () => {
    const user = getCookie('user_id');

    if(!user){
      alert('로그인이 필요합니다!')
      return;
    } else {
      const data = {
        user_id: user,
        tattooist_id: id,
        date: unavailable.date,
        time_slot: unavailable.time_slot
      }
      console.log(data)
      createReservation({ data });
    }
  }

  return (
    <>
      <ReservationDiv>

        <DateDiv>
          {moment(value).format('YYYY년 MM월 DD일')}
        </DateDiv>

        <TimeDiv>

          <TimeText>예약 가능 시간</TimeText>

          <TimeBox>
            {time.map((t, idx) => (
              <Time key={idx} onClick={onClick}
              >
                {t}
              </Time>
            ))}
          </TimeBox>

          {!isAdmin ? (
            <ReservRequestBtn onClick={onCreateReservation}>
              상담 문의
            </ReservRequestBtn>
          ) : (
            <TimeActiveDiv>
              <TimeActiveBtn type="active"
                onClick={timeActive}
              >
                활성화
              </TimeActiveBtn>
              <TimeActiveBtn type="deactive"
                onClick={timeDeActive}
              >
                비활성화
              </TimeActiveBtn>
              <TimeActiveBtn type="description">
                예약 가능/불가능한 시간을 선택해주세요.
              </TimeActiveBtn>
            </TimeActiveDiv>
          )}

        </TimeDiv>

      </ReservationDiv>
    </>
  );
};

export default memo(AvailableTime);