import {
  AuctionImg,
  BidderImgBox,
  BidderProfileBox,
  BidderProfileItem,
  ProfileImgBox,
  ProfileImg,
  ProfileImgIcon,
} from "../../../styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

/** 상위 컴포넌트 === AuctionBidder.jsx
 * 경매 상세 페이지 / 응찰
 * @param {Object} bidder 응찰 데이터
 */

const Bidder = ({ bidder }) => {
  return (
    <>
      <BidderImgBox>
        <AuctionImg type="bidder" src={bidder.draft_image} />
      </BidderImgBox>
      <BidderProfileBox>
        <ProfileImgBox size="profile">
          {bidder.drawer_image ? (
            <ProfileImg size="profile" src={bidder.drawer_image} />
          ) : (
            <ProfileImgIcon size="profile">
              <FontAwesomeIcon style={{ fontSize: "80px" }} icon={faUser} />
            </ProfileImgIcon>
          )}
        </ProfileImgBox>
        <BidderProfileItem type="nickname">{bidder.drawer_nickname}</BidderProfileItem>
        <BidderProfileItem type="specialize">{bidder.specialize}</BidderProfileItem>
      </BidderProfileBox>
      </>
  );
};

export default Bidder;
