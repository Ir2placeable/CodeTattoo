import React from 'react';
import {
  ChatBtn,
  ChatDraftImg,
  ChatDraftBox,
  ChatDraftInfoBox,
  ChatInputDiv,
  ChatReservationBox,
  ChatBtnBox,
  ChatDraftInfoLabel,
  ChatDraftInfoInput,
  ChatDraftInputDiv,
} from "../../../styledComponents";

import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChattingReservation = ({ onPlusClick }) => {
  return (
    <>
      <ChatReservationBox>
        <ChatDraftBox>
          <ChatDraftImg />
          <ChatDraftInfoBox>
            <ChatDraftInputDiv>
              <ChatDraftInfoLabel htmlFor="cost">
                가격
              </ChatDraftInfoLabel>
              <ChatDraftInfoInput id="cost" />
            </ChatDraftInputDiv>
            <ChatDraftInputDiv>
              <ChatDraftInfoLabel htmlFor="date">
                일정
              </ChatDraftInfoLabel>
              <ChatDraftInfoInput id="date" />
            </ChatDraftInputDiv>
            <ChatDraftInputDiv>
              <ChatDraftInfoLabel>부위</ChatDraftInfoLabel>
              <ChatDraftInfoInput />
            </ChatDraftInputDiv>
          </ChatDraftInfoBox>
        </ChatDraftBox>
        <ChatBtnBox>
          <ChatBtn type="cancel">예약 취소</ChatBtn>
          <ChatBtn type="modify">정보 수정</ChatBtn>
          <ChatBtn type="confirm">예약 확정</ChatBtn>
        </ChatBtnBox>
      </ChatReservationBox>


      <ChatInputDiv type="back">
        <ChatBtn type="image" onClick={onPlusClick}>
          <FontAwesomeIcon icon={faMinus} />
        </ChatBtn>
      </ChatInputDiv>
    </>
  );
};

export default ChattingReservation;