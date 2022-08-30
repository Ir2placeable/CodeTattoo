import axios from 'axios';
import React, { memo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCookie } from '../config/cookie';
import { APIURL } from '../config/key';

// - GET : /reservations
// - Query : { tattooist_id }
// - Return : { success, [reservations] }
//     - reservations = { 
//       reservation_id, image, customer_id, 
//       customer_nickname, date, time_slot, cost, 
//       body_part, procedure_status, confirmed 
//     }
const useReservation = () => {
  const [reservations, setReservations] = useState([]);

  const sendRequest = async() => {
    const res = await axios.get(`${APIURL}/reservations/?tattooist_id=${getCookie('tattooist_id')}`)

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
};

export default useReservation;