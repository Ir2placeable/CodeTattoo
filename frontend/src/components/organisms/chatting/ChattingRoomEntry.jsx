import React from 'react';
import { ChattingRoomDiv, ChattingRoomLogo } from '../../../styledComponents';

/**
 * 상위 컴포넌트 === ChattingRecord.jsx
 * 채팅 
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