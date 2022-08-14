import axios from 'axios';
import React, { memo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCookie } from '../config/cookie';
import { APIURL } from '../config/key';

// ### 유저 페이지 : 스크랩

// - GET : /scraps/:filter/:page
//     - filter : draft, tattooist
//     - page : integer type
// - Query : { user_id }
// - Return
//     - filter : draft && page : 0 → { draft_count }
//     - filter : tattooist && page : 0 → { tattooist_count }
//     - filter : draft → { success, [drafts] }
//         - drafts = { draft_id, image, title, like, drawer_id, drawer_image, drawer_nickname, isScraped }
//     - filter : tattooist → { success, [tattooists] }
//         - tattooists = { tattooist_id, image, nickname, location, specialize, followers, description, isFollowed }
// - Error code
//     - err 5 : 탐색 결과 없음
//     - err 10 : user_id 전달 오류
//     - err 12 : filter 입력 오류
const useScrapTattooist = ({ page }) => {
  const [tattooists, setTattooists] = useState([]);
  const id = getCookie('user_id');

  const sendRequest = async() => {
    const res = await axios.get(`${APIURL}/scraps/tattooist/${page}/?user_id=${id}`);

    if(res.data.success){
      setTattooists(res.data.tattooists);
    } else {
      console.log('get scrap tattooist fail', res.data);
    }
  }

  useEffect(() => {
    sendRequest();
  }, [page])

  return [tattooists]
}

export default useScrapTattooist;