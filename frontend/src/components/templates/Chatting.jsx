import React, { useEffect, useState } from "react";
import { ChattingDiv, ChattingHeader } from "../../styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import ChattingList from "../organisms/chatting/ChattingList";
import { useRef } from "react";
import { WEBSOCKETURL } from "../../config/key";
import { Outlet, useNavigate } from "react-router-dom";
import { getCookie } from "../../config/cookie";

export const WebSocketContext = React.createContext(null);

const Chatting = () => {
  let ws = useRef(null);

  let userid = getCookie("user_id");
  if (!userid) {
    userid = getCookie("tattooist_id");
  }

  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(WEBSOCKETURL);

      ws.current.onopen = () => {
        console.log("websocket is connected");

        const body = {
          sender: userid,
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

  const navigate = useNavigate();

  const [data, setData] = useState({});

  const dataSetting = async (item) => {
    setData(item);
  };

  const onClick = ({ e, item }) => {
    if (e.target === e.currentTarget) {
      dataSetting(item).then(() => {
        navigate(`${item.reservation_id}`);
      });
    }
  };

  return (
    <>
      <WebSocketContext.Provider value={ws}>
        <ChattingDiv>
          <ChattingHeader>
            <FontAwesomeIcon icon={faCommentDots} /> Chatting
          </ChattingHeader>

          <ChattingList onClick={onClick} />

          {/* <ChattingRecord /> */}
          <Outlet context={{ data }} />
        </ChattingDiv>
      </WebSocketContext.Provider>
    </>
  );
};

export default Chatting;