import axios from 'axios';
import React from 'react';
import { CHATAPIURL } from '../config/key';


// - POST: /chat/send
// - Body : { sender, receiver, content }
//     - sender → 발신자 id 
//     (String, 즉, 현재 페이지에 접속하여 보내기 버튼을 누른 사용자}
//     - receiver → 수신자 id (String, 메시지를 받을 사용자}
//     - content → 메시지 내용 (String, 최대 255자)
//     - created_at → 타임스탬프 (String으로 전달 요망)
//     - reservation_id → 예약 id 
//     (String, 예약 고유 id (room 대용으로 사용)
const useSendChat = () => {

  const sendRequest = async({sender, receiver, content, reservation_id}) => {
    const created_at = new Date().getTime();
    const res = await axios.post(`${CHATAPIURL}/chat/send`, {
      sender, receiver, content, reservation_id
    })

    if(res.data.success){
      console.log('send chat success')
    } else {
      console.log('send chat fail')
    }
  }
  
  return sendRequest
};

export default useSendChat;