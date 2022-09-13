import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCookie } from '../config/cookie';
import { APIURL } from '../config/key';

/** 도안 목록 페이지/ 도안 목록 데이터 API
 * @param {String} filter 추천순/ 최신순 
 * @param {Number} page Pagination
 * @returns 도안 목록 반환
 */

const useDraftList = ({ filter, page }) => {
  const [drafts, setDrafts] = useState([]);
  const params = useParams();
  const title = params.title;

  const sendRequest = async() => {
    let query = ""

    if(getCookie('user_id')){
      query = `?user_id=${getCookie('user_id')}`
      if(title){
        query += `&title=${title}`
      }
    } else {
      if(title){
        query = `?title=${title}`
      }
    }
    //console.log(query)

    const res = await axios.get(`${APIURL}/${filter}/${page}/${query}`);

    //console.log(res);
    if(res.data.success){
      setDrafts(res.data.drafts);
      //console.log(res.data.drafts)
    } else {
      // 오류
      console.log('useDraftList error');
      console.log(res.data);
      setDrafts([])
    }
  }

  useEffect(() => {
    sendRequest();
    //console.log('drafts: ',drafts)
  }, [filter, page, title])

  return drafts;
};

export default useDraftList;