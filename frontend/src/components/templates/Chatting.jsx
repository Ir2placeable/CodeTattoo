import React, { useState } from "react";
import {
  ChatBigDiv,
  ChatBtn,
  ChatContents,
  ChatDate,
  ChatDiv,
  ChatDraftImg,
  ChatDraftBox,
  ChatDraftInfoBox,
  ChatImageInput,
  ChatImageLabel,
  ChatInput,
  ChatInputDiv,
  ChatReservationBox,
  ChatTextarea,
  ChattingDiv,
  ChattingHeader,
  ChattingImg,
  ChattingInfoDiv,
  ChattingRoomDiv,
  ChattingRoomHeader,
  ChattingText,
  ChattingTime,
  ChatBtnBox,
  ChatDraftInfoLabel,
  ChatDraftInfoInput,
  ChatDraftInputDiv,
} from "../../styledComponents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faMinus,
  faPlus,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import ChattingList from "../organisms/chatting/ChattingList";
import ChattingRoom from "../organisms/chatting/ChattingRoom";

const Chatting = () => {
  const [plusClick, setPlusClick] = useState(true);
  
  const onPlusClick = () => {
    setPlusClick(plusClick ? false : true);
  };


  return (
    <>
      <ChattingDiv>
        <ChattingHeader>
          <FontAwesomeIcon icon={faCommentDots} /> Chatting
        </ChattingHeader>

        <ChattingList />

        <ChattingRoomDiv>
          {plusClick ? (
            <>
              <ChattingRoom onClick={onPlusClick} />
            </>
          ) : (
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
                      <ChatDraftInfoLabel >부위</ChatDraftInfoLabel>
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
          )}
        </ChattingRoomDiv>
      </ChattingDiv>
    </>
  );
};

export default Chatting;

{
  /* <ChattingBox>
            <ChattingImg src='../../img/react.jpg' />

            <ChattingInfoDiv>
              <ChattingTextDiv>
                <ChattingText size='big'>킹아영</ChattingText>
                <ChattingText size="medium">채팅 마지막 내용 미리보기</ChattingText>
              </ChattingTextDiv>

              <ChattingTextDiv sort="right">
                <ChattingText size="small">2022년 8월 17일의 예약 손님</ChattingText>
                <ChattingText size="small">010-6595-0827</ChattingText>
                <ChattingText size="small">200,000원</ChattingText>
              </ChattingTextDiv>

              <ChattingTime>
                오후 5:37
              </ChattingTime>

            </ChattingInfoDiv>
          </ChattingBox> */
}
