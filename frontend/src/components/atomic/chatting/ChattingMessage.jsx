import React from "react";
import { useEffect, useState } from "react";
import { ChatDiv, ChatContents, ChatDate, ChatImg } from "../../../styledComponents";

/** 상위 컴포넌트 === ChattingRoom.jsx
 * 채팅 페이지 / 채팅 메세지
 * @param {Object} item 채팅 메세지 데이터 
 */

const ChattingMessage = ({ item }) => {
  const [type, setType] = useState('text')

  useEffect(() => {
    if(item.is_image){
      setType('image')
    } else {
      if(item.tattoo_id){
        setType('tattoo')
      }
    }
  }, [])

  return (
    <>
      <ChatDiv who={item.mine ? "me" : "you"}>
        <ChatContents who={item.mine ? "me" : "you"}
          type={type}
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
