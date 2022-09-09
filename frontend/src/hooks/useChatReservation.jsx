import axios from 'axios';
import React from 'react';
import { getCookie } from '../config/cookie';
import { CHATAPIURL } from '../config/key';

// ### 상담 요청

// *유저가 타투이스트에게 상담문의를 요청한 경우에 실행할 API 입니다.*

// - GET : /chat/reservation/:user_id/:target_id
// - user_id : 현재 상담문의할 유저의 id
// - target_id : 상담문의를 받을 타투이스트의 id
// - Query : None
// - Return : { success, userlist }
//     - userlist = 
//     [{ content, createdAt, opponent_id, opponent_image, 
          // opponent_nickname } ]
//     → Image type은 url, createdAt은 String

const useChatReservation = () => {
  const user_id = getCookie('user_id')

  const sendRequest = async({ tattoist_id }) => {
    // const params = `${user_id}/${tattoist_id}`

    // test 용
    const params = '6315859fa26479438d3c1b95/63158633a26479438d3c1bae'
    const res = await axios.get(`${CHATAPIURL}/chat/reservation/${params}`)

    if(res.data.success){
      return res.data.userlist
    } else {
      console.log('chat reservation fail')
    }
  }
  
  return sendRequest
};

export default useChatReservation;