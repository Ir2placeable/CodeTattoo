import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { APIURL } from "../config/key";
import { getCookie } from "../config/cookie";
// tattooist_list = {
//   tattooist_id, image, nickname,
//   office, contact, description,
//   specialize, followers, isFollowed }

const useTattooistList = (path, page) => {
  console.log("Use Tattooist List");
  const param = useParams();
  const nickname = param.nickname;
  const [tattooists, setTattooists] = useState([]);

  const sendRequest = async () => {
    let url = `${APIURL}/${path}/${page}`;
    if (getCookie("user_id") && !getCookie("tattooist_id"))
      url += `/?user_id=${getCookie("user_id")}`;
    else if (!getCookie("user_id") && getCookie("tattooist_id"))
      url += `/?tattooist_id=${getCookie("tattooist_id")}`;

    let res = {};
    if (path === "main/tattooist/search") {
      res = await axios.get(`${url}&nickname=${nickname}`);
    } else {
      res = await axios.get(`${url}`);
    }

    console.log(res);

    if (res.data.success) {
      setTattooists(res.data.tattooist_list);
      console.log(res.data.tattooist_list);
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
