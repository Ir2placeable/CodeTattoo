import React, { useEffect, useState, useRef } from "react";
import { WEBSOCKETURL } from "./config/key";

const SocketTest = () => {
  let ws = useRef(null);

  if(!ws.current){
    ws.current = new WebSocket(WEBSOCKETURL)

    ws.current.onopen = () => {
      console.log('connected to ', WEBSOCKETURL)
    }
    ws.current.onclose = (err) => {
      console.log('disconnect from: ', WEBSOCKETURL)
      console.log(err)
    }
    ws.current.onerror = (err) => {
      console.log("connection error: ", WEBSOCKETURL)
      console.log(err)
    }
  }

  return (
    <div>
    </div>
  );
};

export default SocketTest;