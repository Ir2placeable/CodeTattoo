import React, { useEffect, useState } from "react";
import {
  ChattingDiv,
  ChattingHeader,
} from "../../styledComponents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import ChattingList from "../organisms/chatting/ChattingList";
import ChattingRoom from "../organisms/chatting/ChattingRoom";
import { useRef } from "react";
import { CHATAPIURL, WEBSOCKETURL } from "../../config/key";
import ChattingRecord from "../organisms/chatting/ChattingRecord";
import { Outlet, useNavigate } from "react-router-dom";
import { getCookie } from "../../config/cookie";
import axios from "axios";

export const WebSocketContext = React.createContext(null)

const Chatting = () => {
  let ws = useRef(null)
  const [opponentId, setOpponentId] = useState('')
  const [reservationId, setReservationId] = useState('')

  useEffect(() => {
    if(!ws.current){
      ws.current = new WebSocket(WEBSOCKETURL)
  
      ws.current.onopen = () => {
        console.log("websocket is connected")
      }
      ws.current.onclose = (err) => {
        console.log("websocket is disconnected")
        console.log(err)
      }
      ws.current.onerror = (err) => {
        console.log("websocket connection error")
        console.log(err)
      }
    }
  }, [])

  const navigate = useNavigate()
  const onClick = (opponent_id, reservation_id) => {
    console.log(opponent_id)
    setOpponentId(opponent_id)
    setReservationId(reservation_id)
  }

  useEffect(() => {
    // console.log('oid: ', opponentId)
    navigate(`${reservationId}`)
  }, [reservationId])

  useEffect(() => {
    let userid = getCookie('user_id')
    if(!userid){
      userid = getCookie('tattooist_id');
    }

    console.log('send socket')
    axios.post(`${CHATAPIURL}/chat/user`, {
      userid: userid
    }).then((res) => {
      console.log(res)
    })

  }, [])

  return (
    <>
    <WebSocketContext.Provider value={ws}>
      <ChattingDiv>
        <ChattingHeader>
          <FontAwesomeIcon icon={faCommentDots} /> Chatting
        </ChattingHeader>

        <ChattingList onClick={onClick} />

        {/* <ChattingRecord /> */}
        <Outlet context={{opponentId}} />

      </ChattingDiv>
    </WebSocketContext.Provider>
    </>
  );
};

export default Chatting;

{
  /* <ChattingBox>
            <ChattingImg src='../../img/react.jpg' />

            <ChattingInfoDiv>
              <ChattingTextDiv>
                <ChattingText size='big'>킹아영</ChattingText>
                <ChattingText size="medium">채팅 마지막 내용 미리보기</ChattingText>
              </ChattingTextDiv>

              <ChattingTextDiv sort="right">
                <ChattingText size="small">2022년 8월 17일의 예약 손님</ChattingText>
                <ChattingText size="small">010-6595-0827</ChattingText>
                <ChattingText size="small">200,000원</ChattingText>
              </ChattingTextDiv>

              <ChattingTime>
                오후 5:37
              </ChattingTime>

            </ChattingInfoDiv>
          </ChattingBox> */
}
