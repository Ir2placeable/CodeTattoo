import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { APIURL } from "../config/key";

const useDraftDetail = ({ cookies }) => {
  const params = useParams();
  const draft_id = params.draft_id;
  const [draft, setDraft] = useState({
    image: "",
    drawer: "",
    description: "",
    isFollowed: false,
    isScraped: false,
  });

  const sendRequest = async () => {
    const res = await axios.get(
      `${APIURL}/draft/${draft_id}/?user_id=${cookies.user_id}&draft_id=${draft_id}`
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
