import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { APIURL } from '../config/key';


// ### 예약 확정

// *유저와 타투이스트가 채팅에서 date, time_slot_cost, image(도안)을 확정함*

// - POST : /confirm/reservation/:id
//     - id : reservation_id
// - Body : { user_id, tattooist_id }
// - Return : { success }

// ### 예약 불발(=예약 거절)

// *유저와 타투이스트가 채팅에서 합의점을 찾지 못하고 종료함*

// - POST : /reject/reservation/:id
//     - id : reservation_id
// - Body : { user_id, tattooist_id }
// - Return : { success }
const useConfirmReservation = ({ user_id, tattooist_id }) => {
  const params = useParams();
  const id = params.reservation_id;

  const confirmReservation = async() => {
    const res = await axios.post(`${APIURL}/confirm/reservation/${id}`, {
      user_id, tattooist_id
    })

    if(res.data.success){
      console.log('confirm reservation success')
    } else {
      console.log('confirm reservation fail')
    }
  }

  const rejectReservation = async() => {
    const res = await axios.post(`${APIURL}/reject/reservation/${id}`, {
      user_id, tattooist_id
    })

    if(res.data.success){
      console.log('reject reservation success')
    } else {
      console.log('reject reservation fail')
    }
  }
  
  return [confirmReservation, rejectReservation]
};

export default useConfirmReservation;