import moment from 'moment';
import React, { memo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../../config/cookie';
import { 
  ReservDiv, ReservBtnDiv, ReservBtn, 
} from '../../../styledComponents';
import ReservationInfo from './ReservationInfo';

const Reservation = memo(({ data }) => {
  const [date, setDate] = useState('미확정');
  const [cost, setCost] = useState('미확정');

  useEffect(() => {
    if(data.date && data.time_slot){
      const _date = "20" + String(data.date);
      let tmp = moment(_date).format('YYYY년 MM월 DD일 ')

      const t = String(data.time_slot).substring(0, 2)
      const m = String(data.time_slot).substring(2)
      
      tmp += t + ':' + m

      setDate(tmp);
    }

    if(data.cost){
      const tmp = String(data.cost) + ' won';
      setCost(tmp)
    }
  }, []);

  const navigate = useNavigate();

  const goChatting = () => {
    navigate(`/chat/${getCookie('tattooist_id')}`)
  }
  const onClick = (e) => {
    navigate(`/reservation/${data.reservation_id}`, {
      state: data
    })
  }

  return (
    <>
      <ReservDiv>

        <ReservationInfo 
          image={data.image}
          nickname={data.customer_nickname}
          date={date}
          cost={cost}
          confirmed={data.confirmed}
        />

        <ReservBtnDiv>

          <ReservBtn type="small" onClick={goChatting}>
            채팅 이동
          </ReservBtn>

          <ReservBtn type="big" onClick={onClick}>
            {data.confirmed ? (
              <>작업 페이지</>
            ) : (
              <>예약 세부</>
            )}
          </ReservBtn>

        </ReservBtnDiv>

      </ReservDiv>
    </>
  );
});

export default Reservation;