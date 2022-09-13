import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { CHATAPIURL } from '../config/key';

/** 채팅 페이지 / 채팅 내역 데이터 API
 * @param {String} subject_id 요청자의 ID
 * @param {String} reservation_id 예약 ID
 * @returns 채팅 내역 반환
 */
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