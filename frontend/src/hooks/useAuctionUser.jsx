import axios from "axios";
import { getCookie } from "../config/cookie";
import { APIURL } from "../config/key";

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
    } else {
      console.log(`${APIURL}/remove/auction/${getCookie("user_id")}`);
    }
  };

  // 경매 낙찰 API
  const BidderAuction = async () => {
    const res = await axios.patch(`${APIURL}/auction/${auction_id}`, {
      drawer_id: drawer_id,
    });

    if (res.data.success) {
      console.log("Bidder success");
    } else {
      console.log(`${APIURL}/auction/${auction_id}/${drawer_id}`);
    }
  };

  return [RemoveAuction, BidderAuction];
};

export default useAuctionUser;
