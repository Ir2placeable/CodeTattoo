import React, { memo } from 'react';

import { 
  ContentsDiv,
} from '../styledComponents';

import ReservationList from '../components/templates/ReservationList';
import { Outlet } from 'react-router-dom';
import useReservation from '../hooks/useReservation';
import SmallNav from '../components/organisms/common/SmallNav';

const ShowReservation = memo(() => {
  const [confirmed, pending] = useReservation();

  return (
    <>
      <SmallNav 
        data={[
          {text: 'root', path: '/reservations'},
          {text: 'Pending', path: '/reservations/pending'},
          {text: 'Confirmed', path: '/reservations/confirmed'},
        ]}
        isSearch={false} loc={2.3}
      />

      <ContentsDiv>

        <Outlet context={{confirmed, pending}} />

      </ContentsDiv>
    </>
  );
});

export default ShowReservation;