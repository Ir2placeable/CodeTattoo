import axios from "axios";
import { useState, useEffect } from "react";
import { getCookie } from "../config/cookie";
import { APIURL } from "../config/key";

const useUserMyPage = () => {
  console.log("Use MyUserMyPage");
  const [tattoos, setTattoos] = useState([]);
  const [infos, setInfos] = useState([]);

  const data = {
    tattoos: tattoos,
    infos: infos,
  };

  const sendRequest = async () => {
    const res = await axios.get(
      `${APIURL}/user/my-page/${getCookie("user_id")}`
    );

    if (res.data.success) {
      setTattoos(res.data.tattoos);
      setInfos(res.data.user_info);
    } else {
      console.log("Tattoo List Get Request Fail");
    }
  };

  useEffect(() => {
    sendRequest();
  }, []);

  return data;
};

export default useUserMyPage;
