import axios from 'axios';
import React from 'react';
import { getCookie } from '../config/cookie';
import { APIURL } from '../config/key';

// ### 일정 비활성화

// - POST : /create/unavailable/:id
//     - id : tattooist_id
// - Body : { [unavailable] }
//     - unavailable : { date, time_slot }
//         - ex) 22년 8월 20일 10시 30분 → 220820, 1030
// - Return : { success }

// ### 일정 비활성화 취소

// - POST : /remove/unavailable/:id
//     - id : tattooist_id
// - Body : { [unavailable] }
//     - unavailable : { date, time_slot }
//         - ex) 22년 8월 20일 10시 30분 → 220820, 1030
// - Return : { success }
const useTimeDeactive = () => {
  const id = getCookie('tattooist_id');

  const timeActive = async(unavailable) => {
    const res = await axios.post(`${APIURL}/remove/unavailable/${id}`, {
      unavailable
    })

    if(res.data.success){
      console.log('time active success')
    } else {
      console.log('time active fail')
    }
  }

  const timeDeActive = async(unavailable) => {
    const res = await axios.post(`${APIURL}/create/unavailable/${id}`, {
      unavailable
    })

    if(res.data.success){
      console.log('time deactive success')
    } else {
      console.log('time deactive fail')
    }
  }

  return [timeActive, timeDeActive];
};

export default useTimeDeactive;