import axios from 'axios';
import React, { memo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCookie } from '../config/cookie';
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

const useChatReservation = ({ reservation_id }) => {

  const sendConfirm = async() => {
    const res = await axios.post(`${APIURL}/confirm/reservations/${reservation_id}`, {

    })

    if(res.data.success){
        console.log('reservation confirm success');
    }
  }

  const sendCancel = async() => {
    const res = await axios.post(`${APIURL}/confirm/reservations/${reservation_id}`, {
        
    })

    if(res.data.success){
        console.log('reservation confirm success');
    }
  }

  return [sendConfirm, sendCancel];
};

export default useChatReservation;