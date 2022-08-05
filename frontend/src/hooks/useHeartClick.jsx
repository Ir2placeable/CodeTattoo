import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { APIURL } from '../config/key';
import { getCookie } from '../config/cookie';

// ### 유저 스크랩 요청

// - POST : /scrap/:id
//     - id : user_id
// - Body : { draft_id }
// - Return : { success }

// ### 유저 스크랩 취소 요청

// - POST : /unscrap/:id
//     - id : user_id
// - Body : { draft_id }
// - Return : { success }

const useHeartClick = ({ draft_id }) => {
  const _id = getCookie('user_id');

  const sendScrap = async() => {
    const res = await axios.post(`${APIURL}/scrap/${_id}`, {
      draft_id: draft_id
    })
  
    if(res.data.success){
      console.log('scrap success')
    }
  }
  
  const sendDeleteScrap = async() => {
    const res = await axios.post(`${APIURL}/unscrap/${_id}`, {
      draft_id: draft_id
    })
  
    if(res.data.success){
      console.log('scrap delete success')
    }
  }

  return [sendScrap, sendDeleteScrap];
};

export default useHeartClick;