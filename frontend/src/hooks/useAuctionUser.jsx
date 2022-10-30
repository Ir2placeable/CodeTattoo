import axios from "axios";
import { getCookie } from "../config/cookie";
import { APIURL, PUSHURL} from "../config/key";
import { goAuctionList, goAuctionDetail } from "../config/navigate";

/** 경매 상세 페이지 / 유저가 경매를 낙찰, 삭제 하는 API
 * @param {String} auction_id 경매 ID
 * @param {String} drawer_id 응찰 타투이스트 ID 
 */

const useAuctionUser = ({ auction_id, drawer_id }) => {
 
  // 경매 삭제 API
  const RemoveAuction = async () => {
    const res = await axios.post(
      `${APIURL}/remove/auction/${getCookie("user_id")}`,
      {
        auction_id: auction_id,
      }
    );
    if (res.data.success) {
      console.log("Remove success");
      goAuctionList();
    } else {
      console.log(`${APIURL}/remove/auction/${getCookie("user_id")}`);
    }
  };

  // 경매 낙찰 API
  const BidderAuction = async () => {

    const res = await axios.patch(`${APIURL}/auction/${auction_id}`, {
      drawer_id: drawer_id,
      token: getCookie("auth_token"),
    });

    if (res.data.success) {
      console.log("Bidder success");
      window.location.reload();
    } else {
      alert(`응찰자를 선택해야 합니다`);
      console.log(`${APIURL}/auction/${auction_id}/${drawer_id}`);
    }
  };

  return [RemoveAuction, BidderAuction];
};

export default useAuctionUser;
