import {
  ChattingRoomHeader,
  ChattingImg,
  ChattingText,
  ChatBigDiv,
  ChatInputDiv,
  ChatBtn,
  ChatInput,
  ProfileImgIcon,
  ExitChattingRoom,
  ChatChoosedImgDiv,
  ChatChoosedImg,
  ChatDeleteImgIcon
} from "../../../styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlus, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
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
import { WEBSOCKETURL } from "../../../config/key";
import moment from "moment";

const ChattingRoom = ({ data, onPlusClick }) => {
  const ws = useContext(WebSocketContext);
  const [content, setContent] = useState("");
  const [src, setSrc] = useState(null);
  const [img, setImg] = useState({
    image: '',
    mime: ''
  })

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

  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(WEBSOCKETURL);

      ws.current.onopen = () => {
        console.log("websocket is connected");

        const body = {
          sender: subject_id,
          enter_room: true,
        };

        ws.current.send(JSON.stringify(body));
      };
      ws.current.onclose = (err) => {
        console.log("websocket is disconnected");
        console.log(err);
      };
      ws.current.onerror = (err) => {
        console.log("websocket connection error");
        console.log(err);
      };
    }
  }, []);

  const message = useChatRecord({
    subject_id: subject_id,
    reservation_id: reservation_id,
  });
  

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(message);
  }, [message, messages]);

  if(ws.current){
    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);

      const temp = {
        id: data.create_at,
        content: data.content,
        time: data.create_at,
        mine: false,
        receiver: data.sender,
        is_image: data.is_image
      };

      const prev = messages;
      prev.push(temp)
      setMessages([...prev]);
    };
  }

  const sendChat = useSendChat()
  const onSend = () => {

    if(!content && (!src || !img.image || !img.mime)){
      console.log('no content')
      return;
    }

    const now = moment().format('YYYY년 MM월 DD일 HH:mm:ss')
    const body = {
      sender: subject_id,
      receiver: data.opponent_id,
      reservation_id: reservation_id,
      content: content,
      created_at: now,
      enter_room: false,
      is_image: false
    };

    if(!body.content) {
      body.content = {
        image: img.image,
        mime: img.mime,
        src: src
      }
      body.is_image = true
    }

    sendChat(body)
    ws.current.send(JSON.stringify(body));
    setContent("");
    setSrc("");
    setImg({
      image: '',
      mime: ""
    })

    const temp = {
      id: body.created_at,
      mine: true,
      content: body.content,
      time: body.created_at,
      receiver: body.receiver,
      is_image: body.is_image
    };

    if(body.content.image){
      temp.content = body.content.src
    }

    const prev = messages;
    prev.push(temp)
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
  };
  const onLoad = () => {
    const parsing = src.split(",");
    let _mime = parsing[0].split(";")[0];
    _mime = _mime.substr(5);
    let _data = parsing[1];

    setImg({
      data: _data,
      mime: _mime,
    });
  }
  
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
        {src && (
          <ChatChoosedImgDiv>
            <ChatChoosedImg src={src} onLoad={onLoad} />

            <ChatDeleteImgIcon onClick={() => setSrc('')}>
              <FontAwesomeIcon icon={faXmark} />
            </ChatDeleteImgIcon>
          </ChatChoosedImgDiv>
        )}
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
          disabled={src ? true : false}
        />

        <ChatBtn type="submit" onClick={onSend}>
          전송
        </ChatBtn>
      </ChatInputDiv>
    </>
  );
};

export default ChattingRoom;