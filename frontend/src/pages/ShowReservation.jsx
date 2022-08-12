import React, { memo } from 'react';

import { 
  ContentsDiv,
  ReservDiv, ReservInfoDiv, ReservDraftImg,
  ReservTextDiv, ReservText, ReservBtnDiv, 
  ReservBtn, ReservLabel, ReservTextBox
} from '../styledComponents';
import ReservationList from '../components/templates/ReservationList';

const ShowReservation = memo(() => {
  return (
    <>
      <ContentsDiv>

        {/* <ReservationList /> */}

        <ReservDiv>

          <ReservInfoDiv>
            <ReservDraftImg src='../../img/react.jpg' />
            <ReservTextDiv>
              <ReservText>
                <ReservLabel>Customer</ReservLabel>
                <ReservTextBox>아영</ReservTextBox>
              </ReservText>
              <ReservText>
                <ReservLabel>예약 일정</ReservLabel>
                <ReservTextBox>2022.08.11 11AM</ReservTextBox>
              </ReservText>
              <ReservText>
                <ReservLabel>작업 가격</ReservLabel>
                <ReservTextBox>200,000원</ReservTextBox>
              </ReservText>
            </ReservTextDiv>

            <ReservBtnDiv>

              <ReservBtn>채팅 이동</ReservBtn>
              <ReservBtn>작업 시작</ReservBtn>

            </ReservBtnDiv>
          </ReservInfoDiv>

        </ReservDiv>



        <ReservDiv>

          <ReservInfoDiv>
            <ReservDraftImg src='../../img/react.jpg' />
            <ReservTextDiv>
              <ReservText>
                <ReservLabel>Customer</ReservLabel>
                <ReservTextBox>아영</ReservTextBox>
              </ReservText>
              <ReservText>
                <ReservLabel>예약 일정</ReservLabel>
                <ReservTextBox>2022.08.11 11AM</ReservTextBox>
              </ReservText>
              <ReservText>
                <ReservLabel>작업 가격</ReservLabel>
                <ReservTextBox>200,000원</ReservTextBox>
              </ReservText>
            </ReservTextDiv>

            <ReservBtnDiv>

              <ReservBtn>채팅 이동</ReservBtn>
              <ReservBtn>작업 시작</ReservBtn>

            </ReservBtnDiv>
          </ReservInfoDiv>

        </ReservDiv>

      </ContentsDiv>
    </>
  );
});

export default ShowReservation;