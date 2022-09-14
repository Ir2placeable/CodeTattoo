import React from 'react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ChattingRoomDiv } from '../../../styledComponents';
import ChattingReservation from './ChattingReservation';
import ChattingRoom from './ChattingRoom';

/**
 * 상위 컴포넌트 === Chatting.jsx
 * 채팅 페이지/ 채팅방 템플릿 
 */

const ChattingRecord = () => {
  const { opponentId, data } = useOutletContext();
  console.log('opponent: ',opponentId)
  console.log('data: ', data)
  const [plusClick, setPlusClick] = useState(true);

  const onPlusClick = () => {
    setPlusClick(plusClick ? false : true);
  }

  return (
    <>
      <ChattingRoomDiv>
        {plusClick ? (
          <ChattingRoom onPlusClick={onPlusClick} data={data} />
        ) : (
          <ChattingReservation user_id={data.opponent_id} onPlusClick={onPlusClick} />
        )}
      </ChattingRoomDiv>
    </>
  );
};

export default ChattingRecord;