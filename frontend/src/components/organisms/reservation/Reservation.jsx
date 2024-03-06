import moment from "moment";
import React, { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../../config/cookie";
import { goChattingRoom } from "../../../config/navigate";
import { ReservDiv, ReservBtnDiv, ReservBtn } from "../../../styledComponents";
import ReservationInfo from "./ReservationInfo";

/** 상위 컴포넌트 === ReservationList.jsx
 * 예약/작업 페이지 / 예약 카드 컴포넌트
 * @param {Object} 예약 정보 데이터
 */
const Reservation = memo(({ data }) => {
  // 날짜
  const [date, setDate] = useState("미확정");
  // 가격
  const [cost, setCost] = useState("미확정");

  useEffect(() => {
    // if(data.date && data.time_slot){
    //   const _date = "20" + String(data.date);
    //   let tmp = moment(_date).format('YYYY년 MM월 DD일 ')

    //   const t = String(data.time_slot).substring(0, 2)
    //   const m = String(data.time_slot).substring(2)

    //   tmp += t + ':' + m

    //   setDate(tmp);
    // }

    if (data.cost) {
      const tmp = String(data.cost) + " won";
      setCost(tmp);
    }
  }, []);

  const navigate = useNavigate();

  const goChatting = () => {
    goChattingRoom(getCookie("tattooist_id"), data.reservation_id);
  };

  const onClick = (e) => {
    navigate(`/reservation/${data.reservation_id}`, {
      state: data,
    });
  };

  return (
    <>
      <ReservDiv>
        <ReservationInfo
          image={data.image}
          nickname={data.customer_nickname}
          date={date}
          cost={cost}
          confirmed={data.confirmed}
          procedure_status={data.procedure_status}
        />

        <ReservBtnDiv>
          <ReservBtn type="small" onClick={goChatting}>
            채팅 이동
          </ReservBtn>

          <ReservBtn type="big" onClick={onClick}>
            {data.confirmed ? <>작업 페이지</> : <>예약 세부</>}
          </ReservBtn>
        </ReservBtnDiv>
      </ReservDiv>
    </>
  );
});

export default Reservation;
