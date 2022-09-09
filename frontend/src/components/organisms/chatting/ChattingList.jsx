import React, { useState } from "react";
import useChatUserList from "../../../hooks/useChatUserList";
import {
  ChattingListDiv,
  ChattingBox,
  ChattingImg,
  ChattingTextDiv,
  ChattingText,
  ChattingReserv,
  EmptyBox,
  ProfileImgIcon, ChattingEmptyBox
} from "../../../styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { WebSocketContext } from "../../templates/Chatting";

const ChattingList = ({onClick}) => {

  const chatList = useChatUserList();
  // const chatList = []
  console.log(chatList)
  // content, createAt, opponent_id, opponent_image,
  // opponent_nickname, reservation_id

  // const ws = useContext(WebSocketContext)

  // console.log('ws: ', ws)

  return (
    <>
      {chatList.length === 0 ? (
        <ChattingListDiv>
          <ChattingEmptyBox>
            요청한 상담이 없습니다.
          </ChattingEmptyBox>
        </ChattingListDiv>
      ) : (
        <ChattingListDiv>
          {chatList.map((item) => (
            <ChattingBox
              id={item.createdAt} key={item.createdAt} 
              onClick={() => onClick(item.opponent_id, item.reservation_id)}>
              {item.opponent_image !== "undefined" ? (
                <ChattingImg id="chat_img"src={item.opponent_image} />
              ) : (
                <ProfileImgIcon size="chat">
                  <FontAwesomeIcon
                    style={{ fontSize: "35px" }}
                    icon={faUser}
                  />
                </ProfileImgIcon>
              )}

              <ChattingTextDiv>
                <ChattingText size="big" id="chat_nickname">{item.opponent_nickname}</ChattingText>
                <ChattingText size="medium">{item.content}</ChattingText>
              </ChattingTextDiv>

              <ChattingReserv state="complete" />
            </ChattingBox>
          ))}
        </ChattingListDiv>
      )}
      
    </>
  );
};

export default ChattingList;
