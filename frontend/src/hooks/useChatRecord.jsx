import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { CHATAPIURL } from '../config/key';

// ### 채팅 내역 조회

// *채팅 페이지 → 오른쪽 채팅 박스 데이터를 반환하는 API 입니다.*

// - GET: /chat/message/:id
//     - id : reservation_id
// - Query : { subject_id }
//     - subject_id : 요청자의 id (user or tattooist)
// - Return : { success, [message] }
//     - message = { content, time, mine }
//         - mine = true / false
const useChatRecord = ({ subject_id, reservation_id }) => {
  const [message, setMessage] = useState([])

  const sendRequest = async() => {
    const query = `?subject_id=${subject_id}`
    const res = await axios
      .get(`${CHATAPIURL}/chat/message/${reservation_id}/${query}`)

    if(res.data.success){
      console.log('chat record res.data: ',res.data)
      setMessage(res.data.messagelist)
    } else {
      console.log('get chat record fail')
    }
  }

  useEffect(() => {
    sendRequest()
  }, [reservation_id, subject_id])

  return message
};

export default useChatRecord;