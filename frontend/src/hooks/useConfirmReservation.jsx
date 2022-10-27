import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { APIURL, PUSHURL } from '../config/key';
import { getCookie } from '../config/cookie';

/** 예약 확정 / 취소 API 호출
 * 채팅 방 예약 페이지 || 예약 세부 페이지
 * @param {String} user_id 유저 아이디
 * @param {String} tattooist_id 타투이스트 아이디
 * @returns 예약 확정 / 취소 API 호출 함수
 */
const useConfirmReservation = ({ user_id, tattooist_id }) => {
  const params = useParams();
  const id = params.reservation_id;

  const confirmReservation = async() => {
    const res = await axios.post(`${APIURL}/confirm/reservation/${id}`, {
      user_id, tattooist_id
    })

    if(res.data.success){
      console.log('confirm reservation success')
      // 예약 확정 카톡 메시지 PUSH
      axios.post(`${PUSHURL}/push/kakao`, {
        token: getCookie("auth_token"),
        case_id: 2,
      });
    } else {
      console.log('confirm reservation fail')
    }
  }

  const rejectReservation = async() => {
    const res = await axios.post(`${APIURL}/reject/reservation/${id}`, {
      user_id, tattooist_id
    })

    if(res.data.success){
      console.log('reject reservation success')
      // 예약 취소 카톡 메시지 PUSH
      axios.post(`${PUSHURL}/push/kakao`, {
        token: getCookie("auth_token"),
        case_id: 3,
      });
    } else {
      console.log('reject reservation fail')
    }
  }
  
  return [confirmReservation, rejectReservation]
};

export default useConfirmReservation;