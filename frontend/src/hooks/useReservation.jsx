import axios from 'axios';
import React, { memo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCookie } from '../config/cookie';
import { APIURL } from '../config/key';

// ### 타투이스트 예약 페이지

// - GET : /reservations/:id
//     - id : tattooist_id
// - Query : None
// - Return : { success, [reservations] }
//     - reservations : { reservation_id, image, 
//       user_id, user_nickname, date, cost, procedure_status }
const useReservation = memo(() => {
  const [reservations, setReservations] = useState([]);

  const sendRequest = async() => {
    const res = await axios.get(`${APIURL}/reservations/${getCookie('tattooist_id')}`)

    if(res.data.success){
      setReservations(res.data.reservations);
    }else {
      console.log('reservation api fail')
      console.log(res.data);
    }
  }

  useEffect(() => {
    sendRequest();
  }, []);

  return reservations;
});

export default useReservation;