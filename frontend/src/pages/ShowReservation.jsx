import React, { memo } from 'react';

import { 
  ContentsDiv,
} from '../styledComponents';

import ReservationList from '../components/templates/ReservationList';
import { Outlet } from 'react-router-dom';

const ShowReservation = memo(() => {
  return (
    <>
      <ContentsDiv>

        <Outlet />

      </ContentsDiv>
    </>
  );
});

export default ShowReservation;