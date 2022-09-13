import axios from 'axios';
import { APIURL } from '../config/key';
import { getCookie } from '../config/cookie';

/** 유저가 도안을 스크랩할 때 호출하는 함수
 * @param {String} draft_id 도안 ID 
 * @returns 스크랩과 스크랩 취소 요청을 보내는 함수 반환 
 */

const useHeartClick = ({ draft_id }) => {
  const _id = getCookie('user_id');

  const sendScrap = async() => {
    const res = await axios.post(`${APIURL}/scrap/${_id}`, {
      draft_id: draft_id
    })
  
    if(res.data.success){
      console.log('scrap success')
    }
  }
  
  const sendDeleteScrap = async() => {
    const res = await axios.post(`${APIURL}/unscrap/${_id}`, {
      draft_id: draft_id
    })
  
    if(res.data.success){
      console.log('scrap delete success')
    }
  }

  return [sendScrap, sendDeleteScrap];
};

export default useHeartClick;