import axios from 'axios';
import React from 'react';
import { getCookie } from '../config/cookie';
import { APIURL } from '../config/key';


const useMyTattoo = () => {
  const getMyTattoo = async({ user_id }) => {
    const res = await axios.get(`${APIURL}/my-tattoo/${user_id}`)

    if(res.data.success){
      console.log(res.data)
      return res.data.tattoos
    } else {
      console.log('my-tattoo api fail')
      console.log(res)
    }
  }
  
  const provideMyTattoo = async({ tattoo_id, reservation_id }) => {
    const res = await axios.post(`${APIURL}/my-tattoo/${tattoo_id}`, {
      reservation_id: reservation_id,
      token: getCookie("auth_token"),
    })

    if(res.data.success){
      console.log(res.data)
      return true;
    } else {
      console.log('provide my tattoo fail')
      console.log(res)
      return false;
    }
  }

  return [getMyTattoo, provideMyTattoo]
};

export default useMyTattoo;