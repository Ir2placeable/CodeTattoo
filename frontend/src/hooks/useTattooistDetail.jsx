import axios from "axios";
import React, { memo, useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCookie } from "../config/cookie";
import { APIURL } from "../config/key";

const useTattooistDetail = (path) => {
  const [tattooist, setTattooist] = useState({});
  const [data, setData] = useState();

  const sendRequest = async () => {
    let query = "";
    if (getCookie("user_id")) {
      query = `?user_id=${getCookie("user_id")}`;
    } else if (getCookie("tattooist_id")) {
      query = `?tattooist_id=${getCookie("tattooist_id")}`;
    }

    const res = await axios.get(`${APIURL}${path}/${query}`);
    if (res.data.success) {
      setTattooist(res.data.tattooist);
      setData(res.data.data);
    }
  };

  useEffect(() => {
    sendRequest();
  }, []);

  return [tattooist, data];
};

export default useTattooistDetail;
