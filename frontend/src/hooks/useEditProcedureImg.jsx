import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { APIURL } from '../config/key';

/** 예약 도안 수정 API
 * 채팅 방 예약 페이지 || 예약 세부 페이지
 * @returns 예약 도안 수정 API 함수
 */
const useEditProcedureImg = () => {
  const params = useParams();
  const id = params.reservation_id;

  const sendRequest = async({ image, mime }) => {
    const res = await axios.post(`${APIURL}/reservation/${id}`, {
      image, mime
    })

    if(res.data.success){
      console.log('edit reservation img success')
    } else {
      console.log('edit reservation img fail')
    }

  }
  return sendRequest
};

export default useEditProcedureImg;