import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { APIURL } from '../config/key';

/** 예약 정보 수정 API
 * 채팅 방 예약 페이지 || 예약 세부 페이지
 * @returns 예약 정보 수정 API 함수
 */
const useEditProcedureInfo = () => {
  const params = useParams();

  const sendRequest = async({ 
    date, time_slot, cost, body_part }) => {
    const id = params.reservation_id;

    const res = await axios.patch(`${APIURL}/reservation/${id}`, {
      date, time_slot, cost, body_part
    })

    if(res.data.success){
      console.log('edit procedure edit success')
    } else {
      console.log('edit procedure edit fail')
    }
  }

  return sendRequest
};

export default useEditProcedureInfo;