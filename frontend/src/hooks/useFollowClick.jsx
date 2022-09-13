import axios from "axios";
import { APIURL } from "../config/key";
import { getCookie } from "../config/cookie";

/** 타투이스트 목록, 타투이스트 상세, 도안 상세 페이지 / 타투이스트를 스크랩 하는 API
 * @param {String} tattooist_id 타투이스트 ID 
 * @returns 스크랩과 스크랩 취소 요청을 보내는 함수 반환 
 */

const useFollowClick = ({ tattooist_id }) => {
  const Following = async () => {
    const res = await axios.post(`${APIURL}/follow/${getCookie("user_id")}`, {
      tattooist_id: tattooist_id,
    });

    if (res.data.success) {
      console.log("following success");
    }
  };

  const UnFollowing = async () => {
    const res = await axios.post(`${APIURL}/unfollow/${getCookie("user_id")}`, {
      tattooist_id: tattooist_id,
    });

    if (res.data.success) {
      console.log("unfollowing success");
    }
  };

  return [Following, UnFollowing];
};

export default useFollowClick;
