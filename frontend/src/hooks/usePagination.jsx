import React from 'react';
import axios from 'axios';
import { APIURL } from '../config/key';
import { useEffect, useState } from 'react';
import { getCookie } from '../config/cookie';

// ### 게스트 페이지 : 도안

// - GET : /drafts/:filter/:page
//     - filter : count, best, all, search
//     - page : 1,2,3 …
// - Query : { title }
//     - filter : search 인 경우에만 사용
// - Return : filter = count → { count }
// - Return
//     - filter : count → { count }

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

const usePagination = ({ filter }) => {
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if(getCookie('user_id')){
      setQuery(`/?user_id=${getCookie('user_id')}`)
    } else if(getCookie('tattooist_id')){
      setQuery(`/?tattooist_id=${getCookie('tattooist_id')}`)
    }
  }, []);


  const sendRequest = async() => {
    //console.log(query)
    const res = await axios.get(`${APIURL}/${filter}/count/0${query}`);

    if(res.data.success){
      console.log('usePagination success: ', res.data.count)
      setCount(res.data.count);
    } else {
      console.log('usePagination error');
      console.log(res.data);
    }

  }

  useEffect(() => {
    sendRequest();
  }, [])

  return count;
};

export default usePagination;