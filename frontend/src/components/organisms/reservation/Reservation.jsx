import moment from 'moment';
import React, { memo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../../config/cookie';
import { 
  ReservDiv, ReservInfoDiv, ReservDraftImg,
  ReservText, ReservTextDiv, ReservLabel,
  ReservTextBox, ReservBtnDiv, ReservBtn, 
  ReservDraftEmptyImg
} from '../../../styledComponents';

// 이미지 소스, 고객 닉네임, 예약 일정, 작업 가격
// { reservation_id, image, customer_id, customer_nickname, 
//   date, time_slot, cost, body_part, procedure_status, 
//   confirmed }
// 필수: reservation_id, customer_id, customer_nickname,
// procedure_status, confirmed
const Reservation = memo(({ data }) => {
  const [date, setDate] = useState('미확정');
  const [cost, setCost] = useState('미확정');

  useEffect(() => {
    if(data.date && data.time_slot){
      const _date = "20" + String(data.date);
      let tmp = moment(_date).format('YYYY년 MM월 DD일 ')

      const t = String(data.time_slot).substring(0, 2)
      const m = String(data.time_slot).substring(2)
      // console.log(data.time_slot, t, m)
      tmp += t + ':' + m
      // console.log(tmp)

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
    // if(e.target.innerText === '예약 미확정'){
    //   return
    // }
    navigate(`${data.reservation_id}`, {
      state: data
    })
  }

  return (
    <>
      <ReservDiv>

        <ReservInfoDiv>
          {data.image ? (
            <ReservDraftImg src={data.image} />
          ) : (
            <ReservDraftEmptyImg>
              미확정
            </ReservDraftEmptyImg>
          )}
          
          <ReservTextDiv>
            <ReservText>
              <ReservLabel>Customer</ReservLabel>
              <ReservTextBox>{data.customer_nickname}</ReservTextBox>
            </ReservText>
            <ReservText>
              <ReservLabel>예약 일정</ReservLabel>
              <ReservTextBox>{date}</ReservTextBox>
            </ReservText>
            <ReservText>
              <ReservLabel>작업 가격</ReservLabel>
              <ReservTextBox>{cost}</ReservTextBox>
            </ReservText>
          </ReservTextDiv>

        </ReservInfoDiv>

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