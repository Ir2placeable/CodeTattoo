import axios from "axios";
import { useParams } from "react-router-dom";
import { APIURL } from "../config/key";

/** 작업물 상세 페이지 / 작업물 상세 데이터 호출 API
 * @returns 작업물 상세 정보 데이터와 작업물 state 데이터 반환
 */
const useArtworkDetail = () => {
  const param = useParams();
  const tattoo_id = param.tattoo_id;
  const tattooist_id = param.tattooist_id;

  const sendRequest = async () => {
    const res = await axios.get(
      `${APIURL}/artwork/${tattoo_id}?tattooist_id=${tattooist_id}`
    );
    if (res.data.success) {
      console.log(res.data)
      return [res.data.artwork_info, res.data.states, res.data.image];
    } else {
      console.log("Artwork Detail Fail");
    }
  };

  return sendRequest;
};

export default useArtworkDetail;

