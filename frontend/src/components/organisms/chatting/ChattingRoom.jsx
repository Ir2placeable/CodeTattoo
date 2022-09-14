import {
  ChattingRoomHeader,
  ChattingImg,
  ChattingText,
  ChatBigDiv,
  ChatInputDiv,
  ChatBtn,
  ChatInput,
  ProfileImgIcon,
  ExitChattingRoom
} from "../../../styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { WebSocketContext } from "../../templates/Chatting";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import useChatRecord from "../../../hooks/useChatRecord";
import { useParams } from "react-router-dom";
import ChattingMessage from "../../atomic/chatting/ChattingMessage";
import ChattingImgChoice from "../../atomic/chatting/ChattingImgChoice";
import useSendChat from "../../../hooks/useSendChat";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

/**
 * 상위 컴포넌트 === ChattingRecord.jsx
 * 채팅페이지 / 채팅방
 * @param {Array} data 채팅 기록 데이터
 * @param {Function} onPlusClick 토글 함수 
 */

const ChattingRoom = ({ data, onPlusClick }) => {
  const ws = useContext(WebSocketContext);
  const [content, setContent] = useState("");
  const [records, setRecords] = useState([]);
  const [src, setSrc] = useState(null);

  const params = useParams();
  const subject_id = params.id;
  const reservation_id = params.reservation_id;
  const contentInput = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    // 현재 스크롤 위치 === scrollRef.current.scrollTop
      // 스크롤 길이 === scrollRef.current.scrollHeight
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });

  const message = useChatRecord({
    subject_id: subject_id,
    reservation_id: reservation_id,
  });
  

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(message);
    // console.log('message: ', message);
    console.log("messages: ", messages);
  }, [message, messages]);

  ws.current.onmessage = (e) => {
    console.log("e: ", e);
    const data = JSON.parse(e.data);
    console.log("onmessage data: ", data);

    const temp = {
      id: 14,
      content: data.content,
      time: data.create_at,
      mine: false,
      receiver: data.sender,
    };

    const prev = messages;
    prev.push(temp)
    console.log("prev: ", prev);
    setMessages([...prev]);
  };

  // parameter
  // body: { sender, receiver, content, reservation_id, created_at }
  const sendChat = useSendChat()
  const onSend = () => {
//     찐타투아영 6320158164414f2c23d6d22d
// 찐유저아영 6320155f64414f2c23d6d229

    const body = {
      sender: subject_id,
      receiver: data.opponent_id,
      reservation_id: reservation_id,
      content: content,
      created_at: Math.floor(Date.now() / 1000),
      enter_room: false,
    };

    sendChat(body)
    ws.current.send(JSON.stringify(body));
    setContent("");
    console.log("send: ", body);

    const temp = {
      id: body.created_at,
      mine: true,
      content: content,
      time: body.created_at,
      receiver: body.receiver,
    };

    const prev = messages;
    prev.push(temp)
    console.log("prev: ", prev);
    setMessages([...prev]);
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      onSend();
    }
  };


  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      // base64 형식으로 읽어오기
      reader.readAsDataURL(e.target.files[0]);

      reader.addEventListener("load", () => {
        setSrc(reader.result);
      });
    }
    // console.log(src);
  };
  
  const goExit = (e) => {
    window.location.replace(`/#/chat/${subject_id}`)
  }

  return (
    <>
      <ChattingRoomHeader>
        {data.opponent_image !== "undefined" ? (
          <ChattingImg src={data.opponent_image} />
        ) : (
          <ProfileImgIcon size="chat">
            <FontAwesomeIcon style={{ fontSize: "35px" }} icon={faUser} />
          </ProfileImgIcon>
        )}

        <ChattingText size="main">{data.opponent_nickname}</ChattingText>

        <ExitChattingRoom onClick={goExit}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </ExitChattingRoom>
      </ChattingRoomHeader>

      <ChatBigDiv id="chat" ref={scrollRef}>
        {messages.length !== 0 &&
          messages.map((item) => <ChattingMessage key={item.id} item={item} />)}
      </ChatBigDiv>

      <ChatInputDiv>
        <ChatBtn type="image" onClick={onPlusClick}>
          <FontAwesomeIcon icon={faPlus} />
        </ChatBtn>

        <ChattingImgChoice onSelectFile={onSelectFile} />

        <ChatInput
          type="text"
          name="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          ref={contentInput}
          onKeyUp={onKeyUp}
        />

        <ChatBtn type="submit" onClick={onSend}>
          전송
        </ChatBtn>
      </ChatInputDiv>
    </>
  );
};

export default ChattingRoom;
