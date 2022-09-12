import React from "react";
import useChatUserList from "../../../hooks/useChatUserList";
import { ChattingListDiv, ChattingEmptyBox } from "../../../styledComponents";
import ChattingItem from "../../atomic/chatting/ChattingItem";

const ChattingList = ({ onClick }) => {
  // const chatList = useChatUserList();
  const chatList = [
    {
      reservation_id : "123",
      content: "아아 마이크 테스트",
      opponent_id: "631589dda5ef1d69772dbbc0",
      opponent_image:
        "https://codetattoo.kr.object.ncloudstorage.com/631589dda5ef1d69772dbbc0",
      opponent_nickname: "타투구경하러왔어요",
      confirmed: false,
    },
    {
      reservation_id : "123",
      content: "슈슈슈슈슈슈슈슛",
      opponent_id: "631585ffa26479438d3c1ba2",
      opponent_image: "undefined",
      opponent_nickname: "유저아영",
      confirmed: true,
    },
    {
      reservation_id : "123",
      content: "언제끝남?",
      opponent_id: "6315859fa26479438d3c1b95",
      opponent_image: "undefined",
      opponent_nickname: "아토왕",
      confirmed: false,
    },
  ];
  return (
    <>
      {chatList.length === 0 ? (
        <ChattingListDiv>
          <ChattingEmptyBox>요청한 상담이 없습니다.</ChattingEmptyBox>
        </ChattingListDiv>
      ) : (
        <ChattingListDiv>
          {chatList.map((item) => (
            <ChattingItem  key={item.opponent_id} item={item} onClick={onClick} />
          ))}
        </ChattingListDiv>
      )}
    </>
  );
};

export default ChattingList;
