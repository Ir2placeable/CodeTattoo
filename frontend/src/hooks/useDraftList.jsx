import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { APIURL } from '../config/key';

// - GET : /drafts/:filter/:page
//     - filter : count, best, all, search
//     - page : integer type
// - Query : { user_id, title }
//     - **검색하는 경우가 아니면 title 요청 X**
// - Return
//     - filter : count → { count }
//     - filter : best, all, search → { success, count, [drafts] }
//         - drafts = { draft_id, drawer, image, title, like, genre, [keywords], isScraped }

const useDraftList = ({ filter, page }) => {
  const [drafts, setDrafts] = useState([]);

  useEffect(async() => {
    const res = await axios.get(`${APIURL}/drafts/${filter}/${page}`);

    if(res.data.success){
      setDrafts(res.data.drafts);
    } else {
      // 오류
    }

  }, []);

  return drafts;
};

export default useDraftList;