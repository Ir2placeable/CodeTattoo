import { useState } from "react";
import { getCookie } from "../../config/cookie";
import {
  BidderContainer,
  BidderMainBox,
  BidderCheckBox,
  BidderCheckBoxLabel,
} from "../../styledComponents";
import Bidder from "../organisms/auction/Bidder";
import AuctionUserBtn from "../atomic/auction/AuctionUserBtn";
import useAuctionUser from "../../hooks/useAuctionUser";
import TattooistControlBox from "../organisms/tattooist/TattooistControlBox";
import AuctionTattooistBtn from "../atomic/auction/AuctionTattooistBtn";

/**
 * 상위 컴포넌트 === ShowAuctionDetail.jsx
 * 응찰자 목록 템플릿
 * @param {Array} bidders 응찰자 리스트 
 * @param {String} auction_id 경매 ID
 * @param {String} user_id 유저 ID
*/

const AuctionBidder = ({ bidders, auction_id, user_id }) => {

  const [checkedInputs, setCheckedInputs] = useState([]);
  const [drawer, setDrawer] = useState();
  const [remove, bidder] = useAuctionUser({
    auction_id: auction_id,
    drawer_id: drawer,
  });

  // 경매 선택 Logic
  const changeHandler = (checked, id) => {
    if (checked) {
      if (checkedInputs.length > 0) {
        checkedInputs.pop();
      }
      setCheckedInputs([...checkedInputs, id]);
      setDrawer(id);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((item) => item !== id));
    }
  };

  return (
    <>
      {/* 경매 삭제 & 낙찰 버튼 */}
      {getCookie("user_id") === user_id && (
        <AuctionUserBtn onRemove={remove} onBidder={bidder} />
      )}

      {/* 경매 입찰 버튼 */}
      {getCookie("tattooist_id") && (<AuctionTattooistBtn auction_id={auction_id}/>)}
      
      <BidderMainBox>
        {bidders && bidders.map((bidder) => (
          <BidderContainer key={bidder.drawer_id}>
            {getCookie("user_id") && (
              <BidderCheckBox
                type="checkbox"
                onClick={(e) => {
                  changeHandler(e.target.checked, bidder.drawer_id);
                }}
                id={bidder.drawer_id}
                checked={
                  checkedInputs.includes(bidder.drawer_id) ? true : false
                }
              />
            )}
            <Bidder bidder={bidder} />
            <TattooistControlBox
              type={"bidder"}
              id={bidder.drawer_id}
              isFollowed={bidder.isFollowed}
            />
          </BidderContainer>
        ))}
      </BidderMainBox>
    </>
  );
};

export default AuctionBidder;
