import axios from 'axios';
import React, { memo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCookie } from '../config/cookie';
import { APIURL } from '../config/key';


const useScrapTattooist = ({ page }) => {
  const [tattooists, setTattooists] = useState([]);
  const id = getCookie('user_id');

  const sendRequest = async() => {
    const res = await axios.get(`${APIURL}/scraps/tattooist/${page}/?user_id=${id}`);

    if(res.data.success){
      setTattooists(res.data.tattooists);
    } else {
      console.log('get scrap tattooist fail', res.data);
    }
  }

  useEffect(() => {
    sendRequest();
  }, [page])

  return [tattooists]
}

export default useScrapTattooist;