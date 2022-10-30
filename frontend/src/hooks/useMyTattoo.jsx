import axios from 'axios';
import React from 'react';
import { getCookie } from '../config/cookie';
import { APIURL } from '../config/key';


const useMyTattoo = () => {
  const getMyTattoo = async({ user_id }) => {
    const res = await axios.get(`${APIURL}/my-tattoo/${user_id}`)

    if(res.data.success){
      return res.data.tattoos
    } else {
      console.log('my-tattoo api fail')
      console.log(res)
    }
  }
  
  const getMyTattooDetail = async({ tattoo_id }) => {
    const res = await axios.post(`${APIURL}/my-tattoo/${tattoo_id}`, {})

    if(res.data.success){
      return res.data.history;
    } else {
      console.log('get my tattoo detail fail')
      console.log(res)
      return false;
    }
  }

  return [getMyTattoo, getMyTattooDetail]
};

export default useMyTattoo;