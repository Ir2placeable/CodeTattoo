import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { APIURL } from "../config/key";
import { getCookie } from "../config/cookie";

/** 타투이스트 목록 페이지/ 타투이스트 목록 데이터 API
 * @param {String} filter 추천순/ 최신순
 * @param {Number} page Pagination
 * @returns 타투이스트 목록 반환
 */

const useTattooistList = ({ filter, page }) => {
  const [tattooists, setTattooists] = useState([]);
  const param = useParams();
  const nickname = param.nickname;

  const sendRequest = async () => {
    let query = "";
    if (getCookie("user_id")) {
      query = `?user_id=${getCookie("user_id")}`;
      if (nickname) {
        query += `&nickname=${nickname}`;
      }
    } else {
      if (nickname) {
        query += `?nickname=${nickname}`;
      }
    }
    console.log(`${APIURL}/${filter}/${page}${query}`);
    const res = await axios.get(`${APIURL}/${filter}/${page}${query}`);

    if (res.data.success) {
      setTattooists(res.data.tattooists);
      console.log(res.data.tattooists);
    } else {
      console.log("Tattooist List Get Request Fail");
    }
  };

  useEffect(() => {
    sendRequest();
  }, [filter, page, nickname]);

  return tattooists;
};

export default useTattooistList;
