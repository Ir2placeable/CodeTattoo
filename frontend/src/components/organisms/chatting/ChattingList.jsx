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
  ChattingBox,
  ChattingDiv,
  ChattingHeader,
  ChattingImg,
  ChattingInfoDiv,
  ChattingListDiv,
  ChattingReserv,
  ChattingRoomDiv,
  ChattingRoomHeader,
  ChattingText,
  ChattingTextDiv,
  ChattingTime,
  ChatBtnBox,

} from "../../../styledComponents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faMinus,
  faPlus,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import ChatDraftInfo from "./ChatDraftInfo";
import useChatReservation from "../../../hooks/useChatReservation";

const ChattingList = () => {
  const [plusClick, setPlusClick] = useState(false);
  const onPlusClick = () => {
    setPlusClick(plusClick ? false : true);
  };
  const [confirm, cancel] = useChatReservation
  return (
    <>
      <ChattingDiv>
        <ChattingHeader>
          <FontAwesomeIcon icon={faCommentDots} /> Chatting
        </ChattingHeader>

        <ChattingListDiv>
          {/* <ChattingBox>
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
          </ChattingBox> */}

          <ChattingBox>
            <ChattingImg src="../../img/react.jpg" />

            <ChattingTextDiv>
              <ChattingText size="big">킹아영</ChattingText>
              <ChattingText size="medium">
                채팅 마지막 내용 미리보기
              </ChattingText>
            </ChattingTextDiv>

            <ChattingReserv state="complete" />
          </ChattingBox>
        </ChattingListDiv>

        <ChattingRoomDiv>
          {plusClick ? (
            <>
              <ChattingRoomHeader>
                <ChattingImg src="../../img/react.jpg" />
                <ChattingText size="main">킹아영</ChattingText>
              </ChattingRoomHeader>

              <ChatBigDiv>
                <ChatDiv who="me">
                  <ChatContents who="me">sibal</ChatContents>
                  <ChatDate>2022년 12월 17일 12:17pm</ChatDate>
                </ChatDiv>
                <ChatDiv who="you">
                  <ChatContents who="you">...</ChatContents>
                  <ChatDate>2022년 8월 17일 5:17pm</ChatDate>
                </ChatDiv>
              </ChatBigDiv>

              <ChatInputDiv>
                <ChatBtn type="image" onClick={onPlusClick}>
                  <FontAwesomeIcon icon={faPlus} />
                </ChatBtn>
                <ChatImageLabel htmlFor="input-chat-img">
                  <FontAwesomeIcon icon={faImage} />
                </ChatImageLabel>
                <ChatImageInput type="file" id="input-chat-img" />
                <ChatInput />
                <ChatBtn type="submit">전송</ChatBtn>
              </ChatInputDiv>
            </>
          ) : (
            <>
            <ChatReservationBox>
              <ChatDraftBox>
                <ChatDraftImg/>
                <ChatDraftInfoBox>
                  <ChatDraftInfo/>
                </ChatDraftInfoBox>
              </ChatDraftBox>
              <ChatBtnBox>
                <ChatBtn type="cancel" onClick={confirm}>예약 취소</ChatBtn>
                <ChatBtn type="modify">정보 수정</ChatBtn>
                <ChatBtn type="confirm" onClick={cancel}>예약 확정</ChatBtn>
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

export default ChattingList;
