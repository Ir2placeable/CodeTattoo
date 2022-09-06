import {
  ChatDraftInfoLabel,
  ChatDraftInfoInput,
  ChatDraftInputDiv,
} from "../../../styledComponents";

const ChatDraftInfo = () => {
  return (
    <>
      <ChatDraftInputDiv>
        <ChatDraftInfoLabel>가격</ChatDraftInfoLabel>
        <ChatDraftInfoInput />
      </ChatDraftInputDiv>
      <ChatDraftInputDiv>
        <ChatDraftInfoLabel>일정</ChatDraftInfoLabel>
        <ChatDraftInfoInput />
      </ChatDraftInputDiv>
      <ChatDraftInputDiv>
        <ChatDraftInfoLabel>부위</ChatDraftInfoLabel>
        <ChatDraftInfoInput />
      </ChatDraftInputDiv>
    </>
  );
};

export default ChatDraftInfo;
