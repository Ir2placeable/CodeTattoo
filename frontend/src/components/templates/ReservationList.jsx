import React, { memo } from 'react';
import useReservation from '../../hooks/useReservation';
import Reservation from '../organisms/reservation/Reservation';

import {
  ReservDiv, ReservInfoDiv, ReservDraftImg,
  ReservTextDiv, ReservText, ReservBtnDiv, 
  ReservBtn, ReservLabel, ReservTextBox
} from '../../styledComponents';
import { useNavigate } from 'react-router-dom';

const ReservationList = memo(() => {
  const reservations = useReservation();


  return (
    <>
      {reservations.map(data => (
        <Reservation 
          key={data.reservation_id} data={data} />
      ))}
    </>
  );
}); 

export default ReservationList;