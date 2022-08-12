import React, { memo } from 'react';
import useReservation from '../../hooks/useReservation';
import Reservation from '../organisms/reservation/Reservation';

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