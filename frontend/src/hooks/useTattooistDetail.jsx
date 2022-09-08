import axios from "axios";
import React, { memo, useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCookie } from "../config/cookie";
import { APIURL } from "../config/key";

// ### 게스트 페이지 : 타투이스트 세부

// - GET : /tattooist/:filter/:id
//     - filter : draft, artwork, reservation
//     - id : tattooist_id
// - Query : None
// - Return : { success, tattooist, data }
//     - **tattooist = { tattooist_id, image, nickname, office, specialize, description, followers, isFollowed }**
//     - filter : draft → data = { draft_id, image, like }
//     - filter : artwork → data = { artwork_id, image, cost, time }
//     - filter : reservation → data = [reservations]
//         - reservations : ex) 22-07-18-11 (년-월-일-시) → 불가능한 날짜임
// - Error code
//     - err 8 : 해당 타투이스트 없음
// - [기능정리링크](https://www.notion.so/a78a53207d0740eba3637a8316c1b0a0)

// ### 유저 페이지 : 타투이스트 세부

// - GET : /tattooist/:filter/:id
//     - filter : draft, artwork, reservation
//     - id : tattooist_id
// - Query : { user_id } : 게스트일 때 None
// - Return : { success, tattooist }
//     - tattooist = { tattooist_id, image, nickname, office, contact, description, specialize, followers, isFollowed, schedules }
// - Error code
//     - err 8 : 해당 타투이스트 없음
//     - err 10 : user_id 전달 오류
// - [기능정리링크](https://www.notion.so/a78a53207d0740eba3637a8316c1b0a0)

const useTattooistDetail = (path) => {
  const [tattooist, setTattooist] = useState({});
  const [data, setData] = useState();
  const location = useLocation();

  const sendRequest = async () => {
    let query = "";
    if (getCookie("user_id")) {
      query = `?user_id=${getCookie("user_id")}`;
    } else if (getCookie("tattooist_id")) {
      query = `?tattooist_id=${getCookie("tattooist_id")}`;
    }
    // console.log(`${APIURL}${path}/${query}`)

    const res = await axios.get(`${APIURL}${path}/${query}`);
    if (res.data.success) {
      setTattooist(res.data.tattooist);
      setData(res.data.data);
    }
  }

  useEffect(() => {
    const [ , , , tmp] = location.pathname.split("/")
    // console.log(tmp)
    if(tmp !== 'reservation'){
      sendRequest();
    }
    // sendRequest();
  }, [location.pathname]);

  return [tattooist, data];
};

export default useTattooistDetail;
