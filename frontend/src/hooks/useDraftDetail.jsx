import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../config/cookie";
import { APIURL } from "../config/key";

const useDraftDetail = () => {
  const param = useParams();
  const draft_id = param.draft_id;
  const [draft, setDraft] = useState({
    image: "",
    drawer: "",
    description: "",
    isFollowed: false,
    isScraped: false,
  });

  const sendRequest = async () => {
    const res = await axios.get(
      `${APIURL}/draft/${draft_id}/?user_id=${getCookie(
        "user_id"
      )}&draft_id=${draft_id}`
    );

    if (res.data.success) {
      setDraft(res.data.draft_info);
      console.log(res.data.draft_info);
    } else {
      console.log("Draft Detail Get Request Fail");
    }
  };

  useEffect(() => {
    sendRequest();
  });

  return draft;
};

export default useDraftDetail;
