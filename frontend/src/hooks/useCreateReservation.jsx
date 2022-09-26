import axios from 'axios';
import React from 'react';
import { APIURL } from '../config/key';

/** 예약 생성 api
 * @returns 예약 생성하는 api 호출 함수 반환
 */
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