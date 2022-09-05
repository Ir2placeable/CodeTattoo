import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { APIURL } from '../config/key';

// ### 작업 시작

// *타투이스트가 작업을 시작함*

// - POST : /procedure/:id
//     - id : reservation_id
// - Body : { user_id, tattooist_id, inks, niddle, depth, machine }
// - Return : { success, tattoo_id }
//     - tattoo_id → 작업 완료 요청 Body에 반드시 사용!

// ### 작업 완료

// *타투이스트가 작업을 종료함*

// - PATCH : /procedure/:id
//     - id : reservation_id
// - Body : { user_id, tattooist_id, tattoo_id, inks, niddle, depth, machine }
// - Return : { success }
const useProcedure = () => {
  const startProcedure = async({
    reservation_id, user_id, tattooist_id, inks, niddle, depth, machine
  }) => {
    const res = await axios.post(`${APIURL}/procedure/${reservation_id}`, {
      user_id, tattooist_id, inks, niddle, depth, machine
    })

    if(res.data.success){
      console.log('start procedure success')
      return res.data.tattoo_id;
    } else {
      console.log('start procedure fail')
    }
  }

  const endProcedure = async({
    reservation_id, user_id, tattooist_id, tattoo_id,
    inks, niddle, depth, machine
  }) => {
    const res = await axios.patch(`${APIURL}/procedure/${reservation_id}`, {
      user_id, tattooist_id, tattoo_id, 
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
