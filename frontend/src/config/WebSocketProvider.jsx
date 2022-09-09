import React from 'react';
import { useRef } from 'react';
import { WEBSOCKETURL } from './key';

const WebSocketContext = React.createContext(null)
export { WebSocketContext }

const WebSocketProvider = () => {
  let ws = useRef(null);

  if(!ws.current){
    ws.current = new WebSocket(WEBSOCKETURL);

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
  return (
    <WebSocketContext.Provider value={ws}>
      
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;