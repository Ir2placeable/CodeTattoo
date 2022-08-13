import React from "react";
import axios from "axios";
import { APIURL } from "../config/key";
import { getCookie } from "../config/cookie";

const useFollowClick = ({ tattooist_id }) => {
  const Following = async () => {
    if (!getCookie("user_id")) alert("로그인 후 사용할 수 있습니다");

    const res = await axios.post(`${APIURL}/follow/${getCookie("user_id")}`, {
      tattooist_id: tattooist_id,
    });

    if (res.data.success) {
      console.log("following success");
    }
  };

  const UnFollowing = async () => {
    if (!getCookie("user_id")) alert("로그인 후 사용할 수 있습니다");

    const res = await axios.post(
      `${APIURL}/unfollow/${getCookie("user_id")}/?tattooist_id=${tattooist_id}`
    );

    if (res.data.success) {
      console.log("unfollowing success");
    }
  };

  return [Following, UnFollowing];
};

export default useFollowClick;
