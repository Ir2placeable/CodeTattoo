import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../config/cookie";
import { APIURL } from "../config/key";

// ### 게스트 페이지 : 도안 세부

// - GET : /draft/:id
//     - id : draft_id
// - Query : none
// - Return : { success, draft }
//     - draft = { draft_id, image, title, like, drawer_id, drawer_image, drawer_nickname, drawer_location, genre, [keywords], isFollowed, isScraped }
// - Error code
//     - err 7 : 해당 도안 없음

// ### 유저 페이지 : 도안 세부

// - GET : /drafts/:id
//     - id : draft_id
// - Query : { user_id }
// - Return : { success, draft }
//     - draft = { draft_id, image, title, like, drawer_id, drawer_image, drawer_nickname, drawer_location, genre, [keywords], isFollowed, isScraped }
// - Error code
//     - err 7 : 해당 도안 없음
//     - err 10 : user_id 전달 오류

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
      setDraft(res.data.draft_info);
      console.log(res.data.draft_info);
    } else {
      console.log("Draft Detail Get Request Fail");
    }
  };

  return [draft, sendRequest];
};

export default useDraftDetail;
