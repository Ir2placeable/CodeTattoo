import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { APIURL } from "../config/key";
import { getCookie } from "../config/cookie";

// ### 게스트 페이지 : 타투이스트

// - GET : /tattooists/:filter/:page
//     - filter : count, best, all, search
//     - page : integer type
// - Query : { nickname }
//     - **검색하는 경우가 아니면 nickname 요청 X**
// - Return
//     - filter : count → { count }
//     - filter : best, all, search → { success, [tattooists] }
//         - tattooists = { tattooist_id, image, nickname, location, specialize, followers, description, isFollowed }
// - Error code
//     - err 5 : 탐색 결과 없음
//     - err 6 : 검색 결과 없음
//     - err 12 : filter 입력 오류

// ### 유저 페이지 : 타투이스트

// - GET : /tattooists/:filter/:page
//     - filter : count, best, all, search
//     - page : integer type
// - Query : { user_id, nickname }
//     - **검색하는 경우가 아니면 nickname 요청 X**
// - Return
//     - filter : count → { count }
//     - filter : best, all, search → { success, count, [tattooists] }
//         - tattooists = { tattooist_id, image, nickname, location, specialize, followers, description, isFollowed }
// - Error code
//     - err 5 : 탐색 결과 없음
//     - err 6 : 검색 결과 없음
//     - err 10 : user_id 전달 오류
//     - err 12 : filter 입력 오류

const useTattooistList = (path, page) => {
  console.log("Use Tattooist List");

  const param = useParams();
  const nickname = param.nickname;
  const [tattooists, setTattooists] = useState([]);

  const sendRequest = async () => {
    // Guest / User / Tattooist
    let url = `${APIURL}${path}/${page}`;
    if (getCookie("user_id")) url += `/?user_id=${getCookie("user_id")}`;
    else if (getCookie("tattooist_id"))
      url += `/?tattooist_id=${getCookie("tattooist_id")}`;

    // filter
    let res = {};
    if (path === "/tattooists/search") {
      res = await axios.get(`${url}&nickname=${nickname}`);
    } else {
      res = await axios.get(`${url}`);
    }

    if (res.data.success) {
      setTattooists(res.data.tattooists);
      console.log(res.data.tattooists);
    } else {
      console.log("Tattooist List Get Request Fail");
    }
  };

  useEffect(() => {
    sendRequest();
  }, [page]);

  return tattooists;
};

export default useTattooistList;
