import React from "react";
import { ChatDiv, ChatContents, ChatDate, ChatImg } from "../../../styledComponents";

/** 상위 컴포넌트 === ChattingRoom.jsx
 * 채팅 페이지 / 채팅 메세지
 * @param {Object} item 채팅 메세지 데이터 
 */

const ChattingMessage = ({ item }) => {
  return (
    <>
      <ChatDiv who={item.mine ? "me" : "you"}>
        <ChatContents who={item.mine ? "me" : "you"}
          type={item.is_image ? "image" : "text"}
        >
          {item.is_image ? (
            <ChatImg src={item.content}  />
          ) : (
            <>{item.content}</>
          )}
        </ChatContents>

        <ChatDate>{item.created_at}</ChatDate>
      </ChatDiv>
    </>
  );
};

export default ChattingMessage;
