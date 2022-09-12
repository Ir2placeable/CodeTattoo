import React, { memo } from 'react';
import useReservation from '../../hooks/useReservation';
import Reservation from '../organisms/reservation/Reservation';

import {
  ReservDiv, ReservInfoDiv, ReservDraftImg,
  ReservTextDiv, ReservText, ReservBtnDiv, 
  ReservBtn, ReservLabel, ReservTextBox, EmptyBox, ListDiv
} from '../../styledComponents';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const ReservationList = memo(() => {
  const [reservations, setReservations] = useState([])
  const { confirmed, pending } = useOutletContext();

  const location = useLocation();
  useEffect(() => {
    const [ , , a] = location.pathname.split('/')
    
    if(a === 'pending'){
      setReservations(pending)
    } else if(a === 'confirmed'){
      setReservations(confirmed)
    }
  }, [location.pathname, confirmed, pending])

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