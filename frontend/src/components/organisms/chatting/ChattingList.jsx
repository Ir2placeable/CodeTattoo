import React from "react";
import useChatUserList from "../../../hooks/useChatUserList";
import { ChattingListDiv, ChattingEmptyBox } from "../../../styledComponents";
import ChattingItem from "../../atomic/chatting/ChattingItem";
import chatList from "../../../dummy/chatList";

/**
 * 상위 컴포넌트 === Chatting.jsx
 * 채팅 페이지/ 채팅 유저 목록
 * @param {Function} onClick Chatting Room에 데이터 전달 & Style 적용
 */

const ChattingList = ({ onClick }) => {
  // get chatting list api
  // const chatList = useChatUserList();
  // const chatList = []

  return (
    <>
      {chatList.length === 0 ? (
        <ChattingListDiv>
          <ChattingEmptyBox>요청한 상담이 없습니다.</ChattingEmptyBox>
        </ChattingListDiv>
      ) : (
        <ChattingListDiv>
          {chatList.map((item) => (
            <ChattingItem key={item.createdAt} item={item} onClick={onClick} />
          ))}
        </ChattingListDiv>
      )}
    </>
  );
};

export default ChattingList;
