import {
  ChattingRoomHeader,
  ChattingImg,
  ChattingText,
  ChatBigDiv,
  ChatInputDiv,
  ChatBtn,
  ChatInput,
  ProfileImgIcon,
} from "../../../styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { WebSocketContext } from "../../templates/Chatting";
import { useEffect } from "react";
import { useState } from "react";
import { getCookie } from "../../../config/cookie";
import { useRef } from "react";
import useChatRecord from "../../../hooks/useChatRecord";
import { useParams } from "react-router-dom";
import ChattingMessage from "../../atomic/chatting/ChattingMessage";
import ChattingImgChoice from "../../atomic/chatting/ChattingImgChoice";

const ChattingRoom = ({ data, onPlusClick }) => {
  const ws = useContext(WebSocketContext);
  const [content, setContent] = useState("");
  const [records, setRecords] = useState([]);
  const [src, setSrc] = useState(null);

  const params = useParams();
  const subject_id = params.id;
  const reservation_id = params.reservation_id;
  const contentInput = useRef();

  const message = useChatRecord({
    subject_id: subject_id,
    reservation_id: reservation_id,
  });

  useEffect(() => {
    console.log("message: ", message);
  }, [message]);

  useEffect(() => {
    contentInput.current.focus();

    console.log("ws: ", ws);
    // // 타투아영: 631586d4a26479438d3c1bf2
    // // 유저아영: 631585ffa26479438d3c1ba2
    // const src = '631586d4a26479438d3c1bf2'
    // const dest = '631585ffa26479438d3c1ba2'

    // let body = {
    //   sender: src,
    //   receiver: dest,
    //   reservation_id : "TestReservationId",
    //   content: "보내는 사람: f2"
    // }

    // if(getCookie('user_id')){
    //   body.sender = dest;
    //   body.receiver = src
    //   body.content = '보내는 사람: a2'
    // }

    // let jsonData = JSON.stringify(body);
    // ws.current.send(jsonData)
  }, []);

  ws.current.onmessage = (e) => {
    const data = JSON.parse(e.data);
    console.log("data.chat: ", data);
  };

  const onSend = () => {

    const body = {
      sender: subject_id,
      receiver: data.opponent_id,
      reservation_id: reservation_id,
      content: content,
    };

    const datas = {
      sender: subject_id,
      receiver: subject_id,
      reservation_id: reservation_id,
      content: content,
    };

    ws.current.send(JSON.stringify(datas));
    setContent("");
    console.log("send: ", datas);
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      onSend();
    }
  };
  console.log(data)


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

  return (
    <>
      <ChattingRoomHeader>
        {data.opponent_image !== 'undefined' ? (
          <ChattingImg src={data.opponent_image} />
        ) : (
          <ProfileImgIcon size="chat">
            <FontAwesomeIcon style={{ fontSize: "35px" }} icon={faUser} />
          </ProfileImgIcon>
        )}
        
        <ChattingText size="main">{data.opponent_nickname}</ChattingText>
      </ChattingRoomHeader>

      <ChatBigDiv>
        {message.map((item) => (
          <ChattingMessage key={item.id} item={item} />
        ))}
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

{
  /* <ChatBigDiv>
        <ChatDiv who="me">
          <ChatContents who="me">sibal</ChatContents>
          <ChatDate>2022년 12월 17일 12:17pm</ChatDate>
        </ChatDiv>
        <ChatDiv who="you">
          <ChatContents who="you">...</ChatContents>
          <ChatDate>2022년 8월 17일 5:17pm</ChatDate>
        </ChatDiv>
      </ChatBigDiv> */
}
