import React, { memo } from 'react';
import useReservation from '../../hooks/useReservation';
import Reservation from '../organisms/reservation/Reservation';

import {
  ReservDiv, ReservInfoDiv, ReservDraftImg,
  ReservTextDiv, ReservText, ReservBtnDiv, 
  ReservBtn, ReservLabel, ReservTextBox, EmptyBox, ListDiv
} from '../../styledComponents';
import { useNavigate } from 'react-router-dom';

const ReservationList = memo(() => {
  const reservations = useReservation();


  return (
    <>
    <ListDiv>
      {reservations.length === 0 ? (
        <EmptyBox>
          아직 예약이 없습니다.
        </EmptyBox>
      ) : (
      <>
        {reservations.map(data => (
          <Reservation 
            key={data.reservation_id} data={data} />
        ))}
      </>
      )}
    </ListDiv>
    </>
  );
}); 

export default ReservationList;