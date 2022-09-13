import axios from "axios";
import React, { memo, useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCookie } from "../config/cookie";
import { APIURL } from "../config/key";

/** 타투이스트 상세 페이지 데이터 호출 함수
 * @param {String} path draft/artwork/reservation 
 * @returns 타투이스트 프로필 정보와 path에 따른 데이터 반환
 */

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
    console.log(`${APIURL}${path}/${query}`);

    const res = await axios.get(`${APIURL}${path}/${query}`);
    if (res.data.success) {
      setTattooist(res.data.tattooist);
      setData(res.data.data);
    }
  };

  useEffect(() => {
    sendRequest();
  }, [location.pathname]);

  return [tattooist, data];
};

export default useTattooistDetail;
