import {
  ChatDraftInfoLabel,
  ChatDraftInfoInput,
  ChatDraftInputDiv,
} from "../../../styledComponents";

const ChatDraftInfo = () => {
  return (
    <>
      <ChatDraftInputDiv>
        <ChatDraftInfoLabel htmlFor="cost">가격</ChatDraftInfoLabel>
        <ChatDraftInfoInput id="cost" />
      </ChatDraftInputDiv>
      <ChatDraftInputDiv>
        <ChatDraftInfoLabel htmlFor="date">일정</ChatDraftInfoLabel>
        <ChatDraftInfoInput id="date"/>
      </ChatDraftInputDiv>
      <ChatDraftInputDiv>
        <ChatDraftInfoLabel>부위</ChatDraftInfoLabel>
        <ChatDraftInfoInput />
      </ChatDraftInputDiv>
    </>
  );
};

export default ChatDraftInfo;
