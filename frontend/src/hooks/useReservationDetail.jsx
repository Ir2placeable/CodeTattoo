import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIURL } from '../config/key';

// ### 예약 세부 및 작업 페이지

// *타투이스트 예약 탭에서 “예약세부" 버튼과 연결하는 API 입니다.*

// *타투이스트 예약 탭에서 “작업페이지" 버튼과 연결하는 API 입니다.*

// *Figma - tattooist view의 채팅 페이지에서 “+” 버튼과 연결하는 API 입니다.*

// - GET : /reservation/:id
//     - id : reservation_id
// - Query : None
// - Return : { success, reservation }
//     - confirmed = false → { success, reservation }
//         - reservation = { customer_id, customer_nickname, 
//           tattooist_id, tattooist_nickname, date, time_slot, 
//           cost, body_part, confirmed, procedure_status, image }
//     - confirmed = true → { success, reservation, procedure_info }
//         - procedure_info = { inks, niddle, depth, machine }

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
    }
  }

  useEffect(() => {
    sendRequest();
  }, [])

  return [reservation, procedureInfo]
};

export default useReservationDetail;