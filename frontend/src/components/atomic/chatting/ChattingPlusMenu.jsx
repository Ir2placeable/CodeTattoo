import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faTag } from '@fortawesome/free-solid-svg-icons';
import { ChattingPlusItem, ChattingPlusMenuDiv } from '../../../styledComponents';

const margin = {
  marginLeft: '5px'
}
const ChattingPlusMenu = memo(() => {
  return (
    <>
      <ChattingPlusMenuDiv>
        <ChattingPlusItem>
          예약 정보 확인
          <FontAwesomeIcon icon={faTag} style={margin} />
        </ChattingPlusItem>

        <ChattingPlusItem>
          마이 타투 이력 전송

          <FontAwesomeIcon icon={faAddressBook} style={margin} />
        </ChattingPlusItem>
      </ChattingPlusMenuDiv> 
    </>
  );
});

export default ChattingPlusMenu;