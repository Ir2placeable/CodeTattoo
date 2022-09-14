import React from "react";
import { ChatDiv, ChatContents, ChatDate, ChatImg } from "../../../styledComponents";

const ChattingMessage = ({ item }) => {
  return (
    <>
      <ChatDiv who={item.mine ? "me" : "you"}>
        <ChatContents who={item.mine ? "me" : "you"}
          type={item.is_image ? "image" : "text"}
        >
          {item.is_image ? (
            <ChatImg src={item.content} />
          ) : (
            <>{item.content}</>
          )}
        </ChatContents>

        <ChatDate>{item.time}</ChatDate>
      </ChatDiv>
    </>
  );
};

export default React.memo(ChattingMessage);
