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
import useTattooistDetailReservation from '../../../hooks/useTattooistDetailReservation';

const AvailableTime = ({ value, isAdmin, id }) => {
  const time1 = [
    "10:00", "10:30", "11:00", "11:30", 
    "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", 
    "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", 
  ]
  const [time, setTime] = useState([
    { slot: "1000", flag: false }, { slot: "1030", flag: false },
    { slot: "1100", flag: false }, { slot: "1130", flag: false },
    { slot: "1200", flag: false }, { slot: "1230", flag: false },
    { slot: "1300", flag: false }, { slot: "1330", flag: false },
    { slot: "1400", flag: false }, { slot: "1430", flag: false },
    { slot: "1500", flag: false }, { slot: "1530", flag: false },
    { slot: "1600", flag: false }, { slot: "1630", flag: false },
    { slot: "1700", flag: false }, { slot: "1730", flag: false },
    { slot: "1800", flag: false }, { slot: "1830", flag: false },
    { slot: "1900", flag: false }, { slot: "1930", flag: false },
  ])

  const [unavailable, setUnavailable] = useState([]);
  const [prev, setPrev] = useState([]);
  const data = useTattooistDetailReservation({
    value: value
  })

  useEffect(() => {
    // console.log(data)
    const temp = [];
    time.forEach(x => {
      const _time = Number(x.slot);
      const isUnavailable = data.findIndex(tmp => tmp === _time);

      if(isUnavailable !== -1){
        temp.push({ slot: x.slot, flag: true });
      } else {
        temp.push({ slot: x.slot, flag: false});
      }
    })

    setTime(temp);
  }, [data])

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

      const dup = temp.findIndex( tmp => tmp.time_slot === time_slot)

      if(dup !== -1){
        console.log('중복!')
      } else {
        temp.push({date, time_slot});
      }
      setUnavailable(temp);
      console.log(unavailable)

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
        customer_id: user,
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
            {time.map((t, idx) => {
              const a = t.slot.substring(0, 2);
              const b = t.slot.substring(2);
              const _t = a + ":" + b;
              return(  
                <Time key={idx} onClick={onClick}
                  style={t.flag ? {backgroundColor: '#C8C8C8'} : {}}
                >
                  {_t}
                </Time>
              )
            })}
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