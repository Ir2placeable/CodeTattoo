import axios from 'axios';
import React, { memo } from 'react';
import { getCookie } from '../config/cookie';
import { APIURL } from '../config/key';

const useTattooistDetail = memo(( filter, tattooist_id ) => {
  const [tattooist, setTattooist] = useState({});
  const [data, setData] = useState({});

  const sendRequest = async() => {
    let query = ""

    if(getCookie('user_id')){
      query = `?user_id=${getCookie('user_id')}`
    }

    const res = await axios.get(`${APIURL}/tattooist/${filter}/${tattooist_id}${query}`)

    if(res.data.success){
      setTattooist(res.data.tattooist);
      setData(res.data.data);
    }
  }
  return [tattooist, data, sendRequest]
});

export default useTattooistDetail;