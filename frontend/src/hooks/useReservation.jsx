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

  const [confirmed, setConfirmed] = useState([])
  const [pending, setPending] = useState([])

  const sendRequest = async() => {
    const res = await axios.get(`${APIURL}/reservations/?tattooist_id=${getCookie('tattooist_id')}`)

    if(res.data.success){
      setReservations(res.data.reservations);

      const tmp = res.data.reservations;
      const tmp1 = []
      const tmp2 = []

      tmp.forEach((reservation) => {
        if(reservation.confirmed){
          tmp1.push(reservation)
        } else {
          tmp2.push(reservation)
        }
      })

      setConfirmed(tmp1)
      setPending(tmp2)
    }else {
      console.log('reservation api fail')
      console.log(res.data);
    }
  }

  useEffect(() => {
    sendRequest();
  }, []);

  // return reservations;
  return [confirmed, pending]
};

export default useReservation;