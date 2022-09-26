import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../config/cookie";
import { APIURL } from "../config/key";

/** 도안 상세 페이지/ 도안 상세 데이터 API
 * @returns 도안 상세 데이터 반환
 */

const useDraftDetail = () => {
  const param = useParams();
  const draft_id = param.draft_id;
  const [draft, setDraft] = useState({
    draft_id: "",
    image: "",
    title: "",
    like: "",
    drawer_id: "",
    drawer_image: "",
    drawer_nickname: "",
    drawer_location: "",
    genre: "",
    keywords: [],
    isFollowed: false,
    isScraped: false,
  });

  const sendRequest = async () => {
    let query = "";
    if (getCookie("user_id")) {
      query = `?user_id=${getCookie("user_id")}`;
    }
    const res = await axios.get(`${APIURL}/draft/${draft_id}${query}`);
    if (res.data.success) {
      setDraft(res.data.draft);
    } else {
      console.log("Draft Detail Get Request Fail");
    }
  };

  useEffect(() => {
    sendRequest();
  }, [])

  return draft
};

export default useDraftDetail;
