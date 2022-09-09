import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ChattingRoomDiv } from '../../../styledComponents';
import ChattingReservation from './ChattingReservation';
import ChattingRoom from './ChattingRoom';

const ChattingRecord = () => {
  const { opponentId } = useOutletContext();
  console.log('opponent: ',opponentId)
  const [plusClick, setPlusClick] = useState(true);

  const onPlusClick = () => {
    setPlusClick(plusClick ? false : true);
  }

  return (
    <>
      <ChattingRoomDiv>
        {plusClick ? (
          <ChattingRoom onPlusClick={onPlusClick} />
        ) : (
          <ChattingReservation onPlusClick={onPlusClick} />
        )}
      </ChattingRoomDiv>
    </>
  );
};

export default ChattingRecord;