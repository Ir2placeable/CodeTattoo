import React from "react";
import { ChatImageInput, ChatImageLabel } from "../../../styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

/** 상위 컴포넌트 === ChattingRoom.jsx
 * 채팅 페이지 / 이미지 선택 버튼
 * @param {Function} onSelectFile 파일 선택  
 */

const ChattingImgChoice = ({onSelectFile}) => {
  return (
    <>
      <ChatImageLabel htmlFor="input-chat-img">
        <FontAwesomeIcon icon={faImage} />
      </ChatImageLabel>
      <ChatImageInput type="file" id="input-chat-img" onChange={onSelectFile}/>
    </>
  );
};

export default React.memo(ChattingImgChoice);
