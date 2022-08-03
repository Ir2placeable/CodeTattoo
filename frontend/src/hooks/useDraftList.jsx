import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { getCookie } from '../config/cookie';
import { APIURL } from '../config/key';

// ### 게스트 페이지 : 도안

// - GET : /drafts/:filter/:page
//     - filter : count, best, all, search
//     - page : 1,2,3 …
// - Query : { title }
//     - filter : search 인 경우에만 사용
// - Return : filter = count → { count }
// - Return
//     - filter : count → { count }
//     - filter : best, all, search = { success, [drafts] }
//         - drafts = { draft_id, image, title, like, drawer_id, drawer_image, drawer_nickname, isScraped }
// - Error code
//     - err 5 : 탐색 결과 없음
//     - err 6 : 검색 결과 없음
//     - err 12 : filter 입력 오류

// ### 유저 페이지 : 도안

// - GET : /drafts/:filter/:page
//     - filter : count, best, all, search
//     - page : integer type
// - Query : { user_id, title }
//     - **검색하는 경우가 아니면 title 요청 X**
// - Return
//     - filter : count → { count }
//     - filter : best, all, search → { success, count, [drafts] }
//         - drafts = { draft_id, image, title, like, drawer_id, drawer_image, drawer_nickname, isScraped }
// - Error code
//     - err 5 : 탐색 결과 없음
//     - err 6 : 검색 결과 없음
//     - err 10 : user_id 전달 오류
//     - err 12 : filter 입력 오류


const useDraftList = ({ filter, page }) => {
  const [drafts, setDrafts] = useState([]);

  const sendRequest = async() => {
    let query = ""

    if(getCookie('user_id')){
      query = `?user_id=${getCookie('user_id')}`
    }

    const res = await axios.get(`${APIURL}/drafts/${filter}/${page}${query}`);

    //console.log(res);
    if(res.data.success){
      setDrafts(res.data.drafts);
    } else {
      // 오류
      console.log('useDraftList error');
      console.log(res.data);
    }
  }

  return [drafts, sendRequest];
};

export default useDraftList;