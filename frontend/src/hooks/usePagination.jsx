import axios from 'axios';
import { APIURL } from '../config/key';
import { useEffect, useState } from 'react';
import { getCookie } from '../config/cookie';

/** 페이지네이션 API
 * @param {String} param0 
 * @returns 페이지 당 보여줄 아이템 개수 
 */
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

      if(!query){
        query = `/?`
      } else {
        query += '&'
      }

      if(a === 'drafts' || a === 'auctions'){
        query += 'title='
      } else if(a === 'tattooists'){
        query += 'nickname='
      }

      query += `${keyword}`
    }
    
    const res = await axios.get(`${APIURL}${_filter}/0${query}`);

    if(res.data.success){
      setCount(res.data.count);
    } else {
      console.log(`${APIURL}${_filter}/0${query}`);
      console.log('usePagination error');
    }

  }


  useEffect(() => {
    sendRequest();
  }, [filter])

  return count;
};

export default usePagination;