import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIURL } from '../config/key';

/** 예약 세부 페이지 || 채팅방 예약 페이지 / 예약 디테일 데이터 API
 * @returns 예약, 작업 디테일 데이터 
 */
const useReservationDetail = () => {
  const params = useParams();
  const id = params.reservation_id;
  const [reservation, setReservation] = useState({})
  const [procedureInfo, setProcedureInfo] = useState({})

  const sendRequest = async() => {
    const res = await axios.get(`${APIURL}/reservation/${id}`)

    if(res.data.success){
      setReservation(res.data.reservation)
      setProcedureInfo(res.data.procedure_info)
    } else {
      console.log('reservation detail fail')
      console.log(res.data)
      console.log(id)
    }
  }

  useEffect(() => {
    sendRequest();
  }, [id])

  return [reservation, procedureInfo]
};

export default useReservationDetail;