import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { APIURL } from '../config/key';

// ### 작업 완료 페이지 → 필요한 API 인지 의심됨

// *프로시저 비긴 페이지에 필요한 데이터를 로드하기 위한 API 입니다.*

// - GET : /procedure/:id
//     - id : tattoo_id
// - Query : None
// - Return : { success, data }
//     - data = { customer_id, customer_nickname, 
//       tattooist_id, tattooist_nickname, date, 
//       time_slot, cost, body_part, image, inks, 
//       niddle, depth, machine }
const useProcedureInfo = ({ tattoo_id }) => {
  const [data, setData] = useState({});

  const sendRequest = async() => {
    const res = await axios.get(`${APIURL}/procedure/${tattoo_id}`);
    
    if(res.data.success){
      setData(res.data.data)
    } else {
      console.log('get procedure info fail')
    }
  }

  useEffect(() => {
    sendRequest();
  }, [])

  return data
};

export default useProcedureInfo;