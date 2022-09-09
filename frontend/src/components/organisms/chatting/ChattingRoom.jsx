import {
  ChattingRoomHeader,
  ChattingImg,
  ChattingText,
  ChatBigDiv,
  ChatDiv,
  ChatContents,
  ChatDate,
  ChatInputDiv,
  ChatBtn,
  ChatImageInput,
  ChatImageLabel,
  ChatInput,
} from "../../../styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { WebSocketContext } from "../../templates/Chatting";
import { useEffect } from "react";
import { useState } from "react";
import { getCookie } from "../../../config/cookie";
import { useRef } from "react";
import useChatRecord from "../../../hooks/useChatRecord";
import { useParams } from "react-router-dom";

const ChattingRoom = ({ opponent, onPlusClick }) => {
  const ws = useContext(WebSocketContext)
  const [content, setContent] = useState('')
  const [records, setRecords] = useState([])
  const params = useParams();
  const subject_id = params.id;
  const reservation_id = params.reservation_id;
  const contentInput = useRef()

  const message = useChatRecord({
    subject_id: subject_id,
    reservation_id: reservation_id
  })

  // content: "안녕하세요! 상담문의 드립니다!"
  // id: 43
  // mine: true
  // receiver: "63159296a5ef1d69772dc02c"
  // time: "2022-09-09T10:37:35.301400"
  useEffect(() => {
    console.log('message: ', message)
  }, [message])

  useEffect(() => {

    contentInput.current.focus()

    console.log("ws: ", ws)
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

  }, [])

  ws.current.onmessage = (evt) => {
    const data = JSON.parse(evt.data) 
    console.log('data.chat: ',data.chat)
  }
  
  const onSend = () => {
    const r = "63159296a5ef1d69772dc02c"
    const body = {
      sender: subject_id,
      receiver: subject_id,
      reservation_id : reservation_id,
      content: content
    }

    ws.current.send(JSON.stringify(body))
    console.log('send: ', body)
  }

  const onKeyUp = (e) => {
    if(e.key === 'Enter'){
      onSend()
    }
  }

  const messageList = [
    {
      id: 5,
      content: "안녕하세요 호갱님",
      createdAt: "2022-09-06 07:55:10",
      sender: "63158633a26479438d3c1bae",
      receiver: "6315859fa26479438d3c1b95",
    },
    {
      id: 6,
      content: "여기가 눈썹문신 맛집인가요",
      createdAt: "2022-09-06 07:55:57",
      sender: "6315859fa26479438d3c1b95",
      receiver: "63158633a26479438d3c1bae",
    },
    {
      id: 7,
      content: "슉 슈슉",
      createdAt: "2022-09-06 07:57:37",
      sender: "6315859fa26479438d3c1b95",
      receiver: "63158633a26479438d3c1bae",
    },
    {
      id: 8,
      content: "언제끝남?",
      createdAt: "2022-09-06 07:57:57",
      sender: "63158633a26479438d3c1bae",
      receiver: "6315859fa26479438d3c1b95",
    },
  ];
  return (
    <>
      <ChattingRoomHeader>
        <ChattingImg  />
        <ChattingText size="main"></ChattingText>
      </ChattingRoomHeader>

      <ChatBigDiv>
        <ChatDiv who="me">
          <ChatContents who="me">sibal</ChatContents>
          <ChatDate>2022년 12월 17일 12:17pm</ChatDate>
        </ChatDiv>
        <ChatDiv who="you">
          <ChatContents who="you">...</ChatContents>
          <ChatDate>2022년 8월 17일 5:17pm</ChatDate>
        </ChatDiv>
      </ChatBigDiv>

      <ChatInputDiv>
        <ChatBtn type="image" onClick={onPlusClick}>
          <FontAwesomeIcon icon={faPlus} />
        </ChatBtn>
        <ChatImageLabel htmlFor="input-chat-img">
          <FontAwesomeIcon icon={faImage} />
        </ChatImageLabel>
        <ChatImageInput type="file" id="input-chat-img" />

        <ChatInput 
          type="text"
          name="content"
          value={content}
          onChange={(e) => {setContent(e.target.value)}}
          ref={contentInput}
          onKeyUp={onKeyUp}
        />

        <ChatBtn type="submit" onClick={onSend}>전송</ChatBtn>
      </ChatInputDiv>
    </>
  );
};

export default ChattingRoom;
