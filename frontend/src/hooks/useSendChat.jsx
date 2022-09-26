import axios from 'axios';
import React from 'react';
import { CHATAPIURL } from '../config/key';

/**
 * 채팅 페이지 / 채팅 전송 API
 * @returns 채팅 전송 API 함수
 */
const useSendChat = () => {

  const sendRequest = async(body) => {
    const res = await axios.post(`${CHATAPIURL}/chat/send`, body)

    if(res.data.success){
      console.log('send chat success')
      return res.data.url;
    } else {
      console.log('send chat fail')
      return false;
    }
  }
  
  return sendRequest
};

export default useSendChat;