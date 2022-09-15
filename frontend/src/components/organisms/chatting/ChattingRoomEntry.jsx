import React from 'react';
import { ChattingRoomDiv, ChattingRoomLogo } from '../../../styledComponents';

/**
 * 상위 컴포넌트 === Chatting.jsx
 * 채팅 페이지/ 채팅방 초기 페이지
 */
const ChattingRoomEntry = () => {
  return (
    <>
      <ChattingRoomDiv state="entry">
        <ChattingRoomLogo src="../../img/logo-en.png"/>
      </ChattingRoomDiv>
    </>
  );
};

export default ChattingRoomEntry;