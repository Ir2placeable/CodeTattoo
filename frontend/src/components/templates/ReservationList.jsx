import React, { memo } from "react";
import Reservation from "../organisms/reservation/Reservation";
import { EmptyBox, ListDiv } from "../../styledComponents";
import { useLocation, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

/**
 * 상위 컴포넌트 === ShowReservation.jsx
 * 예약 목록 템플릿
 */

const ReservationList = memo(() => {
  // 예약 목록
  const [reservations, setReservations] = useState([]);
  // confirmed 예약, pending 예약 데이터
  const { confirmed, pending } = useOutletContext();

  const location = useLocation();
  useEffect(() => {
    const [, , a] = location.pathname.split("/");

    if (a === "pending") {
      setReservations(pending);
    } else if (a === "confirmed") {
      setReservations(confirmed);
    }
  }, [location.pathname, confirmed, pending]);

  return (
    <>
      <ListDiv>
        {reservations.length === 0 ? (
          <EmptyBox>아직 예약이 없습니다.</EmptyBox>
        ) : (
          <>
            {reservations.map((data) => (
              <Reservation key={data.reservation_id} data={data} />
            ))}
          </>
        )}
      </ListDiv>
    </>
  );
});

export default ReservationList;
