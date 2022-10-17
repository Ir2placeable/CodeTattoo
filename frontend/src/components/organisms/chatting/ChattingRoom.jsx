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
  ChatDeleteImgIcon,
  ChattingRoomDiv
} from "../../../styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlus, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { WebSocketContext } from "../../templates/Chatting";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import useChatRecord from "../../../hooks/useChatRecord";
import { useOutletContext, useParams } from "react-router-dom";
import ChattingMessage from "../../atomic/chatting/ChattingMessage";
import ChattingImgChoice from "../../atomic/chatting/ChattingImgChoice";
import useSendChat from "../../../hooks/useSendChat";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { WEBSOCKETURL } from "../../../config/key";
import moment from "moment";
import { getCookie } from "../../../config/cookie";
import { goChatting, goChattingReserv, goTattooistDetail } from "../../../config/navigate";

/**
 * 상위 컴포넌트 === Chatting.jsx
 * 채팅 페이지 / 채팅 방
 */
const ChattingRoom = () => {
  // 채팅 정보 
  const { data } = useOutletContext();
  // 전역 웹소켓 변수
  const ws = useContext(WebSocketContext);
  // 전송할 채팅 텍스트 상태
  const [content, setContent] = useState("");
  // 선택된 사진 소스 상태
  const [src, setSrc] = useState(null);
  // 선택된 사진 base64 상태
  const [img, setImg] = useState({
    image: '',
    mime: ''
  })

  const params = useParams();
  // 현재 로그인된 유저의 id
  const subject_id = params.id;
  // 예약 id
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

  // 채팅 내역 받아오는 api
  const message = useChatRecord({
    subject_id: subject_id,
    reservation_id: reservation_id,
  });
  
  // 채팅 내역 & 실시간 채팅 내용을 저장할 상태 배열
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(message);
  }, [message, messages]);

  if(ws.current){
    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);

      console.log(data)

      const temp = {
        id: new Date().getTime(),
        content: data.content,
        created_at: data.created_at,
        mine: false,
        receiver: data.sender,
        is_image: data.is_image
      };

      
      const prev = messages;
      prev.push(temp)
      setMessages([...prev]);
    };
  }

  // 채팅 전송 API
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
      body.image = img.image;
      body.mime = img.mime;
      body.is_image = true
    }

    const wsBody = {
      sender: body.sender,
      receiver: body.receiver,
      reservation_id: body.reservation_id,
      content: body.content,
      created_at: body.created_at,
      is_image: body.is_image,
      enter_room: false
    }

    const temp = {
      id: new Date().getTime(),
      mine: true,
      content: body.content,
      created_at: body.created_at,
      receiver: body.receiver,
      is_image: body.is_image
    };

    sendChat(body)
      .then((res) => {
        if(body.is_image){
          wsBody.content = res;
          wsBody.is_image = true;
          temp.content = res;
        }
        ws.current.send(JSON.stringify(wsBody));

        setContent("");
        setSrc("");
        setImg({
          image: '',
          mime: ""
        })
    
        const prev = messages;
        prev.push(temp)
        setMessages([...prev]);
      })
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
      image: _data,
      mime: _mime,
    });
  }
  
  const goExit = () => {
    goChatting(subject_id);
  }

  const goTattooisMyPage = () => {
    if(getCookie('user_id')){
      goTattooistDetail(data.opponent_id);
    }
  }

  const goReservation = () => {
    goChattingReserv(params.id, params.reservation_id);
  }

  return (
    <>
    <ChattingRoomDiv>
      <ChattingRoomHeader>
        {data.opponent_image !== "undefined" ? (
          <ChattingImg src={data.opponent_image} onClick={goTattooisMyPage} />
        ) : (
          <ProfileImgIcon size="chat" onClick={goTattooisMyPage} >
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

        {/* onClick={onPlusClick} */}
        <ChatBtn type="image" onClick={goReservation}>
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
    </ChattingRoomDiv>
    </>
  );
};

export default ChattingRoom;
