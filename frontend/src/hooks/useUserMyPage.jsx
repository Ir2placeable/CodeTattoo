import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCookie } from "../config/cookie";
import { APIURL } from "../config/key";

const useUserMyPage = () => {

  const sendRequest = async () => {
    const res = await axios.get(
      `${APIURL}/user/my-page/${getCookie("user_id")}`
    );

    if (res.data.success) {
      console.log('user my page; ',res.data);
      return [res.data.user_info, res.data.tattoos];
    } else {
      console.log("Tattoo List Get Request Fail");
    }
  };

  return sendRequest;
};

export default useUserMyPage;
