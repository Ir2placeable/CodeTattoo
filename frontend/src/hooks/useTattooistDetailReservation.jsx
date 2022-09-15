import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCookie } from '../config/cookie';
import { APIURL } from '../config/key';

/** 타투이스트 상세 페이지/ 해당 날짜의 예약 불가능한 시간 get API
 * @param {Object} value 해당 날짜
 * @returns 해당 날짜의 예약 불가능한 시간 배열
 */
const useTattooistDetailReservation = ({ value }) => {
  const [data, setData] = useState([]);
  const param = useParams();
  const id = param.tattooist_id;

  const sendRequest = async() => {
    let url = `${APIURL}/tattooist/${id}/reservation`
    const date = moment(value).format('YYMMDD');

    let query = `/?date=${date}`;
    if(getCookie('user_id')){
      query += `&user_id=${getCookie('user_id')}`
    }
    url += query;

    const res = await axios.get(url)

    if(res.data.success){
      setData(res.data.data);
    } else {
      console.log('예약 일정 탭 fail')
    }
  }
  
  useEffect(() => {
    sendRequest();
  }, [value])

  return data
};

export default useTattooistDetailReservation;