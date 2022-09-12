import React from 'react';
import axios from 'axios';
import { APIURL } from '../config/key';
import { useEffect, useState } from 'react';
import { getCookie } from '../config/cookie';
import { useLocation } from 'react-router-dom';

// ### 게스트 페이지 : 도안

// - GET : /drafts/:filter/:page
//     - filter : best, all, search
//     - page : 0,1,2,3 …
// - Query : { title }
//     - filter : search 인 경우에만 사용
// - Return : filter = count → { count }
// - Return
//     - filter : count → { count }

// ### 유저 페이지 : 도안

// - GET : /drafts/:filter/:page
//     - filter : best, all, search
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

  const sendRequest = async() => {
    let query = "";
    let _filter = filter;

    if(getCookie('user_id')){
      query = `/?user_id=${getCookie('user_id')}`
    }
    
    if(filter.split('/')[2] === 'search'){
      const [ , a, b, keyword] = filter.split('/');
      _filter = `/${a}/${b}`
      // console.log(keyword)
      // console.log(_filter)

      if(!query){
        query = `/?`
      } else {
        query += '&'
      }

      if(a === 'drafts'){
        query += 'title='
      } else if(a === 'tattooists'){
        query += 'nickname='
      }

      query += `${keyword}`
    }

    console.log(_filter, query)
    const res = await axios.get(`${APIURL}${_filter}/0${query}`);

    if(res.data.success){
      // console.log(_filter, 'usePagination success: ', res.data)
      setCount(res.data.count);
    } else {
      console.log('usePagination error');
      console.log(res.data);
    }

  }


  useEffect(() => {
    sendRequest();
  }, [filter])

  return count;
};

export default usePagination;