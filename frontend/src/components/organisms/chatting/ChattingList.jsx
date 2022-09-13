import React from "react";
import useChatUserList from "../../../hooks/useChatUserList";
import { ChattingListDiv, ChattingEmptyBox } from "../../../styledComponents";
import ChattingItem from "../../atomic/chatting/ChattingItem";

/**
 * 상위 컴포넌트 === Chatting.jsx
 * 채팅 유저 목록
 * @param {Function} onClick 
 */

const ChattingList = ({ onClick }) => {
  const chatList = useChatUserList();

  return (
    <>
      {chatList.length === 0 ? (
        <ChattingListDiv>
          <ChattingEmptyBox>요청한 상담이 없습니다.</ChattingEmptyBox>
        </ChattingListDiv>
      ) : (
        <ChattingListDiv>
          {chatList.map((item) => (
            <ChattingItem  key={item.createdAt} item={item} onClick={onClick} />
          ))}
        </ChattingListDiv>
      )}
    </>
  );
};

export default ChattingList;
