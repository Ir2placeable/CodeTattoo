import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIURL } from '../config/key';

// ### 예약 세부

// *~~채팅에 사용 되는 API 입니다.~~*

// **Return 중 필요한 정보만 가져다가 쓸 것.**

// - GET : /reservation/:id
//     - id : reservation_id
// - Query : None
// - Return : { success, reservation }
//     - reservation = { customer_id, customer_nickname, tattooist_id, 
//   tattooist_nickname, date, time_slot, cost, body_part, confirmed }
const useReservationDetail = () => {
  const params = useParams();
  const id = params.reservation_id;
  const [reservation, setReservation] = useState({})

  const sendRequest = async() => {
    const res = await axios.get(`${APIURL}/reservation/${id}`)

    if(res.data.success){
      setReservation(res.data.reservation)
    } else {
      console.log('reservation detail fail')
    }
  }

  useEffect(() => {
    sendRequest();
  }, [])

  return reservation
};

export default useReservationDetail;