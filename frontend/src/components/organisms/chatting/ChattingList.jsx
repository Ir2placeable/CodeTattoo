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
  ProfileImgIcon,
} from "../../../styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ChattingList = ({onClick}) => {
  // 실시간 업데이트를 어떻게 ?
  // const chatList = useChatUserList();
  const chatList = [
    {
      content: "아아아아아아",
      createdAt: "2022-09-06 07:59:52.0",
      opponent_id: "631586d4a26479438d3c1bf2",
      opponent_image:
        "https://codetattoo.kr.object.ncloudstorage.com/631586d4a26479438d3c1bf2",
      opponent_nickname: "타투아영",
    },
    {
      content: "안성열 바보",
      createdAt: "2022-09-06 07:58:56.0",
      opponent_id: "63158661a26479438d3c1bbc",
      opponent_image:
        "https://codetattoo.kr.object.ncloudstorage.com/63158661a26479438d3c1bbc",
      opponent_nickname: "개발자아님요",
    },
    {
      content: "언제끝남?",
      createdAt: "2022-09-06 07:57:57.0",
      opponent_id: "63158633a26479438d3c1bae",
      opponent_image: "undefined",
      opponent_nickname: "개발자아님요",
    },
  ];

  return (
    <>
      {chatList.length === 0 ? (
        <EmptyBox>채팅이 없어요</EmptyBox>
      ) : (
        <ChattingListDiv>
          {chatList.map((item) => (
            <ChattingBox id={item.createdAt} key={item.createdAt} onClick={onClick}>
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
