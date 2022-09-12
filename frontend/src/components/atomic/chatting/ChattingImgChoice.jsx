import React from "react";
import { ChatImageInput, ChatImageLabel } from "../../../styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

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
