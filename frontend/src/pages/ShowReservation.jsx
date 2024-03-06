import React, { memo } from "react";

import { ContentsDiv } from "../styledComponents";

import { Outlet } from "react-router-dom";
import useReservation from "../hooks/useReservation";
import SmallNav from "../components/organisms/common/SmallNav";
import { confirmed, pending } from "../dummy/reservation";
/**
 * 예약 목록 페이지
 */
const ShowReservation = memo(() => {
  // 예약 확정 목록 / 예약 확정 대기 목록
  // const [confirmed, pending] = useReservation();

  return (
    <>
      <SmallNav
        data={[
          { text: "root", path: "/reservations" },
          { text: "Pending", path: "/reservations/pending" },
          { text: "Confirmed", path: "/reservations/confirmed" },
        ]}
        isSearch={false}
        loc={2}
      />

      <ContentsDiv>
        <Outlet context={{ confirmed, pending }} />
      </ContentsDiv>
    </>
  );
});

export default ShowReservation;
