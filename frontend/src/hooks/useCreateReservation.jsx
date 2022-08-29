import axios from 'axios';
import React from 'react';
import { APIURL } from '../config/key';

// ### 작업 요청 (= 예약 생성)

// *유저가 타투이스트에게 작업을 요청함*

// - POST : /create/reservation
// - Body : { user_id, tattooist_id, image, mime, cost, date, time_slot }
//     - image, mime, cost → 도안 세부에서 “작업요청”
//     - date, time_slot → 타투이스트 세부에서 “작업요청”
//         - date: 220823
//         - time_slot : 1030 (=10:30)
// - Return : { success }
const useCreateReservation = () => {

  const sendRequest = async({ data }) => {

    const res = await axios.post(`${APIURL}/create/reservation`, data);

    if(res.data.success){
      console.log('create reservation success')
    } else {
      console.log('create reservation fail')
    }
  }
  
  return sendRequest
};

export default useCreateReservation;