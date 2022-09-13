import axios from "axios";
import { getCookie } from "../config/cookie";
import { APIURL } from "../config/key";

/** 유저 마이페이지/ 유저 데이터 & 마이 타투 API
 * 
 * @returns 유저 프로필 정보와 마이 타투 데이터를 불러오는 함수를 반환
 */

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
