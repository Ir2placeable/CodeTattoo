import React from "react";
import { ChatDiv, ChatContents, ChatDate } from "../../../styledComponents";

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
