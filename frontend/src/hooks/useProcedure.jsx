import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { APIURL } from '../config/key';

/** 작업 시작 / 종료 API
 * 작업(예약) 세부 페이지
 * @returns 작업 시작 / 종료 API 함수
 */
const useProcedure = () => {
  const startProcedure = async({
    reservation_id, user_id, tattooist_id, inks, niddle, depth, machine
  }) => {
    const res = await axios.post(`${APIURL}/procedure/${reservation_id}`, {
      user_id, tattooist_id, inks, niddle, depth, machine
    })

    if(res.data.success){
      console.log('start procedure success')
    } else {
      console.log('start procedure fail')
    }
  }

  const endProcedure = async({
    reservation_id, user_id, tattooist_id, 
    inks, niddle, depth, machine
  }) => {
    const res = await axios.patch(`${APIURL}/procedure/${reservation_id}`, {
      user_id, tattooist_id, 
      inks, niddle, depth, machine
    })

    if(res.data.success){
      console.log('end procedure success')
    } else {
      console.log('end procedure fail')
    }
  }

  return [startProcedure, endProcedure]
};

export default useProcedure;
