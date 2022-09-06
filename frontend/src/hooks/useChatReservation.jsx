import axios from 'axios';
import React, { memo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCookie } from '../config/cookie';
import { APIURL } from '../config/key';

// *유저와 타투이스트가 채팅에서 date, time_slot, cost, body_part를 수정함*

// - PATCH : /reservation/:id
//     - id : reservation_id
// - Body : { date, time_slot, cost, body_part }
//     - 기존 정보를 보내주어야 함 (바뀐 정보만 보내면 안됨)
//     - date: 220823
//     - time_slot : 1030 (=10:30)
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