import React from "react";
import { ChatDiv, ChatContents, ChatDate } from "../../../styledComponents";

/** 상위 컴포넌트 === ChattingRoom.jsx
 * 채팅 페이지 / 채팅 메세지
 * @param {Object} item 채팅 메세지 데이터 
 */

const ChattingMessage = ({ item }) => {
  return (
    <>
      <ChatDiv who={item.mine ? "me" : "you"}>
        <ChatContents who={item.mine ? "me" : "you"}>{item.content}</ChatContents>
        <ChatDate>{item.time}</ChatDate>
      </ChatDiv>
    </>
  );
};

export default React.memo(ChattingMessage);
