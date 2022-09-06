import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { APIURL } from '../config/key';

// ### 예약 정보 수정

// *유저와 타투이스트가 채팅에서 date, time_slot, cost, body_part를 수정함*

// - PATCH : /reservation/:id
//     - id : reservation_id
// - Body : { date, time_slot, cost, body_part }
//     - 기존 정보를 보내주어야 함 (바뀐 정보만 보내면 안됨)
//     - date: 220823
//     - time_slot : 1030 (=10:30)
// - Return : { success }
const useEditProcedureInfo = () => {
  const params = useParams();

  const sendRequest = async({ 
    date, time_slot, cost, body_part }) => {
    const id = params.reservation_id;

    console.log(id);

    const res = await axios.patch(`${APIURL}/reservation/${id}`, {
      date, time_slot, cost, body_part
    })

    if(res.data.success){
      console.log('edit procedure edit success')
    } else {
      console.log('edit procedure edit fail')
    }
  }

  return sendRequest
};

export default useEditProcedureInfo;