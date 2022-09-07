import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { APIURL } from '../config/key';

// ### 예약 도안 수정

// *유저와 타투이스트가 채팅에서 image(도안)을 수정함*

// - POST : /reservation/:id
//     - id : reservation_id
// - Body : { image, mime }
// - Return : { success }
const useEditProcedureImg = () => {
  const params = useParams();
  const id = params.reservation_id;

  const sendRequest = async({ image, mime }) => {
    const res = await axios.post(`${APIURL}/reservation/${id}`, {
      image, mime
    })

    if(res.data.success){
      console.log('edit reservation img success')
    } else {
      console.log('edit reservation img fail')
    }

  }
  return sendRequest
};

export default useEditProcedureImg;