import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { APIURL } from '../config/key';
import { getCookie } from '../config/cookie';

const useHeartClick = ({ draft_id }) => {
  const _id = getCookie('user_id');

  const sendScrap = async() => {
    const res = await axios.post(`${APIURL}/scrap`, {
      user_id: _id,
      draft_id: draft_id
    })
  
    if(res.data.success){
      console.log('scrap success')
    }
  }
  
  const sendDeleteScrap = async() => {
    const res = await axios.delete(`${APIURL}/scrap/?user_id=${_id}&draft_id=${draft_id}`)
  
    if(res.data.success){
      console.log('scrap delete success')
    }
  }

  return [sendScrap, sendDeleteScrap];
};

export default useHeartClick;