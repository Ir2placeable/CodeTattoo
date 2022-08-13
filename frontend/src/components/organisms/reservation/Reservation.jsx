import React, { memo } from 'react';
import { 
  ReservDiv, ReservInfoDiv, ReservDraftImg,
  ReservText, ReservTextDiv, ReservLabel,
  ReservTextBox, ReservBtnDiv, ReservBtn
} from '../../../styledComponents';

// 이미지 소스, 고객 닉네임, 예약 일정, 작업 가격
// data: { reservation_id, image, user_id, user_nickname
//          date, cost, procedure_status }
const Reservation = memo(({ data }) => {
  return (
    <>
      <ReservDiv>

        <ReservInfoDiv>
          <ReservDraftImg src={data.image} />
          <ReservTextDiv>
            <ReservText>
              <ReservLabel>Customer</ReservLabel>
              <ReservTextBox>{data.user_nickname}</ReservTextBox>
            </ReservText>
            <ReservText>
              <ReservLabel>예약 일정</ReservLabel>
              <ReservTextBox>{data.date}</ReservTextBox>
            </ReservText>
            <ReservText>
              <ReservLabel>작업 가격</ReservLabel>
              <ReservTextBox>{data.cost}</ReservTextBox>
            </ReservText>
          </ReservTextDiv>

          <ReservBtnDiv>

            <ReservBtn>채팅 이동</ReservBtn>
            <ReservBtn>{data.procedure_status}</ReservBtn>

          </ReservBtnDiv>
        </ReservInfoDiv>

      </ReservDiv>
    </>
  );
});

export default Reservation;